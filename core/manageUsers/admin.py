# accounts/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Usr

@admin.register(Usr)
class CustomUserAdmin(UserAdmin):
    # Customize fields displayed in the admin
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('is_email_verified',)}),
    )
