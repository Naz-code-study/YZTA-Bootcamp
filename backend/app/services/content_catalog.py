from app.models.recommendation import RecommendationOut
from app.services.explore_filters import get_explore_recommendations
from app.services.scoring import compute_match_percentage, score_mood_request

CONTENT_COLLECTION = "content"
INTERACTIONS_SUBCOLLECTION = "interactions"


def _content_doc_to_dict(doc) -> dict:
    data = doc.to_dict() or {}
    data["id"] = doc.id
    return data


def get_all_content(db) -> list[dict]:
    docs = db.collection(CONTENT_COLLECTION).stream()
    return [_content_doc_to_dict(d) for d in docs]


def get_interactions_map(db, uid: str) -> dict[str, dict]:
    docs = db.collection("users").document(uid).collection(INTERACTIONS_SUBCOLLECTION).stream()
    return {d.id: (d.to_dict() or {}) for d in docs}


def get_interaction(db, uid: str, content_id: str) -> dict | None:
    doc = db.collection("users").document(uid).collection(INTERACTIONS_SUBCOLLECTION).document(content_id).get()
    return doc.to_dict() if doc.exists else None


def get_top_taste_tags(db, uid: str, limit: int = 3) -> list[str]:
    doc = db.collection("users").document(uid).collection("tasteProfile").document("current").get()
    if not doc.exists:
        return []
    data = doc.to_dict() or {}
    radar = sorted(data.get("radarData", []), key=lambda p: p.get("value", 0), reverse=True)
    return [p["label"] for p in radar[:limit]]


def build_ai_note(content: dict, matched_tags: list[str]) -> str:
    hit_tags = [t for t in content.get("tags", []) if t in matched_tags]
    category = content.get("category", "içerik")
    if hit_tags:
        return (
            f"Bu {category} sana önerildi çünkü '{hit_tags[0]}' temasını seviyorsun."
        )
    return f"Bu {category}, genel zevk profilinle yüksek uyum gösteriyor."


def to_recommendation_out(content: dict, interaction: dict | None, match_percentage: float, matched_tags: list[str]) -> RecommendationOut:
    interaction = interaction or {}
    return RecommendationOut(
        id=content["id"],
        title=content["title"],
        category=content["category"],
        subtitle=content.get("subtitle"),
        matchPercentage=round(match_percentage),
        tags=content.get("tags", []),
        description=content.get("description"),
        aiNote=build_ai_note(content, matched_tags),
        userRating=interaction.get("rating", 0),
        saved=interaction.get("saved", False),
    )


def get_featured_recommendations(db, uid: str) -> list[RecommendationOut]:
    all_content = get_all_content(db)
    featured = [c for c in all_content if c.get("featured")]
    interactions = get_interactions_map(db, uid)
    matched_tags = get_top_taste_tags(db, uid)
    return [
        to_recommendation_out(
            c,
            interactions.get(c["id"]),
            compute_match_percentage(c.get("tags", []), c.get("basePopularity", 0), matched_tags),
            matched_tags,
        )
        for c in featured
    ]


def get_mood_recommendations(db, uid: str, mood_text: str | None, mood_chip_id: str | None, limit: int = 2) -> list[RecommendationOut]:
    all_content = get_all_content(db)
    interactions = get_interactions_map(db, uid)
    scored = score_mood_request(all_content, mood_text, mood_chip_id, limit)

    from app.services.scoring import match_tags_and_categories, MOOD_CHIP_QUERY

    query = mood_text or MOOD_CHIP_QUERY.get(mood_chip_id or "", "")
    matched_tags, _ = match_tags_and_categories(query)

    return [
        to_recommendation_out(content, interactions.get(content["id"]), pct, matched_tags)
        for content, pct in scored
    ]


def get_explore(db, uid: str, filter_id: str, source_id: str | None) -> list[RecommendationOut]:
    all_content = get_all_content(db)
    interactions = get_interactions_map(db, uid)
    matched_tags = get_top_taste_tags(db, uid)
    results = get_explore_recommendations(all_content, filter_id, source_id)
    return [
        to_recommendation_out(
            c,
            interactions.get(c["id"]),
            compute_match_percentage(c.get("tags", []), c.get("basePopularity", 0), matched_tags),
            matched_tags,
        )
        for c in results
    ]


def get_saved(db, uid: str, category: str = "all") -> list[RecommendationOut]:
    all_content = {c["id"]: c for c in get_all_content(db)}
    interactions = get_interactions_map(db, uid)
    matched_tags = get_top_taste_tags(db, uid)

    saved_ids = [cid for cid, i in interactions.items() if i.get("saved")]
    results = []
    for cid in saved_ids:
        content = all_content.get(cid)
        if not content:
            continue
        if category != "all" and content.get("category") != category:
            continue
        results.append(
            to_recommendation_out(
                content,
                interactions.get(cid),
                compute_match_percentage(content.get("tags", []), content.get("basePopularity", 0), matched_tags),
                matched_tags,
            )
        )
    return results


def set_save(db, uid: str, content_id: str, saved: bool) -> None:
    ref = db.collection("users").document(uid).collection(INTERACTIONS_SUBCOLLECTION).document(content_id)
    ref.set({"saved": saved}, merge=True)


def set_rating(db, uid: str, content_id: str, value: int) -> None:
    ref = db.collection("users").document(uid).collection(INTERACTIONS_SUBCOLLECTION).document(content_id)
    ref.set({"rating": value}, merge=True)
