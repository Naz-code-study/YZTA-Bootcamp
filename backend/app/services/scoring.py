# Ported from data/mockData.js KEYWORD_TAG_MAP + getMoodBasedRecommendations.
# (mockData.js also has an unused getAIRecommendationsForMood/MOOD_RECOMMENDATION_MAP —
# that one is dead code in the frontend and intentionally not ported here.)

KEYWORD_TAG_MAP = [
    {
        "keywords": ["yorgun", "yoruldum", "dinlenmek", "bitkin"],
        "tags": ["Hafif Tempo", "Rahatlatıcı", "Sıcak Atmosfer", "Pratik"],
    },
    {
        "keywords": ["gizem", "gizemli", "merak", "sürükleyici"],
        "tags": ["Gizemli", "Distopik", "Karanlık Atmosfer"],
    },
    {
        "keywords": ["kafamı dağıt", "dağıtmak", "eğlen", "komik", "mizah"],
        "tags": ["Kara Mizah", "Hafif Tempo", "Görsel Şölen"],
    },
    {
        "keywords": ["ye", "yemek", "aç", "doyur", "lezzet"],
        "categories": ["yemek"],
    },
    {
        "keywords": ["motive", "motivasyon", "ilham", "umut"],
        "tags": ["Motive Edici", "İlham Verici"],
    },
    {
        "keywords": ["rahatla", "sakin", "huzur", "stresli", "stres"],
        "tags": ["Rahatlatıcı", "Sıcak Atmosfer", "Hafif Tempo"],
    },
    {
        "keywords": ["mutlu", "neşeli", "keyifli"],
        "tags": ["Görsel Şölen", "Sıcak Atmosfer", "Duygusal"],
    },
]

# MOOD_CHIPS ids (from mockData.js) mapped to a representative keyword string,
# since the frontend's chip labels are themselves the keywords.
MOOD_CHIP_QUERY = {
    "m1": "mutlu",
    "m2": "yorgun",
    "m3": "gizemli bir şeyler",
    "m4": "kafamı dağıt",
    "m5": "ne yesem",
    "m6": "motive ol",
    "m7": "rahatlamak",
}


def match_tags_and_categories(query: str) -> tuple[list[str], list[str]]:
    query = query.lower()
    tags: list[str] = []
    categories: list[str] = []
    for entry in KEYWORD_TAG_MAP:
        if any(kw in query for kw in entry["keywords"]):
            tags += entry.get("tags", [])
            categories += entry.get("categories", [])
    return tags, categories


def compute_match_percentage(
    content_tags: list[str], base_popularity: float, matched_tags: list[str]
) -> float:
    tag_hits = sum(1 for t in content_tags if t in matched_tags)
    raw = tag_hits * 10 + base_popularity
    return min(100, raw)


def score_mood_request(
    all_content: list[dict],
    mood_text: str | None,
    mood_chip_id: str | None,
    limit: int = 2,
) -> list[tuple[dict, float]]:
    query = mood_text or MOOD_CHIP_QUERY.get(mood_chip_id or "", "")
    matched_tags, matched_categories = match_tags_and_categories(query)

    pool = all_content
    if matched_categories:
        pool = [c for c in pool if c["category"] in matched_categories]

    scored = [
        (c, compute_match_percentage(c.get("tags", []), c.get("basePopularity", 0), matched_tags))
        for c in pool
    ]
    scored.sort(key=lambda pair: pair[1], reverse=True)

    top = scored[:limit]
    if top:
        return top

    # No keyword match at all -> fall back to highest basePopularity, same as the mock's fallback.
    fallback = sorted(all_content, key=lambda c: c.get("basePopularity", 0), reverse=True)
    return [(c, c.get("basePopularity", 0)) for c in fallback[:limit]]
