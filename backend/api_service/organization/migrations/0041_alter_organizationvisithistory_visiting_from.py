# Generated by Django 4.2.4 on 2024-02-04 10:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('organization', '0040_remove_adsbanner_image_url_adsbanner_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='organizationvisithistory',
            name='visiting_from',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]
