from django.urls import path
from . import views

urlpatterns = [
    path("retrieve", views.RetrieveView.as_view()),
    path("soil_recommend", views.SoilRecommendView.as_view()),
    path("crop_stage_tips", views.CropStageTipsView.as_view()),
    path("predict_disease", views.PredictDiseaseView.as_view()),
    path("health", views.HealthView.as_view()),
    path("weather", views.WeatherView.as_view()),
]
