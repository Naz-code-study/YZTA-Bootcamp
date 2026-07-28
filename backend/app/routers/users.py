from fastapi import APIRouter, Depends

from app.dependencies import CurrentUser, get_current_user, get_db
from app.models.onboarding import OnboardingRequest
from app.models.recommendation import RecommendationOut
from app.models.taste_profile import TasteProfileOut
from app.models.user import SettingsPatch, UserPublic, UserSettings
from app.services import content_catalog, users
from app.services.taste_profile import compute_taste_profile

router = APIRouter(prefix="/users/me", tags=["users"])


@router.get("", response_model=UserPublic)
def get_me(user: CurrentUser = Depends(get_current_user), db=Depends(get_db)):
    return users.get_user_public(db, user.uid)


@router.post("/onboarding")
def submit_onboarding(payload: OnboardingRequest, user: CurrentUser = Depends(get_current_user), db=Depends(get_db)):
    users.submit_onboarding(db, user.uid, payload)
    return {"success": True}


@router.get("/settings", response_model=UserSettings)
def get_settings(user: CurrentUser = Depends(get_current_user), db=Depends(get_db)):
    return users.get_settings(db, user.uid)


@router.patch("/settings", response_model=UserSettings)
def patch_settings(payload: SettingsPatch, user: CurrentUser = Depends(get_current_user), db=Depends(get_db)):
    return users.patch_settings(db, user.uid, payload)


@router.get("/taste-profile", response_model=TasteProfileOut)
def get_taste_profile(user: CurrentUser = Depends(get_current_user), db=Depends(get_db)):
    return compute_taste_profile(db, user.uid)


@router.get("/saved", response_model=list[RecommendationOut])
def get_saved(category: str = "all", user: CurrentUser = Depends(get_current_user), db=Depends(get_db)):
    return content_catalog.get_saved(db, user.uid, category)


@router.delete("/data")
def delete_data(user: CurrentUser = Depends(get_current_user), db=Depends(get_db)):
    users.reset_user_data(db, user.uid)
    return {"success": True}
