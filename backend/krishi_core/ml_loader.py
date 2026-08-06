"""
Loads all ML artifacts (ChromaDB collections, Keras disease model, RF crop model,
YOLO leaf detector, class names) exactly once when Django starts.

This is a straight port of the top-level loading code that used to sit at
module scope in the old Flask app.py — moved into AppConfig.ready() so it
runs once per process, the Django-idiomatic equivalent.
"""
import os
import sys
import json
import subprocess
import logging

from django.conf import settings

logger = logging.getLogger("core.ml_loader")

# Populated by load_everything(); imported by views.py
state = {
    "chroma_client": None,
    "collection": None,
    "disease_collection": None,
    "tf": None,
    "disease_model": None,
    "crop_rf_model": None,
    "yolo_model": None,
    "class_names": [],
}


def _probe_tensorflow():
    """Probe TensorFlow in a child process so a broken runtime can't crash startup."""
    if settings.DISABLE_TENSORFLOW_IMPORT:
        return None
    try:
        result = subprocess.run(
            [sys.executable, "-c", "import tensorflow as tf; print(tf.__version__)"],
            capture_output=True, text=True, timeout=20,
            env={**os.environ, "CUDA_VISIBLE_DEVICES": "-1"},
        )
        if result.returncode == 0:
            import importlib
            return importlib.import_module("tensorflow")
    except Exception as exc:
        logger.warning("TensorFlow probe failed: %s", exc)
    return None


def load_everything():
    os.environ["CUDA_VISIBLE_DEVICES"] = "-1"
    base_dir = settings.BASE_DIR.parent  # ml-service/ equivalent (project root's sibling)

    # ── TensorFlow ────────────────────────────────────────────────
    tf = _probe_tensorflow()
    state["tf"] = tf
    if tf is not None:
        logger.info("TensorFlow available: %s", getattr(tf, "__version__", "unknown"))
    else:
        logger.warning("TensorFlow unavailable; disease inference will use fallback responses.")

    # ── ChromaDB (RAG knowledge base) ────────────────────────────
    try:
        import chromadb
        from chromadb.utils import embedding_functions
        ef = embedding_functions.SentenceTransformerEmbeddingFunction(model_name="all-MiniLM-L6-v2")
        
        chroma_client = chromadb.PersistentClient(path=settings.CHROMA_DB_PATH)
        state["chroma_client"] = chroma_client
        collections = chroma_client.list_collections()
        if collections:
            name = collections[0].name
            state["collection"] = chroma_client.get_collection(name, embedding_function=ef)
            logger.info("Connected to ChromaDB collection '%s' (%s items)", name, state["collection"].count())
        else:
            logger.warning("No ChromaDB collections found.")

        try:
            state["disease_collection"] = chroma_client.get_collection("disease_treatments_kb", embedding_function=ef)
            logger.info("Loaded disease_collection (%s items)", state["disease_collection"].count())
        except Exception as e:
            logger.warning("Failed to load disease_collection: %s", e)
    except Exception as e:
        logger.error("Failed to load ChromaDB: %s", e)

    # ── Keras disease classification model ───────────────────────
    # Removed - now using Gemini API in the Node Backend

    # ── RandomForest crop recommendation model ───────────────────
    # Removed - now using Gemini API in SoilRecommendView

    # ── Disease class names ───────────────────────────────────────
    try:
        with open(os.path.join(base_dir, "knowledge-base", "data", "class_names.json"), "r") as f:
            state["class_names"] = json.load(f)
        logger.info("Loaded %s disease classes", len(state["class_names"]))
    except Exception as e:
        logger.error("Failed to load class names: %s", e)

    # ── YOLO leaf detector ─────────────────────────────────────────
    try:
        from ultralytics import YOLO
        state["yolo_model"] = YOLO("yolov8n.pt")
        logger.info("Loaded YOLO leaf-detection model")
    except Exception as e:
        logger.warning("Skipping YOLO model load: %s", e)
