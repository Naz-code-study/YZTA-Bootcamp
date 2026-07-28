from dataclasses import dataclass

from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from firebase_admin import auth as firebase_auth

from app.firebase import get_firestore_client

bearer_scheme = HTTPBearer(auto_error=False)


@dataclass
class CurrentUser:
    uid: str
    email: str | None


async def get_current_user(
    creds: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
) -> CurrentUser:
    if creds is None:
        raise HTTPException(status_code=401, detail="Missing bearer token")
    try:
        decoded = firebase_auth.verify_id_token(creds.credentials)
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return CurrentUser(uid=decoded["uid"], email=decoded.get("email"))


def get_db():
    return get_firestore_client()
