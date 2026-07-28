from pydantic import BaseModel


class RecommendationOut(BaseModel):
    id: str
    title: str
    category: str
    subtitle: str | None = None
    matchPercentage: int
    tags: list[str]
    description: str | None = None
    aiNote: str | None = None
    userRating: int = 0
    saved: bool = False


class MoodRequest(BaseModel):
    moodText: str | None = None
    moodChipId: str | None = None
    limit: int = 2


class RatingRequest(BaseModel):
    value: int
