from fastapi import APIRouter, Depends
from firebase_admin import auth as firebase_auth

from app.dependencies import get_db
from app.models.auth import AuthResponse, LoginRequest, RegisterRequest, SocialLoginRequest
from app.services import firebase_auth_rest, users

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=AuthResponse)
def register(payload: RegisterRequest, db=Depends(get_db)):
    result = firebase_auth_rest.sign_up(payload.email, payload.password)
    uid = result["localId"]
    users.create_user_doc(db, uid, payload.fullName, payload.email)
    return AuthResponse(userId=uid, token=result["idToken"], needsOnboarding=True)


@router.post("/login", response_model=AuthResponse)
def login(payload: LoginRequest, db=Depends(get_db)):
    result = firebase_auth_rest.sign_in(payload.email, payload.password)
    uid = result["localId"]
    needs_onboarding = users.get_needs_onboarding(db, uid)
    return AuthResponse(userId=uid, token=result["idToken"], needsOnboarding=needs_onboarding)


@router.post("/social", response_model=AuthResponse)
def social_login(payload: SocialLoginRequest, db=Depends(get_db)):
    decoded = firebase_auth.verify_id_token(payload.idToken)
    uid = decoded["uid"]
    data = users.ensure_user_doc(db, uid, decoded.get("email"))
    return AuthResponse(userId=uid, token=payload.idToken, needsOnboarding=data.get("needsOnboarding", True))


@router.post("/logout")
def logout():
    # ID-token auth has no server-side session to invalidate; the client just discards its token.
    return {"success": True}
