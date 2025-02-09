# Generated by Django 4.2.4 on 2024-01-14 15:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0011_alter_customuser_address'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='id_number',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='customuser',
            name='type_of_id',
            field=models.CharField(blank=True, choices=[('License', 'License'), ('Passport', 'Passport'), ('Citizenship', 'Citizenship')], max_length=20, null=True),
        ),
    ]
