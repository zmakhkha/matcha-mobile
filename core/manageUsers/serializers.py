from django.contrib.auth import get_user_model
from rest_framework import serializers
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

# User Registration Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        user.is_active = False  # User needs to verify email to activate
        user.save()
        # Send verification email here if necessary
        return user

# Login Serializer
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=False, allow_blank=True)
    username = serializers.CharField(required=False, allow_blank=True)
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        username = data.get('username')
        password = data.get('password')

        if not email and not username:
            raise serializers.ValidationError("Either 'email' or 'username' must be provided.")
        if not password:
            raise serializers.ValidationError("Password is required.")

        return data


# Password Reset Serializer
class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()

# Password Reset Confirm Serializer
class PasswordResetConfirmSerializer(serializers.Serializer):
    uidb64 = serializers.CharField()
    token = serializers.CharField()
    new_password = serializers.CharField(write_only=True)
