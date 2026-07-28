from fastapi import APIRouter, Depends

from app.dependencies import CurrentUser, get_current_user, get_db
from app.models.recommendation import MoodRequest, RatingRequest, RecommendationOut
from app.services import content_catalog

router = APIRouter(prefix="/recommendations", tags=["recommendations"])


@router.get("/featured", response_model=list[RecommendationOut])
def get_featured(user: CurrentUser = Depends(get_current_user), db=Depends(get_db)):
    return content_catalog.get_featured_recommendations(db, user.uid)


@router.post("/mood", response_model=list[RecommendationOut])
def mood_recommendations(payload: MoodRequest, user: CurrentUser = Depends(get_current_user), db=Depends(get_db)):
    return content_catalog.get_mood_recommendations(
        db, user.uid, payload.moodText, payload.moodChipId, payload.limit
    )


@router.get("/explore", response_model=list[RecommendationOut])
def explore(
    filter: str = "all",
    sourceId: str | None = None,
    user: CurrentUser = Depends(get_current_user),
    db=Depends(get_db),
):
    return content_catalog.get_explore(db, user.uid, filter, sourceId)


@router.post("/{content_id}/save")
def save(content_id: str, user: CurrentUser = Depends(get_current_user), db=Depends(get_db)):
    content_catalog.set_save(db, user.uid, content_id, True)
    return {"success": True}


@router.delete("/{content_id}/save")
def unsave(content_id: str, user: CurrentUser = Depends(get_current_user), db=Depends(get_db)):
    content_catalog.set_save(db, user.uid, content_id, False)
    return {"success": True}


@router.post("/{content_id}/rating")
def rate(content_id: str, payload: RatingRequest, user: CurrentUser = Depends(get_current_user), db=Depends(get_db)):
    content_catalog.set_rating(db, user.uid, content_id, payload.value)
    return {"success": True}
