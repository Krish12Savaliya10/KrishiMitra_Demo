# FILE SUMMARY

## Project Architecture Overview
KrishiMitra is a comprehensive Farm Management and Precision Agriculture system.
- **Frontend**: A React application (built with Vite / TanStack Start) providing UI for scheduling, dashboards, crop planning, weather, and AI Chat.
- **Backend**: A Node.js/Express REST API serving the frontend, communicating with MongoDB for persistence, and connecting to an ML backend for intelligent features.
- **ML Backend**: A Flask application serving machine learning predictions (e.g., random forest model), Open-Meteo weather integration, and RAG capabilities (using LangChain and ChromaDB) for the AI Saathi.

## Execution Flow
1. **Frontend to Backend**: React components (e.g., `_app.schedule.jsx`) make HTTP requests to the Express API (e.g., `/api/schedule`).
2. **Backend**: Express routes pass requests to controllers (`crudFactory.js`), which perform validation and interact with MongoDB via Mongoose models.
3. **AI/ML Interactions**: When AI recommendations or crop disease queries occur, the Express backend makes HTTP calls to the ML Flask service (port 5005). The ML service runs inference or vector DB queries and returns predictions/RAG context back to the Node.js backend.

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

