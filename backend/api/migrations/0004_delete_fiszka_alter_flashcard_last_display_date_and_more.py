# Generated by Django 5.0.1 on 2024-03-02 12:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_rename_video_flashcard_video_id_and_more'),
    ]

    operations = [
        #migrations.DeleteModel(
         #   name='Fiszka',
        #),
        migrations.AlterField(
            model_name='flashcard',
            name='last_display_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='flashcard',
            name='next_display_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='flashcard',
            name='second_in_video',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
