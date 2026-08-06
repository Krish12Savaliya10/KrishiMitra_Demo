# KrishiMitra Backend

Node.js + Express + MongoDB (Mongoose) API for the KrishiMitra frontend.

## Setup

```bash
cd krishmitra-backend
npm install
cp .env.example .env   # fill in MONGO_URI, JWT_SECRET, OLLAMA_BASE_URL
npm run dev            # nodemon, http://localhost:5000
```

Needs a running MongoDB (local `mongod` or Atlas) and, for the chatbot, a running Ollama
instance (`ollama serve`, with a model pulled e.g. `ollama pull llama3.1`).

## Auth

All routes below except `/api/auth/register` and `/api/auth/login` require:
`Authorization: Bearer <token>`

| Method | Route              | Body                                                                 |
|--------|--------------------|-----------------------------------------------------------------------|
| POST   | /api/auth/register | firstName, lastName, phone, email, password, role, location, waterResources[], equipment[] |
| POST   | /api/auth/login    | phone or email, password                                              |
| GET    | /api/auth/me       | -                                                                      |

## Resource routes (all owner-scoped, standard REST)

Every resource below supports: `GET /`, `POST /`, `GET /:id`, `PATCH /:id`, `DELETE /:id`

- `/api/farms`
- `/api/equipment`
- `/api/crop-plans`
- `/api/schedule`
- `/api/soil-reports`
- `/api/recommendations`
- `/api/alerts`
- `/api/expenses`
- `/api/notifications`

## AI Mitra chatbot

| Method | Route                  | Body / Notes                                      |
|--------|------------------------|----------------------------------------------------|
| POST   | /api/chat              | `{ sessionId, message }` → replies using Ollama, grounded with the user's farm/soil context |
| GET    | /api/chat/:sessionId   | Full message history for that session              |

## Schema relationships

```
User (1) ──< Farm (many plots)
Farm  (1) ──< Equipment
Farm  (1) ──< CropPlan ──< ScheduleTask
Farm  (1) ──< SoilReport ──< Recommendation
User  (1) ──< Alert
User  (1) ──< Expense (via Farm/CropPlan)
User  (1) ──< Notification
User  (1) ──< ChatMessage (grouped by sessionId)
```

## Frontend wiring notes

- Replace `AppDataContext`'s localStorage reads/writes with `fetch` calls to these routes.
- Store the JWT from login/register in memory or `localStorage` (short-lived), attach as
  `Authorization: Bearer <token>` on every request.
- The AI Mitra sidebar button currently does `alert("coming soon")` — point it at `POST /api/chat`
  with a generated `sessionId` (e.g. `crypto.randomUUID()` stored per browser tab).
