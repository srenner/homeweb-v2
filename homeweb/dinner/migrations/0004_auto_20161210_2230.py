# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2016-12-11 04:30
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dinner', '0003_meal_last_ate'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='mealhistory',
            options={'verbose_name_plural': 'Meal history'},
        ),
        migrations.AlterField(
            model_name='meal',
            name='last_ate',
            field=models.DateField(blank=True, null=True),
        ),
    ]