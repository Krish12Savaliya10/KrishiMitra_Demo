"""
Django settings for the KrishiMitra ML service.
This replaces the old Flask app.py — same endpoints, same behavior,
now organized as a proper Django project per the FCSP-2 syllabus
(Django Framework, Django REST Framework units 8-10).
"""
import os
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent

# Load the new .env located at ml-service/.env
load_dotenv(BASE_DIR / ".env")

SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", "dev-only-insecure-key-change-me")
DEBUG = os.getenv("DJANGO_DEBUG", "1") == "1"
ALLOWED_HOSTS = ["*"]  # internal ML microservice, called only by the Node backend

INSTALLED_APPS = [
    "django.contrib.contenttypes",
    "django.contrib.auth",
    "django.contrib.staticfiles",
    "rest_framework",
    "rest_framework_simplejwt",
    "corsheaders",
    "django_apscheduler",
    "krishi_core",
]

AUTH_USER_MODEL = "krishi_core.User"

STATIC_URL = "static/"

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
]

CORS_ALLOW_ALL_ORIGINS = True  # matches old flask_cors CORS(app) behavior

ROOT_URLCONF = "krishimitra_ml.urls"
WSGI_APPLICATION = "krishimitra_ml.wsgi.application"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {"context_processors": []},
    },
]

# This service has no DB of its own (Mongo lives in the Node backend); sqlite is just
# for Django's internal bookkeeping (migrations table etc.) so `manage.py` works cleanly.
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_RENDERER_CLASSES": ["rest_framework.renderers.JSONRenderer"],
    "DEFAULT_PARSER_CLASSES": [
        "rest_framework.parsers.JSONParser",
        "rest_framework.parsers.MultiPartParser",
        "rest_framework.parsers.FormParser",
    ],
}

from datetime import timedelta
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=7),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=30),
    "AUTH_HEADER_TYPES": ("Bearer",),
}

USE_TZ = True

# ── ML / RAG config (env-driven, same as Flask version) ──────────────────
OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://127.0.0.1:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3.2:1b")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
CHROMA_DB_PATH = os.getenv("CHROMA_DB_PATH", str(BASE_DIR.parent / "knowledge-base" / "chroma_db"))
DISABLE_TENSORFLOW_IMPORT = os.getenv("DISABLE_TENSORFLOW_IMPORT", "0") == "1"
