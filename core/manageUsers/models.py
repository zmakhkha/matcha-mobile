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



class Usr(AbstractBaseUser):
    
    status = models.CharField(
        max_length=1, choices=[('online', 'Online'), ('offline', 'Offline')])
    points = models.IntegerField(default=0)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=30, unique=True, blank=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    image_1 = models.ImageField(upload_to='images', default='images/default.png')
    image_2 = models.ImageField(upload_to='images', default='images/default.png')
    image_3 = models.ImageField(upload_to='images', default='images/default.png')

    gender = models.CharField(max_length=10, choices=[('male', 'Male'), ('female', 'Female'), ('other', 'Other')])
    sexual_preference = models.CharField(max_length=15, choices=[('heterosexual', 'Heterosexual'), ('bisexual', 'Bisexual'), ('homosexual', 'Homosexual')], null=True)
    biography = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=255, null=True, blank=True)
    gps_position = models.CharField(max_length=255, blank=True, null=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    objects = UsrManager()
    
    def __str__(self):
        return self.username

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"

    def get_short_name(self):
        return self.first_name

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser
    


class InterestTag(models.Model):
    name = models.CharField(max_length=50, unique=True)

class ProfileInterest(models.Model):
    user_profile = models.ForeignKey(Usr, on_delete=models.CASCADE, related_name="interests")
    tag = models.ForeignKey(InterestTag, on_delete=models.CASCADE)

class SocialAccount(models.Model):
    user_profile = models.ForeignKey(Usr, on_delete=models.CASCADE, related_name="social_accounts")
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

    user_profile = models.ForeignKey(Usr, on_delete=models.CASCADE, related_name="notifications")
    notification_type = models.CharField(max_length=10, choices=NOTIFICATION_TYPES)
    sender = models.ForeignKey(Usr, on_delete=models.CASCADE, related_name="sent_notifications")
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

class Report(models.Model):
    reported_user = models.ForeignKey(Usr, on_delete=models.CASCADE, related_name="reports")
    reporter = models.ForeignKey(Usr, on_delete=models.CASCADE, related_name="reported_by")
    reason = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

class BlockedUser(models.Model):
    blocker = models.ForeignKey(Usr, on_delete=models.CASCADE, related_name="blocked_users")
    blocked = models.ForeignKey(Usr, on_delete=models.CASCADE, related_name="blocked_by")
    timestamp = models.DateTimeField(auto_now_add=True)

class ChatRoom(models.Model):
    participants = models.ManyToManyField(Usr, related_name="chat_rooms")
    is_active = models.BooleanField(default=True)

class Message(models.Model):
    chat_room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, related_name="messages")
    sender = models.ForeignKey(Usr, on_delete=models.CASCADE)
    text = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

class FameRating(models.Model):
    user_profile = models.OneToOneField(
        Usr,
        on_delete=models.CASCADE,
        related_name="fame_rating_instance"
    )
    score = models.IntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

class VideoCall(models.Model):
    caller = models.ForeignKey(Usr, on_delete=models.CASCADE, related_name="outgoing_calls")
    receiver = models.ForeignKey(Usr, on_delete=models.CASCADE, related_name="incoming_calls")
    started_at = models.DateTimeField(auto_now_add=True)
    ended_at = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=10, choices=[('ongoing', 'Ongoing'), ('ended', 'Ended')])
