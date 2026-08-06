# KrishiMitra ML Service — Django (was Flask)

Drop-in replacement for `ml-service/app.py`. Same 6 endpoints, same JSON
contracts, same port (5005) — the Node backend needs **zero changes**.

| Old Flask route         | New Django/DRF view      |
|--------------------------|---------------------------|
| POST /api/retrieve        | `core.views.RetrieveView` |
| POST /api/soil_recommend  | `core.views.SoilRecommendView` |
| POST /api/crop_stage_tips | `core.views.CropStageTipsView` |
| POST /api/predict_disease | `core.views.PredictDiseaseView` |
| GET  /api/health           | `core.views.HealthView` |
| GET  /api/weather           | `core.views.WeatherView` |

## Setup
```bash
cd ml_service_django
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate          # creates the local sqlite (Django bookkeeping only)
```

Copy these artifacts from the old `ml-service/` folder into place (paths are
already referenced by `core/ml_loader.py`):
- `../crop_model.keras`, `../class_names.json`, `../yolov8n.pt` — same relative
  locations as before, one level above this project (project root).
- `core/model_rf/best_model.joblib` — optional; falls back to the rule-based
  heuristic scorer if missing (same behavior as the Flask version).
- `../knowledge-base/chroma_db/` — the ChromaDB persistence folder.

## Run
```bash
python manage.py runserver 0.0.0.0:5005
```

## What changed structurally (why this satisfies the FCSP-2 syllabus)
- **Flask → Django + Django REST Framework**: `@app.route` functions became
  `APIView` classes with `DRF serializers` for request validation (Unit 8-10:
  Django Framework, Forms/data validation, REST Framework).
- **Module-level model loading → `AppConfig.ready()`**: `core/apps.py` loads
  ChromaDB / Keras / RF / YOLO exactly once at boot, the Django-idiomatic
  equivalent of what used to sit at the top of `app.py`.
- **Pandas / EDA, regression & classification (Units 1, 4, 5)**: still live in
  `SoilRecommendView` (RandomForest classifier + heuristic scorer using a
  pandas DataFrame for model input).
- **Deep learning / CNN (Unit 6)**: `PredictDiseaseView` — YOLO leaf crop →
  Keras CNN classification → confidence/top-3, unchanged.
- **Web scraping / APIs (Unit 7)**: `WeatherView` calls the Open-Meteo REST
  API via `requests`, unchanged; Gemini/Ollama calls in `PredictDiseaseView`
  are also REST API integration.
- Kept `sqlite3` wiring available via Django's ORM/`manage.py` even though
  this service is otherwise stateless, since the syllabus explicitly covers
  Django + sqlite3 connect/cursor/execute patterns (Unit 9) — you can add a
  `models.py` here if you want a graded model to point to.

## Subject-weight balance (FSD-2 vs FCSP-2)
Your project as a whole is now a genuine ~50/50 split instead of being almost
entirely FSD-2 content:

- **FSD-2 (Node/Express/React/MongoDB/Mongoose)** — `backend/` + `frontend/`:
  auth, Farm/CropPlan/ScheduleTask/Recommendation CRUD, JWT, multi-farm
  dashboard, React hooks/routing — covers Units 1–10 of FSD-2.
- **FCSP-2 (Python/Pandas/ML/Deep Learning/Django)** — `ml_service_django/`:
  pandas + RandomForest crop recommendation, CNN disease detection, RAG
  retrieval, Django + DRF backend — covers Units 1, 3–10 of FCSP-2 (EDA/
  visualization from Units 1–2 can be added as a small Jupyter notebook or a
  `/api/eda-report` endpoint if you want to also tick Unit 2 explicitly).

If you want to push it further toward Unit 2 (Seaborn/Plotly/Dash, Unit 2 of
FCSP-2) I can add a small `/api/soil_report_chart` endpoint that returns a
Plotly JSON spec for the frontend to render — say the word and I'll add it.
