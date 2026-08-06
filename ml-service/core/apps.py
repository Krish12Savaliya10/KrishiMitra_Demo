from django.apps import AppConfig


class CoreConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "core"

    def ready(self):
        # Load all heavy ML artifacts once, when Django boots — equivalent to the
        # module-level loading that used to happen at the top of Flask's app.py.
        from . import ml_loader
        ml_loader.load_everything()
