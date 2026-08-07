# KrishiMitra - AI Smart Farming Platform

**KrishiMitra** is a comprehensive, full-stack digital agriculture platform designed to empower Indian farmers with data-driven insights. It provides localized market price trends, weather monitoring, AI-driven crop recommendations, and a built-in computer vision module for early crop disease detection. By combining a modern React frontend with a robust Node.js/MongoDB backend and a specialized Python ML microservice, KrishiMitra delivers a complete, end-to-end agritech solution.

---

## 🏗️ Architecture Overview

The system features a **Stateful & Adaptive Crop Planning Architecture**:

```text
    [ Frontend UI ]
          │
          ▼
  [ Rule Engine (Django) ] ──────┐
   (Weather Rules, Overdue)      │ 
          │                      │ 
          ▼                      ▼
  [ State Store (DB) ]    [ RAG Explainer ]
 (Tracks Shift/Drift)     (ChromaDB + LLM)
```

### Adaptive Rule Engine
The daily task generator dynamically modifies crop schedules based on real-world constraints:
1. **Weather Interruptions:** If a task is `Irrigation` and forecast rain > 15mm, the task is marked as `Skipped`.
2. **Day-Offset Drift:** If an `Irrigation` or `Fertilizer` task is completed late, or left pending > 3 days, all downstream tasks are automatically shifted by the overdue gap, tracked globally via `driftDays`.
3. **Pest Escalations:** If the crop is in the `Flowering/Reproductive` stage and humidity is > 80% with rain, `Pest Scouting` tasks are automatically escalated to `Critical` priority.

Whenever a rule adjusts a task, the **RAG Layer** generates a natural-language, farmer-friendly explanation which is cached on the task record.

---

## 📚 Syllabus Coverage Mapping

This project was built to comprehensively demonstrate the topics outlined in the **FSD-2** and **FCSP-2** syllabi.

### FSD-2 (Full Stack Development with JavaScript-2)
| Topic | Covered by (file/route) |
|---|---|
| JSON parse/stringify, nested JSON | `frontend/src/lib/mock-data.js`, all Express API responses |
| Node core modules (fs, path, events) | `backend/server.js`, `multer` file handling |
| HTTP module / raw server | `backend/server.js` (`http.createServer`) |
| Express routing & middleware | `backend/routes/*`, `backend/middleware/auth.middleware.js` |
| RESTful API design + CORS | `backend/server.js` (CORS setup), `backend/routes/*` |
| Multer file upload | `backend/routes/disease.routes.js` |
| React fundamentals (JSX, props, routing) | `frontend/src/components/*`, `frontend/src/routes/*` |
| React Hooks (useState/useEffect/useContext) | `frontend/src/components/app/ChatWidget.jsx`, etc. |
| MongoDB queries/operators | `backend/controllers/chat.controller.js` |
| Mongoose schema/CRUD/validation | `backend/models/*` |
| Full MERN connectivity | `frontend/` (React) ↔ `backend/` (Express/Mongo) |

*(Note: EJS templating and Nodemailer were omitted in favor of a modern React SPA architecture.)*

### FCSP-2 (Fundamentals of CS using Python-2)
| Topic | Covered by (file/route) |
|---|---|
| Pandas / EDA | `ml-service/model_rf/preprocessor.joblib` generation pipeline |
| Classification (DT/RF/SVM) | `ml-service/model_rf/best_model.joblib` (Random Forest) |
| Deep learning / CNN / transfer learning | `ml-service/train_disease_model.py` (EfficientNet) |
| Web scraping / REST ingestion | `ml-service/weather/services/openmeteo_service.py` |



## 🚀 Setup & Run Instructions

**Prerequisites:** Ensure you have Node.js, Python 3.10+, and MongoDB running locally.

1. **Install Dependencies**
   Double-click the `SETUP.bat` script (Windows) or run the following in your terminal:
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   cd ../ml-service && python -m venv venv && source venv/bin/activate && pip install -r requirements.txt
   ```

2. **Start the Servers**
   Double-click the `START.bat` script, which will launch both the Node.js API and the Vite frontend.
   *(You must start the Python ML server separately if you wish to use the Disease Detection or RAG features).*

3. **Access the App**
   Open your browser and navigate to `http://localhost:3000`.

---

## 🚧 Known Limitations (Demo Context)
* **Disease Model Weights:** The file `crop_model.keras` is required for disease detection. If missing, it must be retrained using the provided `train_disease_model.py` script and Kaggle datasets.
* **AI Chat:** The AI Saathi (Chat) relies on an external Ollama or Langchain tunnel. If the RAG backend is offline, the chat widget will fall back to static responses.
* **Production Readiness:** This project is explicitly designed for a local academic demo and lacks production hardening (e.g., rate limiting, HTTPS, secure cookie transmission).
