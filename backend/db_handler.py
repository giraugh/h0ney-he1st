import boto3
import random
from boto3.dynamodb.conditions import Key, Attr
from decouple import config

AWS_ACCESS_KEY_ID     = config("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = config("AWS_SECRET_ACCESS_KEY")
REGION_NAME           = config("REGION_NAME")

dynamodb = boto3.resource(
  'dynamodb',
  aws_access_key_id     = AWS_ACCESS_KEY_ID,
  aws_secret_access_key = AWS_SECRET_ACCESS_KEY,
  region_name           = REGION_NAME,
)

def add_player(bear_name, player_name, gamecode, descriptor, species, role):
  table = dynamodb.Table('Player')
  response = table.put_item(
    Item={
      'bear_name': bear_name,
      'player_name': player_name,
      'gamecode': gamecode,
      'descriptor': descriptor,
      'species': species,
      'role': role
    }
  )
  return response

def get_player_in_game(bear_name, gamecode):
  table = dynamodb.Table('Player')
  response = table.query(
    KeyConditionExpression=Key('bear_name').eq(bear_name)
  )
  return next((r for r in response['Items'] if r['gamecode'] == gamecode), None)

def get_all_players_in_game(gamecode):
  table = dynamodb.Table('Player')
  response = table.scan(FilterExpression=Attr('gamecode').eq(gamecode))
  return response['Items']

def delete_all_players_in_game(gamecode):
  table = dynamodb.Table('Player')
  response = table.delete_item(
    KeyConditionExpression=Key('gamecode').eq(gamecode)
  )
  return response['Items']
