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
    

def expect_params(*param_names):
    params = [request.args.get(param_name) for param_name in param_names]
    if not all(params):
        missing_params = [name for name, val in zip(param_names, params) if not val]
        return { 'err': 3, 'error': f'Missing params: {", ".join(missing_params)}' }, None
    else:
        return (None, *params,)
        

"""
App Routes
"""

@app.route("/")
def root():
  return "H0ney He1st API"


@app.route("/login")
def login():
  # Get params
  err, bear_name, gamecode = expect_params('bear_name', 'gamecode')
  if err:
      return err, 400

  # Get player
  player = get_player_in_game(bear_name, gamecode)

  # Check if player exists
  if not player:
    return jsonify({ 'err': 1, 'error': 'Our database is bare for bears that match that description' }), 404

  # Embelish with descriptions
  player = hydrate_player(player)
  
  return jsonify(player)


@app.route('/roles')
def roles():
  err, gamecode = expect_params('gamecode')
  if err:
      return err, 400

  # Get roles
  roles = get_game_traits(gamecode, 'role')

  return jsonify(roles)


@app.route('/players')
def players():
  err, gamecode = expect_params('gamecode')
  if err:
      return err, 400

  # Get roles
  players = [hydrate_player(p) for p in get_all_players_in_game(gamecode)]

  return jsonify(players)


@app.route("/signup")
def signup():
  err, bear_name, player_name, gamecode, role = expect_params('bear_name', 'player_name', 'gamecode', 'role')
  if err:
      return err, 400

  # Check if name is taken
  if get_player_in_game(bear_name, gamecode):
    return jsonify({ 'err': 2, 'error': 'Name is taken' }), 400
  
  # Get available traits
  available_descriptors = [t for t in get_game_traits(gamecode, 'descriptor') if t['available']]
  available_species = [t for t in get_game_traits(gamecode, 'species') if t['available']]

  # Choose random available traits
  descriptor, species = random.choice(available_descriptors)['name'], random.choice(available_species)['name']
  
  # Add player to database
  add_player(bear_name, player_name, gamecode, descriptor, species, role)

  # Get, hydrate and return player
  player = get_player_in_game(bear_name, gamecode)
  player = hydrate_player(player)
  return jsonify(player)


@app.route('/resetGame')
def reset_game():
  err, gamecode = expect_params('gamecode')
  if err:
      return err, 400

  # Delete players
  delete_all_players_in_game(gamecode)
