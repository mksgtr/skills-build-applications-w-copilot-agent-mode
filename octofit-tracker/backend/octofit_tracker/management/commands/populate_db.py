from django.core.management.base import BaseCommand
from django.db import connection
from djongo import models

# Sample superhero and team data
MARVEL_HEROES = [
    {'name': 'Iron Man', 'email': 'ironman@marvel.com'},
    {'name': 'Captain America', 'email': 'cap@marvel.com'},
    {'name': 'Black Widow', 'email': 'widow@marvel.com'},
]
DC_HEROES = [
    {'name': 'Batman', 'email': 'batman@dc.com'},
    {'name': 'Superman', 'email': 'superman@dc.com'},
    {'name': 'Wonder Woman', 'email': 'wonderwoman@dc.com'},
]

TEAMS = [
    {'name': 'Marvel', 'members': [h['email'] for h in MARVEL_HEROES]},
    {'name': 'DC', 'members': [h['email'] for h in DC_HEROES]},
]

ACTIVITIES = [
    {'user_email': 'ironman@marvel.com', 'activity': 'Running', 'duration': 30},
    {'user_email': 'batman@dc.com', 'activity': 'Cycling', 'duration': 45},
]

LEADERBOARD = [
    {'team': 'Marvel', 'points': 100},
    {'team': 'DC', 'points': 90},
]

WORKOUTS = [
    {'name': 'Pushups', 'suggestion': 'Do 3 sets of 15 reps'},
    {'name': 'Squats', 'suggestion': 'Do 3 sets of 20 reps'},
]

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        db = connection.cursor().db_conn.client['octofit_db']
        # Drop collections if they exist
        for col in ['users', 'teams', 'activities', 'leaderboard', 'workouts']:
            db.drop_collection(col)
        # Insert users
        db.users.insert_many(MARVEL_HEROES + DC_HEROES)
        # Create unique index on email
        db.users.create_index([('email', 1)], unique=True)
        # Insert teams
        db.teams.insert_many(TEAMS)
        # Insert activities
        db.activities.insert_many(ACTIVITIES)
        # Insert leaderboard
        db.leaderboard.insert_many(LEADERBOARD)
        # Insert workouts
        db.workouts.insert_many(WORKOUTS)
        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data'))
