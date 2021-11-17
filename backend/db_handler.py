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

def add_player(name, gamecode, descriptor, species, role):
  table = dynamodb.Table('Player')
  print(name, gamecode, descriptor, species, role)
  response = table.put_item(
    Item={
      'name': name,
      'gamecode': gamecode,
      'descriptor': descriptor,
      'species': species,
      'role': role
    }
  )
  return response

def get_player_in_game(name, gamecode):
  table = dynamodb.Table('Player')
  response = table.query(
    KeyConditionExpression=Key('name').eq(name)
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

if __name__ == '__main__':
    table = create_player_table()
    print("Table status:", table.table_status)