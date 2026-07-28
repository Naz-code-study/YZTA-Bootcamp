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
