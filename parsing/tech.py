import requests
import json
import re

response = requests.post(
  url="https://openrouter.ai/api/v1/chat/completions",
  headers={
    "Authorization": "Bearer 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",
    "Content-Type": "application/json",
  },
  data=json.dumps({
    "model": "meta-llama/llama-3.3-8b-instruct:free",
    "messages": [
      {
        "role": "user",
        "content": """
        Analyze the technology stack at meta and provide information in the following EXACT JSON structure:

{
  "frontend": {
    "title": "Frontend section title",
    "icon": "Icon name or emoji",
    "categories": [
      {
        "title": "Category title",
        "tags": ["List of technologies"],
        "description": "Category description",
        "badges": ["List of badges (if applicable)"]
      }
    ],
    "badges": ["List of badges (if applicable)"]
  },
  "backend": {
    "title": "Backend section title",
    "icon": "Icon name or emoji",
    "categories": [
      {
        "title": "Category title",
        "tags": ["List of technologies"],
        "description": "Category description",
        "badges": ["List of badges (if applicable)"]
      }
    ]
  },
  "cloud": {
    "title": "Cloud & DevOps section title",
    "icon": "Icon name or emoji",
    "categories": [
      {
        "title": "Category title",
        "tags": ["List of technologies"],
        "description": "Category description",
        "badges": ["List of badges (if applicable)"]
      }
    ]
  },
  "database": {
    "title": "Database section title",
    "icon": "Icon name or emoji",
    "categories": [
      {
        "title": "Category title",
        "tags": ["List of technologies"],
        "description": "Category description",
        "badges": ["List of badges (if applicable)"]
      }
    ]
  },
  "analytics": {
    "title": "Analytics section title",
    "icon": "Icon name or emoji",
    "categories": [
      {
        "title": "Category title",
        "tags": ["List of technologies"],
        "description": "Category description",
        "badges": ["List of badges (if applicable)"]
      }
    ],
    "badges": ["List of badges (if applicable)"]
  },
  "team": {
    "title": "Team tools section title",
    "icon": "Icon name or emoji",
    "categories": [
      {
        "title": "Category title",
        "tags": ["List of technologies"],
        "description": "Category description",
        "badges": ["List of badges (if applicable)"]
      }
    ]
  }
}

Ensure all information is specific to meta, accurate, and follows this exact structure. Use real examples and maintain consistent formatting.`;

"""
      }
    ],
    
  })
)
# Parse the response
response_json = response.json()
content = response_json["choices"][0]["message"]["content"]

# Extract JSON from between triple backticks
json_str = re.search(r'```(.*?)```', content, re.DOTALL).group(1)
meta_stack = json.loads(json_str)

# Print each section individually
print("\nFrontend Technologies:")
print(json.dumps(meta_stack["frontend"], indent=2))

print("\nBackend Technologies:")
print(json.dumps(meta_stack["backend"], indent=2))

print("\nCloud & DevOps:")
print(json.dumps(meta_stack["cloud"], indent=2))

print("\nDatabase Technologies:")
print(json.dumps(meta_stack["database"], indent=2))

print("\nAnalytics Tools:")
print(json.dumps(meta_stack["analytics"], indent=2))

print("\nTeam Tools:")
print(json.dumps(meta_stack["team"], indent=2))