from flask import Flask, jsonify
from db_handler import *
from traits import traits
import random


app = Flask(__name__)


def get_game_traits(gamecode, trait_key):
  players = get_all_players_in_game(gamecode)
  player_traits = [p[trait_key] for p in players]
  all_traits = traits[trait_key].keys()
  return [ { 'name': trait, 'available': trait not in player_traits } for trait in all_traits ]


@app.route("/login")
def login(name, gamecode):
  # Get player from DB
  player = get_player_in_game(name, gamecode)

  # Embelish with descriptions
  player['ability'] = traits.species[player.species]
  player['role_advantage'] = traits.role[player.role]
  
  return player


@app.route("/signup")
def signup(name, gamecode, role):
  # Get available traits
  available_descriptors = [t for t in get_game_traits(gamecode, 'descriptor') if t['available']]
  available_species = [t for t in get_game_traits(gamecode, 'species') if t['available']]
  
  # Choose random available traits
  descriptor, species = random.choice(available_descriptors), random.choice(available_species)
  
  # Add player to database
  add_player(name, gamecode, descriptor, species, role)