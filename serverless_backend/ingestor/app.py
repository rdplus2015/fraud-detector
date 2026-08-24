import json
import uuid
from datetime import datetime, timezone

import boto3

# Connect to the table ONCE, reused across warm Lambda invocations
resource = boto3.resource('dynamodb')
table = resource.Table('FraudDetectionTable')


def build_response(status_code, data):
    """Format a valid API Gateway Lambda response (body must be a JSON string)."""
    return {
        "statusCode": status_code,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "GET,POST,OPTIONS"
        },
        "body": json.dumps(data)
    }


def lambda_handler(event, context):
    # Step 1: parse the HTTP request body (always a JSON string, needs parsing)
    body = json.loads(event["body"])

    amount = body.get("amount")
    merchant = body.get("merchant")
    user_id = body.get("user_id", "unknown")  # no auth yet (Sprint 1) — temporary

    # Step 2: validate required fields
    if amount is None or merchant is None:
        return build_response(400, {"error": "amount and merchant are required"})

    # Step 3: generate server-side values
    # transaction_id and timestamp must NEVER come from the client —
    # the server is the source of truth for identity and time.
    transaction_id = str(uuid.uuid4())
    timestamp = datetime.now(timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z")

    # PK groups all transactions of the SAME user together (one partition per user)
    # SK makes each transaction unique within that partition, sorted chronologically
    pk = f"USER#{user_id}"
    sk = f"TXN#{timestamp}#{transaction_id}"

    item = {
        "PK": pk,
        "SK": sk,
        "amount": amount,
        "merchant": merchant,
        "currency": "CAD",
        "status": "LEGIT",       # no scoring engine yet (Sprint 4)
        "created_at": timestamp,
        "entity_type": "TRANSACTION"
    }

    # Step 4: write the REAL item (built above) to DynamoDB
    table.put_item(Item=item)

    # Step 5: return the response
    return build_response(200, {"message": "Transaction recorded", "item": item})