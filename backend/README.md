# MoodTaste AI — Backend

FastAPI + Firebase (Auth + Firestore) backend for the MoodTaste AI mobile app.

## Setup

1. Create a Firebase project (or use the team's existing one) and enable the **Email/Password**
   sign-in provider under Authentication → Sign-in method.
2. Generate a service account key: Project Settings → Service Accounts → Generate new private key.
   Save the downloaded file as `backend/firebase-credentials.json` (already gitignored).
3. Copy the **Web API Key** from Project Settings → General.
4. Copy `.env.example` to `.env` and fill in both values:

   ```bash
   cp .env.example .env
   ```

5. Install dependencies:

   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   ```

6. Seed the content catalog (loads the starter recommendations into Firestore):

   ```bash
   python -m app.seed.seed_catalog
   ```

7. Run the API:

   ```bash
   uvicorn app.main:app --reload
   ```

   Swagger UI: http://localhost:8000/docs

## Auth flow

Clients call `POST /auth/register` or `POST /auth/login` to get a Firebase ID token, then send it
as `Authorization: Bearer <token>` on every other request. The backend verifies the token via the
Firebase Admin SDK — it never handles or stores raw passwords itself (that's proxied to Firebase's
Identity Toolkit REST API).

## Endpoints

| Endpoint | Auth | Body / Query | Notes |
|---|---|---|---|
| `POST /auth/register` | — | `{fullName, email, password}` | Creates the Firebase user + `users/{uid}` doc, returns an ID token |
| `POST /auth/login` | — | `{email, password}` | Returns an ID token + `needsOnboarding` |
| `POST /auth/social` | — | `{provider, idToken}` | Verifies a client-supplied Firebase ID token, upserts the user doc |
| `POST /auth/logout` | — | — | No-op 200 (client just discards the token) |
| `GET /users/me` | Bearer | — | `{name, initials, tasteHeadline}` |
| `POST /users/me/onboarding` | Bearer | `{contentTypes[], atmosphere, need}` | Flips `needsOnboarding` to `false` |
| `GET /users/me/settings` | Bearer | — | `{darkMode, notifications, language}` |
| `PATCH /users/me/settings` | Bearer | any subset of the above | |
| `GET /users/me/taste-profile` | Bearer | — | Radar data, category progress, dominant profile — derived from interactions |
| `GET /users/me/saved` | Bearer | `?category=` (default `all`) | |
| `DELETE /users/me/data` | Bearer | — | Wipes interactions/onboarding/taste-profile, resets `needsOnboarding` |
| `GET /recommendations/featured` | Bearer | — | |
| `POST /recommendations/mood` | Bearer | `{moodText?, moodChipId?, limit?}` | See mood-matching section below |
| `GET /recommendations/explore` | Bearer | `?filter=&sourceId=` | |
| `POST /recommendations/{id}/save` | Bearer | — | |
| `DELETE /recommendations/{id}/save` | Bearer | — | |
| `POST /recommendations/{id}/rating` | Bearer | `{value: 0-5}` | |
| `GET /health` | — | — | Liveness check |

Full interactive docs (request/response schemas) are at `/docs` (Swagger UI) once the server is running.

## Mood matching: keyword rules + vector similarity

`POST /recommendations/mood` first checks the mood text/chip against `scoring.KEYWORD_TAG_MAP`
(literal Turkish keyword → tag list, ported from the frontend mock). If that hits, ranking stays
keyword-driven (validated behavior), with a small TF-IDF cosine-similarity nudge for tie-breaking.

If the free text doesn't match any literal keyword, `services/vector_similarity.py` builds TF-IDF
vectors over each content item's title/subtitle/description/tags and ranks by cosine similarity to
the query — this is what the product's "Vektörel Benzerlik" feature actually refers to. It's a
lexical vector method (no model download, `scikit-learn` only), not a neural embedding — it won't
catch synonyms with zero shared vocabulary (e.g. "uykum geldi" vs. "Rahatlatıcı"), in which case it
falls back to popularity ranking instead of returning a meaningless tie. Swapping in real sentence
embeddings later is a drop-in change to that one file.
