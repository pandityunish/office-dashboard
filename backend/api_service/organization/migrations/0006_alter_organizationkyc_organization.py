# Generated by Django 4.2.4 on 2023-10-13 09:43

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('organization', '0005_alter_organizationkyc_pan_number_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='organizationkyc',
            name='organization',
            field=models.OneToOneField(on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL),
        ),
    ]
