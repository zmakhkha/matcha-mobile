import os
import django
import random
from django.contrib.auth import get_user_model
from django.db import transaction

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'your_project_name.settings')
django.setup()

# Import models
from your_app_name.models import UserProfile, InterestTag, ProfileInterest, SocialAccount

# Define the User model
User = get_user_model()

# Predefined data
genders = ['male', 'female', 'other']
preferences = ['heterosexual', 'bisexual', 'homosexual']
locations = ["New York", "San Francisco", "Los Angeles", "Chicago", "Houston"]
social_platforms = ["Instagram", "Twitter", "LinkedIn", "Facebook"]
interest_tags = ["Music", "Sports", "Travel", "Reading", "Cooking"]

# Function to create interest tags
def create_interest_tags():
    for tag in interest_tags:
        InterestTag.objects.get_or_create(name=tag)
    print("Interest tags created.")

# Function to create a default profile for a user
def create_profile_for_user(user):
    # Create UserProfile
    profile = UserProfile.objects.create(
        user=user,
        gender=random.choice(genders),
        sexual_preference=random.choice(preferences),
        biography="This is a sample biography.",
        location=random.choice(locations),
        profile_picture=None,  # Assuming no profile picture by default
        fame_rating=random.randint(0, 100),
        points=random.randint(0, 500),
        gps_position="40.7128 N, 74.0060 W"  # Default GPS coordinate
    )
    
    # Add interests to UserProfile
    tags = InterestTag.objects.all()
    chosen_tags = random.sample(list(tags), k=2)  # Each user gets 2 random interests
    for tag in chosen_tags:
        ProfileInterest.objects.create(user_profile=profile, tag=tag)

    # Add social accounts
    for platform in social_platforms:
        SocialAccount.objects.create(
            user_profile=profile,
            platform=platform,
            username=f"{user.username}_{platform.lower()}"
        )

    print(f"Profile, interests, and social accounts created for user: {user.username}")

# Function to create default users and associated data
@transaction.atomic
def create_default_users():
    usernames = [f"user{i}" for i in range(1, 11)]
    password = "defaultpassword123"
    
    create_interest_tags()  # Ensure interest tags exist

    for username in usernames:
        email = f"{username}@example.com"
        
        # Check if user already exists
        if not User.objects.filter(username=username).exists():
            user = User.objects.create_user(username=username, email=email, password=password)
            create_profile_for_user(user)
            print(f"Created user with profile: {username}")
        else:
            print(f"User {username} already exists")

# Run the function
if __name__ == "__main__":
    create_default_users()
