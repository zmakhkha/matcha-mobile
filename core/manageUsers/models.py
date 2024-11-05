# accounts/models.py
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

class UsrManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        player = self.model(email=email, **extra_fields)
        player.set_password(password)
        player.save(using=self._db)
        return player

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)


class Usr(AbstractBaseUser, PermissionsMixin):

    STATUS_ONLINE = 'O'
    STATUS_OFFLINE = 'F'

    USER_NORMAL = 'N'
    USER_DISCORD = 'D'

    STATUS_CHOICES = [
        (STATUS_ONLINE, 'ONLINE'),
        (STATUS_OFFLINE, 'OFFLINE'),
    ]
    USER_CHOICES = [
        (USER_NORMAL, 'NORMAL'),
        (USER_DISCORD, 'DISCORD'),
    ]
    coins = models.IntegerField(default=0)
    status = models.CharField(
        max_length=1, choices=STATUS_CHOICES, default=STATUS_OFFLINE)
    points = models.IntegerField(default=0)
    # friends = models.ManyToManyField('self', through='Friendship', symmetrical=False)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=30, unique=True, blank=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True, null=True)
    image = models.ImageField(
        upload_to='images', 
        # validators=[max_size_validator], 
        default='images/default.png'
    )

    
    USERNAME_FIELD = 'username'
    # REQUIRED_FIELDS = ['email']
    groups = models.ManyToManyField(
        Group,
        related_name="custom_user_set",  # Avoid conflict with `auth.User.groups`
        blank=True,
    )
    
    user_permissions = models.ManyToManyField(
        Permission,
        related_name="custom_user_permissions_set",  # Avoid conflict with `auth.User.user_permissions`
        blank=True,
    )

    objects = UsrManager()
    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"

# Define UserProfile and other related models here
class UserProfile(models.Model):
    user = models.OneToOneField(Usr, on_delete=models.CASCADE, related_name="profile")
    gender = models.CharField(max_length=10, choices=[('male', 'Male'), ('female', 'Female'), ('other', 'Other')])
    sexual_preference = models.CharField(max_length=15, choices=[('heterosexual', 'Heterosexual'), ('bisexual', 'Bisexual'), ('homosexual', 'Homosexual')], null=True)
    biography = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=255, null=True, blank=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    fame_rating = models.IntegerField(default=0)
    points = models.IntegerField(default=0)
    gps_position = models.CharField(max_length=255, blank=True, null=True)

class InterestTag(models.Model):
    name = models.CharField(max_length=50, unique=True)

class ProfileInterest(models.Model):
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="interests")
    tag = models.ForeignKey(InterestTag, on_delete=models.CASCADE)

class SocialAccount(models.Model):
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="social_accounts")
    platform = models.CharField(max_length=50)
    username = models.CharField(max_length=50)

class Notification(models.Model):
    NOTIFICATION_TYPES = [
        ('like', 'Like'),
        ('view', 'Profile View'),
        ('message', 'Message'),
        ('match', 'Match'),
        ('unlike', 'Unlike'),
    ]

    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="notifications")
    notification_type = models.CharField(max_length=10, choices=NOTIFICATION_TYPES)
    sender = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="sent_notifications")
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

class Report(models.Model):
    reported_user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="reports")
    reporter = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="reported_by")
    reason = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

class BlockedUser(models.Model):
    blocker = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="blocked_users")
    blocked = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="blocked_by")
    timestamp = models.DateTimeField(auto_now_add=True)

class ChatRoom(models.Model):
    participants = models.ManyToManyField(UserProfile, related_name="chat_rooms")
    is_active = models.BooleanField(default=True)

class Message(models.Model):
    chat_room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, related_name="messages")
    sender = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    text = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

class FameRating(models.Model):
    user_profile = models.OneToOneField(
        UserProfile,
        on_delete=models.CASCADE,
        related_name="fame_rating_instance"
    )
    score = models.IntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

class VideoCall(models.Model):
    caller = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="outgoing_calls")
    receiver = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="incoming_calls")
    started_at = models.DateTimeField(auto_now_add=True)
    ended_at = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=10, choices=[('ongoing', 'Ongoing'), ('ended', 'Ended')])
