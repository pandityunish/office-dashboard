# Generated by Django 4.2.4 on 2024-02-22 02:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0021_subscription_lock_org'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='is_manual_user',
            field=models.BooleanField(default=False),
        ),
    ]
