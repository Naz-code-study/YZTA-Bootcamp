import firebase_admin
from firebase_admin import credentials, firestore

from app.config import settings

_db = None


def init_app() -> None:
    if firebase_admin._apps:
        return
    cred = credentials.Certificate(settings.firebase_credentials_path)
    firebase_admin.initialize_app(cred)


def get_firestore_client():
    global _db
    if _db is None:
        init_app()
        _db = firestore.client()
    return _db
