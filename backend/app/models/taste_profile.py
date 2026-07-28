from pydantic import BaseModel


class RadarPoint(BaseModel):
    id: str
    label: str
    value: int


class CategoryProgress(BaseModel):
    category: str
    percentage: int


class DominantProfile(BaseModel):
    title: str
    description: str


class TasteProfileOut(BaseModel):
    dominantProfile: DominantProfile
    radarData: list[RadarPoint]
    categoryProgress: list[CategoryProgress]
    avoidedThemes: list[str]
    exploreThemes: list[str]
