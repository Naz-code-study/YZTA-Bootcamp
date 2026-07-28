# Firebase Admin SDK can create/manage users but cannot verify a password or mint an
# ID token. Sign-up/sign-in with email+password is proxied to Google's Identity Toolkit
# REST API instead, using the project's public Web API Key.

import httpx
from fastapi import HTTPException

from app.config import settings

IDENTITY_TOOLKIT_BASE = "https://identitytoolkit.googleapis.com/v1/accounts"


def _call(endpoint: str, payload: dict) -> dict:
    url = f"{IDENTITY_TOOLKIT_BASE}:{endpoint}?key={settings.firebase_web_api_key}"
    response = httpx.post(url, json={**payload, "returnSecureToken": True}, timeout=10)
    if response.status_code != 200:
        message = response.json().get("error", {}).get("message", "Auth request failed")
        raise HTTPException(status_code=400, detail=message)
    return response.json()


def sign_up(email: str, password: str) -> dict:
    return _call("signUp", {"email": email, "password": password})


def sign_in(email: str, password: str) -> dict:
    return _call("signInWithPassword", {"email": email, "password": password})
