# Lightweight vector-similarity layer (TF-IDF + cosine similarity) used to fulfil the
# "Vektörel Benzerlik" product feature for free-text mood queries that don't hit any
# literal keyword in scoring.KEYWORD_TAG_MAP. No external model download needed.

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def _content_text(content: dict) -> str:
    parts = [
        content.get("title", ""),
        content.get("subtitle") or "",
        content.get("description") or "",
        " ".join(content.get("tags", [])),
    ]
    return " ".join(parts)


def rank_by_semantic_similarity(all_content: list[dict], query: str) -> dict[str, float]:
    """Cosine similarity (0-1) between `query` and each content item's text, keyed by content id."""
    if not query.strip() or not all_content:
        return {c["id"]: 0.0 for c in all_content}

    docs = [_content_text(c) for c in all_content]
    vectorizer = TfidfVectorizer()
    matrix = vectorizer.fit_transform(docs + [query])
    query_vec = matrix[-1]
    content_vecs = matrix[:-1]
    sims = cosine_similarity(query_vec, content_vecs)[0]
    return {c["id"]: float(s) for c, s in zip(all_content, sims)}
