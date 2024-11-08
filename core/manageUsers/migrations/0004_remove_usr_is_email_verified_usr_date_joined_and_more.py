# Generated by Django 5.1.2 on 2024-11-05 23:40

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('manageUsers', '0003_usr_username'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usr',
            name='is_email_verified',
        ),
        migrations.AddField(
            model_name='usr',
            name='date_joined',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AddField(
            model_name='usr',
            name='image',
            field=models.ImageField(default='images/default.png', upload_to='images'),
        ),
        migrations.AddField(
            model_name='usr',
            name='points',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profile', to='manageUsers.usr'),
        ),
        migrations.AlterField(
            model_name='usr',
            name='first_name',
            field=models.CharField(blank=True, max_length=30),
        ),
        migrations.AlterField(
            model_name='usr',
            name='groups',
            field=models.ManyToManyField(blank=True, related_name='custom_user_set', to='auth.group'),
        ),
        migrations.AlterField(
            model_name='usr',
            name='is_superuser',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='usr',
            name='last_name',
            field=models.CharField(blank=True, max_length=30),
        ),
        migrations.AlterField(
            model_name='usr',
            name='status',
            field=models.CharField(choices=[('O', 'ONLINE'), ('F', 'OFFLINE')], default='F', max_length=1),
        ),
        migrations.AlterField(
            model_name='usr',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, related_name='custom_user_permissions_set', to='auth.permission'),
        ),
    ]
