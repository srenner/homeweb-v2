# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2016-12-10 21:16
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dinner', '0002_auto_20161210_2026'),
    ]

    operations = [
        migrations.AddField(
            model_name='meal',
            name='last_ate',
            field=models.DateField(null=True),
        ),
    ]
