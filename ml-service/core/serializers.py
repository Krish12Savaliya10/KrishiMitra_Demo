from rest_framework import serializers


class RetrieveRequestSerializer(serializers.Serializer):
    query = serializers.CharField(allow_blank=False)
    n_results = serializers.IntegerField(required=False, default=3, min_value=1, max_value=20)


class SoilRecommendRequestSerializer(serializers.Serializer):
    ph = serializers.FloatField(default=7.0)
    nitrogen = serializers.FloatField(default=180)
    phosphorus = serializers.FloatField(default=20)
    potassium = serializers.FloatField(default=250)
    organicCarbon = serializers.FloatField(default=0.5)
    ec = serializers.FloatField(default=0.4)
    season = serializers.CharField(default="kharif")
    areaAcres = serializers.FloatField(default=1)
    waterAvailability = serializers.CharField(default="medium")
    temperature = serializers.FloatField(required=False, default=25.0)
    humidity = serializers.FloatField(required=False, default=60.0)
    rainfall = serializers.FloatField(required=False, default=100.0)
    state = serializers.CharField(required=False, default="Maharashtra")


class CropStageTipsRequestSerializer(serializers.Serializer):
    crop = serializers.CharField(allow_blank=False)
    stage = serializers.CharField(allow_blank=False)
