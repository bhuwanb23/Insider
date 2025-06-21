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
Analyze the work culture at meta and provide information in the following EXACT JSON structure:

{
  "cultureOverview": {
    "coreValues": [
      { "value": "Core value name", "icon": "Emoji", "description": "Description of the value" }
    ],
    "culturalVibe": {
      "type": "Type of culture (e.g., Flexible & Collaborative)",
      "icon": "Emoji",
      "attributes": ["List of attributes (e.g., Fast-paced, Modern)"],
      "description": "Brief description of the cultural vibe"
    },
    "employeeEmpowerment": {
      "rating": "Score out of 5",
      "initiatives": ["List of empowerment initiatives"]
    },
    "leadershipStyle": {
      "type": "Type of leadership hierarchy",
      "icon": "Emoji",
      "features": ["List of leadership features"]
    }
  },
  "workLifeBalance": {
    "rating": "Score out of 5",
    "totalReviews": "Number of reviews",
    "positivePercentage": "Percentage of positive reviews",
    "workHours": {
      "type": "Type of work hours (e.g., Flexible)",
      "standard": "Standard work hours",
      "flexibility": "Level of flexibility",
      "timeZones": "Time zone coverage"
    },
    "metrics": [
      { "category": "Metric name", "score": "Score out of 5", "status": "Status (e.g., great, good)" }
    ]
  },
  "remoteWork": {
    "policy": "Remote work policy",
    "details": {
      "remoteAllowed": "true/false",
      "hybridStructure": "Description of hybrid structure",
      "globalPolicy": "Global remote policy",
      "equipmentProvided": "true/false"
    },
    "benefits": ["List of remote work benefits"],
    "leaves": {
      "annual": "Number of annual leaves",
      "sick": "Number of sick leaves",
      "parental": "Parental leave duration",
      "sabbatical": "Sabbatical policy"
    }
  },
  "teamCollaboration": {
    "overallScore": "Score out of 5",
    "activities": [
      {
        "type": "Activity type",
        "frequency": "Frequency",
        "participation": "Participation percentage",
        "icon": "Emoji"
      }
    ],
    "managerSupport": {
      "rating": "Score out of 5",
      "feedbackFrequency": "Frequency of feedback",
      "oneOnOneMeetings": "Frequency of 1:1 meetings",
      "testimonial": "Manager support testimonial"
    }
  },
  "mentalHealth": {
    "overallScore": "Score out of 5",
    "programs": [
      {
        "name": "Program name",
        "coverage": "Coverage details",
        "sessions": "Number of sessions or 'Unlimited'",
        "icon": "Emoji",
        "apps": ["List of wellness apps (if applicable)"]
      }
    ],
    "eapServices": {
      "available": "true/false",
      "coverage": "Coverage details",
      "includes": ["List of EAP services"]
    }
  },
  "diversity": {
    "stats": {
      "genderRatio": "Gender ratio",
      "ethnicDiversity": "Ethnic diversity percentage",
      "leadership": "Diversity in leadership"
    },
    "initiatives": [
      {
        "name": "Initiative name",
        "members": "Number of members",
        "activities": ["List of activities"],
        "icon": "Emoji"
      }
    ],
    "recognition": ["List of diversity recognitions"]
  },
  "employeeStories": [
    {
      "name": "Employee name",
      "role": "Role",
      "tenure": "Tenure at company",
      "image": "Emoji or image URL",
      "quote": "Employee quote",
      "highlights": ["List of highlights"]
    }
  ]
}

Ensure all information is specific to meta, accurate, and follows this exact structure. Include real examples and maintain consistent formatting."""
      }
    ],
    
  })
)
# Parse the response
response_json = response.json()
content = response_json["choices"][0]["message"]["content"]
# Extract and parse JSON from response
json_str = re.search(r'```(.*?)```', content, re.DOTALL).group(1)
meta_data = json.loads(json_str)

# Print each section with formatting
print("\n=== Culture Overview ===")
print(json.dumps(meta_data["cultureOverview"], indent=2))

print("\n=== Work Life Balance ===")
print(json.dumps(meta_data["workLifeBalance"], indent=2))

print("\n=== Remote Work ===")
print(json.dumps(meta_data["remoteWork"], indent=2))

print("\n=== Team Collaboration ===")
print(json.dumps(meta_data["teamCollaboration"], indent=2))

print("\n=== Mental Health ===")
print(json.dumps(meta_data["mentalHealth"], indent=2))

print("\n=== Diversity ===")
print(json.dumps(meta_data["diversity"], indent=2))

print("\n=== Employee Stories ===")
print(json.dumps(meta_data["employeeStories"], indent=2))

# Extract JSON from between triple backticks
# json_str = re.search(r'```(.*?)```', content, re.DOTALL).group(1)
# meta_stack = json.loads(json_str)
