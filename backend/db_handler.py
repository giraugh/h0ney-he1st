import boto3
import random
from boto3.dynamodb.conditions import Key
from decouple import config

AWS_ACCESS_KEY_ID     = config("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = config("AWS_SECRET_ACCESS_KEY")
REGION_NAME           = config("REGION_NAME")

client = boto3.client(
  'dynamodb',
  aws_access_key_id     = AWS_ACCESS_KEY_ID,
  aws_secret_access_key = AWS_SECRET_ACCESS_KEY,
  region_name           = REGION_NAME,
)

resource = boto3.resource(
  'dynamodb',
  aws_access_key_id     = AWS_ACCESS_KEY_ID,
  aws_secret_access_key = AWS_SECRET_ACCESS_KEY,
  region_name           = REGION_NAME,
)

"""
  A bear can be
  - name
  - role
  - descriptor
  - species
"""

def create_player_table():
  client.create_table(
      TableName = 'Player',
      KeySchema = [
        {
          'AttributeName': 'name',
          'KeyType': 'S' 
        },
        {
          'AttributeName': 'gamecode',
          'KeyType': 'S' 
        }
      ],
      AttributeDefinitions = [
        {
          'AttributeName': 'name',
          'AttributeType': 'S' 
        },
        {
          'AttributeName': 'gamecode',
          'KeyType': 'S' 
        },
        {
          'AttributeName': 'descriptor',
          'AttributeType': 'S' 
        },
        {
          'AttributeName': 'species',
          'AttributeType': 'S' 
        },
        {
          'AttributeName': 'role',
          'AttributeType': 'S' 
        }
      ],
      BillingMode = 'PAY_PER_REQUEST',
)

def add_player(name, gamecode, descriptor, species, role):
  table = dynamodb.Table('Player')
  response = table.put_item(
    Item={
      'name': name,
      'gamecode': gamecode
      'descriptor': descriptor,
      'species': species,
      'role': role
    }
  )
  return response

def get_player_in_game(name, gamecode):
  table = dynamodb.Table('Player')
  players = table.query(
    KeyConditionExpression=Key('name').eq(name)
  )
  return response['Items']

def get_all_players_in_game(gamecode):
  table = dynamodb.Table('Player')
  players = table.query(
    KeyConditionExpression=Key('gamecode').eq(gamecode)
  )
  return response['Items']

def delete_all_players_in_game(gamecode):
  table = dynamodb.Table('Player')
  players = table.delete_item(
    KeyConditionExpression=Key('gamecode').eq(gamecode)
  )
  return response['Items']