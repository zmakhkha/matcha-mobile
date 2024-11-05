from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models


class User(AbstractUser):
    email = models.EmailField(unique=True)
    is_email_verified = models.BooleanField(default=False)
    
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


#UserProfile
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    gender = models.CharField(max_length=10, choices=[('male', 'Male'), ('female', 'Female'), ('other', 'Other')])
    sexual_preference = models.CharField(max_length=15, choices=[('heterosexual', 'Heterosexual'), ('bisexual', 'Bisexual'), ('homosexual', 'Homosexual')], null=True)
    biography = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=255, null=True, blank=True)  # neighborhood info, based on GPS
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    fame_rating = models.IntegerField(default=0)
    points = models.IntegerField(default=0)
    gps_position = models.CharField(max_length=255, blank=True, null=True)

#InterestTag
class InterestTag(models.Model):
    name = models.CharField(max_length=50, unique=True)

class ProfileInterest(models.Model):
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="interests")
    tag = models.ForeignKey(InterestTag, on_delete=models.CASCADE)

#SocialAccount
class SocialAccount(models.Model):
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="social_accounts")
    platform = models.CharField(max_length=50)  # e.g., Instagram, Twitter
    username = models.CharField(max_length=50)

#Notification
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

#Report
class Report(models.Model):
    reported_user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="reports")
    reporter = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="reported_by")
    reason = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

#BlockedUser
class BlockedUser(models.Model):
    blocker = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="blocked_users")
    blocked = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="blocked_by")
    timestamp = models.DateTimeField(auto_now_add=True)

#ChatRoom and Message
class ChatRoom(models.Model):
    participants = models.ManyToManyField(UserProfile, related_name="chat_rooms")
    is_active = models.BooleanField(default=True)

class Message(models.Model):
    chat_room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, related_name="messages")
    sender = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    text = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

#FameRating
class FameRating(models.Model):
    user_profile = models.OneToOneField(
        UserProfile,
        on_delete=models.CASCADE,
        related_name="fame_rating_instance"  # Avoid conflict with UserProfile.fame_rating
    )
    score = models.IntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)


#VideoCall
class VideoCall(models.Model):
    caller = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="outgoing_calls")
    receiver = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="incoming_calls")
    started_at = models.DateTimeField(auto_now_add=True)
    ended_at = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=10, choices=[('ongoing', 'Ongoing'), ('ended', 'Ended')])
