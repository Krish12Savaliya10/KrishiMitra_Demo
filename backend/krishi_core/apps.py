from django.apps import AppConfig


class KrishiCoreConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'krishi_core'

    def ready(self):
        import os
        # Only run jobs if it's the main server process, avoid running in manage.py commands
        if os.environ.get('RUN_MAIN', None) != 'true':
            return
        from .jobs import start_jobs
        start_jobs()
