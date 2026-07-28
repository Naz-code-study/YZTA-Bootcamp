from pydantic import BaseModel


class OnboardingRequest(BaseModel):
    contentTypes: list[str]
    atmosphere: str
    need: str
