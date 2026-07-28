from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app import firebase
from app.routers import auth, recommendations, users

app = FastAPI(title="MoodTaste AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(recommendations.router)


@app.on_event("startup")
def init_firebase() -> None:
    firebase.init_app()


@app.get("/health")
def health():
    return {"status": "ok"}
