from datetime import datetime, timezone

from app.models.onboarding import OnboardingRequest
from app.models.user import SettingsPatch, UserSettings

DEFAULT_SETTINGS = {"darkMode": False, "notifications": True, "language": "tr"}


def _initials(full_name: str) -> str:
    parts = [p for p in full_name.strip().split(" ") if p]
    if not parts:
        return "?"
    if len(parts) == 1:
        return parts[0][0].upper()
    return (parts[0][0] + parts[-1][0]).upper()


def create_user_doc(db, uid: str, full_name: str, email: str) -> None:
    db.collection("users").document(uid).set(
        {
            "fullName": full_name,
            "email": email,
            "initials": _initials(full_name),
            "tasteHeadline": "Zevk Kâşifi",
            "needsOnboarding": True,
            "settings": DEFAULT_SETTINGS,
        }
    )


def ensure_user_doc(db, uid: str, email: str | None) -> dict:
    ref = db.collection("users").document(uid)
    doc = ref.get()
    if doc.exists:
        return doc.to_dict()
    data = {
        "fullName": email or "Kullanıcı",
        "email": email or "",
        "initials": _initials(email or "K"),
        "tasteHeadline": "Zevk Kâşifi",
        "needsOnboarding": True,
        "settings": DEFAULT_SETTINGS,
    }
    ref.set(data)
    return data


def get_needs_onboarding(db, uid: str) -> bool:
    doc = db.collection("users").document(uid).get()
    if not doc.exists:
        return True
    return doc.to_dict().get("needsOnboarding", True)


def get_user_public(db, uid: str) -> dict:
    doc = db.collection("users").document(uid).get()
    data = doc.to_dict() if doc.exists else {}
    return {
        "name": data.get("fullName", "Kullanıcı"),
        "initials": data.get("initials", "?"),
        "tasteHeadline": data.get("tasteHeadline", "Zevk Kâşifi"),
    }


def get_settings(db, uid: str) -> UserSettings:
    doc = db.collection("users").document(uid).get()
    data = (doc.to_dict() or {}).get("settings", DEFAULT_SETTINGS) if doc.exists else DEFAULT_SETTINGS
    return UserSettings(**{**DEFAULT_SETTINGS, **data})


def patch_settings(db, uid: str, patch: SettingsPatch) -> UserSettings:
    updates = {f"settings.{k}": v for k, v in patch.model_dump(exclude_none=True).items()}
    if updates:
        db.collection("users").document(uid).update(updates)
    return get_settings(db, uid)


def submit_onboarding(db, uid: str, payload: OnboardingRequest) -> None:
    user_ref = db.collection("users").document(uid)
    user_ref.collection("onboarding").document("answers").set(
        {
            "contentTypes": payload.contentTypes,
            "atmosphere": payload.atmosphere,
            "need": payload.need,
            "submittedAt": datetime.now(timezone.utc),
        }
    )
    user_ref.update({"needsOnboarding": False})


def reset_user_data(db, uid: str) -> None:
    user_ref = db.collection("users").document(uid)

    for doc in user_ref.collection("interactions").stream():
        doc.reference.delete()

    taste_profile_doc = user_ref.collection("tasteProfile").document("current")
    if taste_profile_doc.get().exists:
        taste_profile_doc.delete()

    onboarding_doc = user_ref.collection("onboarding").document("answers")
    if onboarding_doc.get().exists:
        onboarding_doc.delete()

    user_ref.update({"needsOnboarding": True})
