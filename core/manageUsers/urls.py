from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AuthViewSet  # Adjust the import based on your project structure

router = DefaultRouter()
router.register(r'auth', AuthViewSet, basename='auth')

urlpatterns = [
    path('', include(router.urls)),
]