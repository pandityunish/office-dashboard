# Generated by Django 4.2.4 on 2024-01-02 06:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('organization', '0016_organizationvisithistorywithcreatedat_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='organizationbranch',
            name='lock_branch',
            field=models.CharField(choices=[('Active', 'Active'), ('Inactive', 'Inactive')], default='Active', max_length=10),
        ),
    ]
