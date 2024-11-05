from django.contrib.auth import get_user_model, authenticate
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import send_mail
from django.conf import settings
from .serializers import RegisterSerializer, LoginSerializer, PasswordResetSerializer, PasswordResetConfirmSerializer
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from rest_framework.decorators import action 

User = get_user_model()

# # Registration View
# class RegisterView(generics.CreateAPIView):
#     serializer_class = RegisterSerializer
#     permission_classes = [AllowAny]

#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.save()
#         uid = urlsafe_base64_encode(force_bytes(user.pk))
#         token = PasswordResetTokenGenerator().make_token(user)

#         # Send email verification link
#         verification_link = f"{settings.FRONTEND_URL}/verify-email/{uid}/{token}"
#         send_mail(
#             'Verify your email',
#             f'Click the following link to verify your email: {verification_link}',
#             settings.DEFAULT_FROM_EMAIL,
#             [user.email],
#             fail_silently=False,
#         )

#         return Response({"message": "User registered. Verify your email to activate your account."}, status=status.HTTP_201_CREATED)

# # Login View
# class LoginView(generics.GenericAPIView):
#     serializer_class = LoginSerializer
#     permission_classes = [AllowAny]

#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = authenticate(email=serializer.validated_data['email'], password=serializer.validated_data['password'])
#         if user and user.is_active:
#             refresh = RefreshToken.for_user(user)
#             return Response({
#                 'refresh': str(refresh),
#                 'access': str(refresh.access_token),
#             })
#         return Response({"error": "Invalid credentials or account not activated"}, status=status.HTTP_401_UNAUTHORIZED)

# # Logout View
# class LogoutView(generics.GenericAPIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         try:
#             refresh_token = request.data['refresh']
#             token = RefreshToken(refresh_token)
#             token.blacklist()
#             return Response({"message": "Successfully logged out"}, status=status.HTTP_205_RESET_CONTENT)
#         except Exception as e:
#             return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)

# # Password Reset Request View
# class PasswordResetRequestView(generics.GenericAPIView):
#     serializer_class = PasswordResetSerializer
#     permission_classes = [AllowAny]

#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         email = serializer.validated_data['email']
#         user = User.objects.filter(email=email).first()

#         if user:
#             uid = urlsafe_base64_encode(force_bytes(user.pk))
#             token = PasswordResetTokenGenerator().make_token(user)
#             reset_link = f"{settings.FRONTEND_URL}/reset-password/{uid}/{token}"
#             send_mail(
#                 'Password Reset Request',
#                 f'Click the following link to reset your password: {reset_link}',
#                 settings.DEFAULT_FROM_EMAIL,
#                 [user.email],
#                 fail_silently=False,
#             )
#         return Response({"message": "If the email exists, password reset link has been sent"}, status=status.HTTP_200_OK)

# # Password Reset Confirm View
# class PasswordResetConfirmView(generics.GenericAPIView):
#     serializer_class = PasswordResetConfirmSerializer
#     permission_classes = [AllowAny]

#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         try:
#             uid = force_str(urlsafe_base64_decode(serializer.validated_data['uidb64']))
#             user = User.objects.get(pk=uid)
#             if PasswordResetTokenGenerator().check_token(user, serializer.validated_data['token']):
#                 user.set_password(serializer.validated_data['new_password'])
#                 user.save()
#                 return Response({"message": "Password reset successful"}, status=status.HTTP_200_OK)
#             else:
#                 return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
#         except Exception:
#             return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.utils.http import urlsafe_base64_encode,  urlsafe_base64_decode
from django.utils.encoding import force_str
from django.core.mail import send_mail
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken
from .models import User  # Adjust the import based on your project structure
from .serializers import RegisterSerializer, LoginSerializer, PasswordResetSerializer, PasswordResetConfirmSerializer
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.conf import settings

class AuthViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    # Registration
    def create(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = PasswordResetTokenGenerator().make_token(user)

        # Send email verification link
        verification_link = f"{settings.FRONTEND_URL}/verify-email/{uid}/{token}"
        send_mail(
            'Verify your email',
            f'Click the following link to verify your email: {verification_link}',
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
            fail_silently=False,
        )

        return Response({"message": "User registered. Verify your email to activate your account."}, status=status.HTTP_201_CREATED)

    # Login
    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def login(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(email=serializer.validated_data['email'], password=serializer.validated_data['password'])
        if user and user.is_active:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response({"error": "Invalid credentials or account not activated"}, status=status.HTTP_401_UNAUTHORIZED)

    # Logout
    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def logout(self, request):
        try:
            refresh_token = request.data['refresh']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Successfully logged out"}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)

    # Password Reset Request
    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def password_reset_request(self, request):
        serializer = PasswordResetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        user = User.objects.filter(email=email).first()

        if user:
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = PasswordResetTokenGenerator().make_token(user)
            reset_link = f"{settings.FRONTEND_URL}/reset-password/{uid}/{token}"
            send_mail(
                'Password Reset Request',
                f'Click the following link to reset your password: {reset_link}',
                settings.DEFAULT_FROM_EMAIL,
                [user.email],
                fail_silently=False,
            )
        return Response({"message": "If the email exists, password reset link has been sent"}, status=status.HTTP_200_OK)

    # Password Reset Confirm
    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def password_reset_confirm(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            uid = force_str(urlsafe_base64_decode(serializer.validated_data['uidb64']))
            user = User.objects.get(pk=uid)
            if PasswordResetTokenGenerator().check_token(user, serializer.validated_data['token']):
                user.set_password(serializer.validated_data['new_password'])
                user.save()
                return Response({"message": "Password reset successful"}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)

