# FILE SUMMARY

## Project Architecture Overview
KrishiMitra is a comprehensive Farm Management and Precision Agriculture system.
- **Frontend**: A React application (built with Vite / TanStack Start) providing UI for scheduling, dashboards, crop planning, weather, and AI Chat.
- **Backend Server**: A unified Django application handling the API, ORM (db.sqlite3), and JWT authentication using Django REST Framework.
- **ML Backend**: The machine learning endpoints (Random Forest, Open-Meteo, RAG with ChromaDB) are directly integrated into the Django backend using DRF views.

### System Architecture
1. **Frontend**: Vite + React App
2. **Backend**: Django REST Framework serving API endpoints on port 5001.
3. **AI/ML Interactions**: The Django backend natively loads the ML models into memory and serves predictions and RAG context directly through its DRF views.

## Key Files & Purpose

### Root
- `setup-mac.sh` / `start-mac.sh`: Environment setup and concurrent execution of all services.
- `docs/TODO.md`: Project status and pending tasks.

### Frontend (`frontend/src/`)
- **`routes/`**: Contains the page layouts and logic.
  - `_app.schedule.jsx`: Task management and daily agenda.
  - `_app.weather.jsx`: 10-day weather forecasts and dynamic UI indicators.
  - `_app.ai-saathi.jsx`: The conversational AI interface.
- **`components/`**: Reusable UI components (buttons, dialogs, charts).
- **`lib/`**: Context and utilities (`AppDataContext.jsx` manages API calls and state).

### Backend (`backend/`)
- **`server.js`**: Main Express application entry point.
- **`models/`**: Mongoose schemas defining MongoDB collections (e.g., `ScheduleTask.js`, `CropPlan.js`).
- **`controllers/` & `routes/`**: Route definitions and business logic. `crudFactory.js` provides generic data handling.
- **`services/`**: Complex logic decoupled from controllers (e.g., `scheduleEngine.js`).

### ML Service (`ml-service/`)
- **`app.py`**: Flask server exposing ML and weather endpoints.
- **`generate_knowledge.py` / `train_disease_model.py`**: Scripts for training the Random Forest models and populating the ChromaDB vector database.
- **`weather/services/openmeteo_service.py`**: Integration with Open-Meteo for localized forecasting.

