import requests
import json

response = requests.get(
  url="https://openrouter.ai/api/v1/auth/key",
  headers={
    "Authorization": f"Bearer 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"
  }
)

print(json.dumps(response.json(), indent=2))
