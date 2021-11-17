from flask import Flask, jsonify, abort, request
from flask_cors import CORS
from db_handler import *
from traits import traits
import random


app = Flask(__name__)
CORS(app)

"""
Utils
"""


def get_game_traits(gamecode, trait_key):
  players = get_all_players_in_game(gamecode)
  player_traits = [p[trait_key] for p in players]
  all_traits = traits[trait_key].keys()
  return [ { 'name': trait, 'available': trait not in player_traits } for trait in all_traits ]


def hydrate_player(player):
  player['ability'] = traits['species'][player['species']]
  player['role_advantage'] = traits['role'][player['role']]
  return player

"""
App Routes
"""

@app.route("/")
def root():
  return "H0ney He1st API"

@app.route("/login")
def login():
  # Get player from DB
  name = request.args.get('name')
  gamecode = request.args.get('gamecode')
  player = get_player_in_game(name, gamecode)

  # Check if player exists
  if not player:
    return jsonify({ 'err': 1, 'error': 'Our database is bare for bears that match that description' }), 404

  # Embelish with descriptions
  player = hydrate_player(player)
  
  return jsonify(player)


@app.route('/roles')
def roles():
  gamecode = request.args.get('gamecode')
  roles = get_game_traits(gamecode, 'role')
  return jsonify(roles)


@app.route("/signup")
def signup():
  name = request.args.get('name')
  gamecode = request.args.get('gamecode')
  role = request.args.get('role')

  if get_player_in_game(name, gamecode):
    return jsonify({ 'err': 2, 'error': 'Name is taken' }), 400
  
  # Get available traits
  available_descriptors = [t for t in get_game_traits(gamecode, 'descriptor') if t['available']]
  available_species = [t for t in get_game_traits(gamecode, 'species') if t['available']]
  
  # Choose random available traits
  descriptor, species = random.choice(available_descriptors)['name'], random.choice(available_species)['name']
  
  # Add player to database
  add_player(name, gamecode, descriptor, species, role)

  player = get_player_in_game(name, gamecode)
  player = hydrate_player(player)
  return jsonify(player)


@app.route('/resetGame')
def reset_game(gamecode):
  delete_all_players_in_game(gamecode)