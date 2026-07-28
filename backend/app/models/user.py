from pydantic import BaseModel


class UserPublic(BaseModel):
    name: str
    initials: str
    tasteHeadline: str


class UserSettings(BaseModel):
    darkMode: bool = False
    notifications: bool = True
    language: str = "tr"


class SettingsPatch(BaseModel):
    darkMode: bool | None = None
    notifications: bool | None = None
    language: str | None = None
