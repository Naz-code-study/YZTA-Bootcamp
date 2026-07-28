# Ported from data/mockData.js EXPLORE_FILTERS.

EXPLORE_FILTERS = [
    {"id": "all", "label": "Tümü", "tagMatch": None},
    {"id": "ters-kose", "label": "Ters Köşe", "tagMatch": ["Zihin Bükücü", "Anti-Kahraman"]},
    {"id": "distopik", "label": "Distopik", "tagMatch": ["Distopik"]},
    {"id": "yuksek-tempo", "label": "Yüksek Tempo", "tagMatch": ["Yüksek Tempo", "Aksiyon"]},
    {"id": "konfor-yemek", "label": "Konfor Yemeği", "tagMatch": ["Konfor Yemeği"]},
    {"id": "karanlik", "label": "Karanlık Atmosfer", "tagMatch": ["Karanlık Atmosfer"]},
    {"id": "ilham", "label": "İlham Verici", "tagMatch": ["İlham Verici", "Motive Edici"]},
    {"id": "fantastik", "label": "Fantastik", "tagMatch": ["Fantastik"]},
]

_FILTERS_BY_ID = {f["id"]: f for f in EXPLORE_FILTERS}


def get_explore_recommendations(all_content: list[dict], filter_id: str = "all", source_item_id: str | None = None) -> list[dict]:
    filter_def = _FILTERS_BY_ID.get(filter_id)
    results = all_content

    if filter_def and filter_def.get("tagMatch"):
        tag_match = filter_def["tagMatch"]
        results = [c for c in results if any(t in tag_match for t in c.get("tags", []))]

    if source_item_id:
        source_index = next((i for i, c in enumerate(results) if c["id"] == source_item_id), -1)
        if source_index > 0:
            source_item = results.pop(source_index)
            results = [source_item] + results

    return results
