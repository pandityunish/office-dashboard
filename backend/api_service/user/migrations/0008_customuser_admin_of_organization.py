# Generated by Django 4.2.4 on 2024-01-03 10:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0007_rename_approved_visitors_customuser_approve_visitors'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='admin_of_organization',
            field=models.BooleanField(default=False),
        ),
    ]
