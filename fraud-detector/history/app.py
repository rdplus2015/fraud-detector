
import json
from decimal import Decimal

import boto3
from boto3.dynamodb.conditions import Key

resource = boto3.resource('dynamodb')
table = resource.Table('FraudDetectionTable')


def decimal_default(obj):
    """Convert DynamoDB's Decimal type into a JSON-serializable int or float."""
    if isinstance(obj, Decimal):
        return int(obj) if obj % 1 == 0 else float(obj)
    raise TypeError(f"Object of type {type(obj)} is not JSON serializable")


def build_response(status_code, data):
    return {
        "statusCode": status_code,
        "body": json.dumps(data, default=decimal_default)
    }


def lambda_handler(event, context):
    # Step 1: extract user_id from the URL path (not from a body — GET has none)
    user_id = event["pathParameters"]["user_id"]

    # Step 2: query DynamoDB for everything under this user's partition
    response = table.query(
        KeyConditionExpression=Key('PK').eq(f'USER#{user_id}')
    )

    items = response['Items']  # a LIST of dictionaries, not a single item

    # Step 3: return the list of items
    return build_response(200, items)