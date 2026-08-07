# KrishiMitra - AI Smart Farming Platform

**KrishiMitra** is a comprehensive, full-stack digital agriculture platform designed to empower Indian farmers with data-driven insights. It provides localized market price trends, weather monitoring, AI-driven crop recommendations, and a built-in computer vision module for early crop disease detection. By combining a modern React (Vite) frontend with a robust Python Django backend (SQLite), KrishiMitra delivers a complete, end-to-end agritech solution.

---

## 🏗️ Architecture Overview

The system features a **Stateful & Adaptive Crop Planning Architecture**:

```text
    [ Frontend UI (React) ]
           │
           ▼
  [ Rule Engine (Django) ] ──────┐
   (Weather Rules, Overdue)      │ 
           │                     │ 
           ▼                     ▼
  [ State Store (SQLite) ] [ RAG Explainer ]
 (Tracks Shift/Drift)     (ChromaDB + LLM)
```

### Adaptive Rule Engine
The daily task generator dynamically modifies crop schedules based on real-world constraints:
1. **Weather Interruptions:** If a task is `Irrigation` and forecast rain > 15mm, the task is marked as `Skipped`.
2. **Day-Offset Drift:** If an `Irrigation` or `Fertilizer` task is completed late, or left pending > 3 days, all downstream tasks are automatically shifted by the overdue gap, tracked globally via `driftDays`.
3. **Pest Escalations:** If the crop is in the `Flowering/Reproductive` stage and humidity is > 80% with rain, `Pest Scouting` tasks are automatically escalated to `Critical` priority.

Whenever a rule adjusts a task, the **RAG Layer** generates a natural-language, farmer-friendly explanation which is cached on the task record.

---

## 🚀 Setup & Run Instructions

**Prerequisites:** Ensure you have Node.js (18+) and Python 3.10+ installed.

1. **Install Dependencies & Start (Mac/Linux)**
   You can easily start the entire stack using the provided script:
   ```bash
   chmod +x start-mac.sh
   ./start-mac.sh
   ```
   This will automatically set up the Python virtual environment, install dependencies, apply Django migrations, run the Django backend on port `5001`, and start the Vite frontend on port `3000`.

2. **Access the App**
   Open your browser and navigate to `http://localhost:3000`.

---

## 📁 Folder Structure

* **`frontend/`**: The React (Vite) single-page application.
* **`backend/`**: The Python Django API and ML microservices.
  * **`krishi_core/`**: Main Django app containing models, API views, and business logic.
  * **`krishi_core/ml_models/`**: Serialized machine learning models (Pickle files).
  * **`krishi_core/services/`**: Integration services (Weather, Market Sync, AI, Rules).
  * **`knowledge-base/`**: ChromaDB vector store and knowledge ingestion scripts.

---

## 🚧 Known Limitations (Demo Context)
* **AI Chat:** The AI Saathi (Chat) relies on an external Ollama or Langchain tunnel. If the RAG backend is offline, the chat widget will fall back to static responses.
* **Production Readiness:** This project is explicitly designed for a local academic demo and lacks production hardening (e.g., rate limiting, HTTPS).
