# Simple, explainable taste-profile derivation from a user's interactions.
# Intentionally rule-based (no ML/embeddings) to match the mock data's spirit and
# stay buildable/demoable for a student team.

from app.models.taste_profile import CategoryProgress, DominantProfile, RadarPoint, TasteProfileOut
from app.services.content_catalog import get_all_content, get_interactions_map

RADAR_AXES = [
    {"id": "axis-1", "label": "Kara Mizah", "tag": "Kara Mizah"},
    {"id": "axis-2", "label": "Gizem", "tag": "Gizemli"},
    {"id": "axis-3", "label": "Distopik", "tag": "Distopik"},
    {"id": "axis-4", "label": "Karakter Derinliği", "tag": "Karakter Odaklı"},
    {"id": "axis-5", "label": "Fantastik", "tag": "Fantastik"},
    {"id": "axis-6", "label": "Rahatlatıcı", "tag": "Rahatlatıcı"},
]

CATEGORIES = ["dizi", "film", "kitap", "yemek", "muzik", "oyun"]

LIKED_RATING_THRESHOLD = 4
DISLIKED_RATING_MAX = 2


def _liked_content(all_content: dict[str, dict], interactions: dict[str, dict]) -> list[dict]:
    liked = []
    for cid, interaction in interactions.items():
        if interaction.get("saved") or interaction.get("rating", 0) >= LIKED_RATING_THRESHOLD:
            content = all_content.get(cid)
            if content:
                liked.append(content)
    return liked


def _disliked_tags(all_content: dict[str, dict], interactions: dict[str, dict]) -> list[str]:
    tags: list[str] = []
    for cid, interaction in interactions.items():
        rating = interaction.get("rating", 0)
        if 0 < rating <= DISLIKED_RATING_MAX:
            content = all_content.get(cid)
            if content:
                tags += content.get("tags", [])
    # de-dupe, preserve order, cap at 4
    seen = []
    for t in tags:
        if t not in seen:
            seen.append(t)
    return seen[:4]


def _explore_themes(all_content: dict[str, dict], interactions: dict[str, dict], limit: int = 4) -> list[str]:
    interacted_tags = set()
    for cid in interactions:
        content = all_content.get(cid)
        if content:
            interacted_tags.update(content.get("tags", []))
    all_tags = {t for c in all_content.values() for t in c.get("tags", [])}
    fresh = sorted(all_tags - interacted_tags)
    return fresh[:limit]


def compute_taste_profile(db, uid: str) -> TasteProfileOut:
    all_content = {c["id"]: c for c in get_all_content(db)}
    interactions = get_interactions_map(db, uid)
    liked = _liked_content(all_content, interactions)

    radar_points = []
    for axis in RADAR_AXES:
        hits = sum(1 for c in liked if axis["tag"] in c.get("tags", []))
        value = min(100, 50 + hits * 10) if liked else 50
        radar_points.append(RadarPoint(id=axis["id"], label=axis["label"], value=value))

    category_progress = []
    for category in CATEGORIES:
        cat_liked = [c for c in liked if c.get("category") == category]
        if cat_liked:
            avg = sum(c.get("basePopularity", 50) for c in cat_liked) / len(cat_liked)
        else:
            avg = 50
        category_progress.append(CategoryProgress(category=category, percentage=round(avg)))

    if liked:
        top_axis = max(radar_points, key=lambda p: p.value)
        second_axis = sorted(radar_points, key=lambda p: p.value, reverse=True)[1]
        dominant = DominantProfile(
            title=f"{top_axis.label} & {second_axis.label}",
            description=(
                f"Puanladığın içeriklerin büyük çoğunluğu {top_axis.label.lower()} ve "
                f"{second_axis.label.lower()} temaları taşıyor."
            ),
        )
    else:
        dominant = DominantProfile(
            title="Zevk Profilin Oluşuyor",
            description="Henüz yeterli puanlama/kayıt yok — birkaç öneriyi puanladıkça profilin netleşecek.",
        )

    return TasteProfileOut(
        dominantProfile=dominant,
        radarData=radar_points,
        categoryProgress=category_progress,
        avoidedThemes=_disliked_tags(all_content, interactions),
        exploreThemes=_explore_themes(all_content, interactions),
    )
