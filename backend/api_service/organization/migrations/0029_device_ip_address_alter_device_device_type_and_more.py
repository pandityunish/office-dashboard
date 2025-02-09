# Generated by Django 4.2.4 on 2024-01-19 16:01

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('organization', '0028_device'),
    ]

    operations = [
        migrations.AddField(
            model_name='device',
            name='ip_address',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='device',
            name='device_type',
            field=models.CharField(blank=True, choices=[('android', 'Android'), ('computer', 'Computer'), ('other', 'Other')], default='other', max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='device',
            name='name_of_device',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='device',
            name='organization',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='device_org', to=settings.AUTH_USER_MODEL),
        ),
    ]
