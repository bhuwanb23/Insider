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
Analyze the interview experience at meta and provide information in the following EXACT JSON structure:

{
  "journey": {
    "steps": [
      {
        "title": "Stage title",
        "duration": "Typical duration",
        "description": "Stage description",
        "icon": "Emoji",
        "status": "Stage status (e.g., Technical, Final)"
      }
    ]
  },
  "candidateExperiences": [
    {
      "role": "Role name",
      "source": "Source (e.g., Glassdoor)",
      "date": "Date",
      "status": "Outcome status",
      "sentiment": "Sentiment (e.g., Positive, Challenging)",
      "summary": "Summary of experience",
      "tags": ["List of tags"]
    }
  ],
  "technicalQuestions": [
    {
      "category": "Question category",
      "difficulty": "Difficulty level",
      "frequency": "Frequency percentage",
      "question": "Sample question",
      "tags": ["List of tags"]
    }
  ],
  "roleSpecificQuestions": [
    {
      "role": "Role name",
      "questions": [
        {
          "question": "Sample question",
          "frequency": "Frequency percentage",
          "difficulty": "Difficulty level"
        }
      ]
    }
  ],
  "behavioralQuestions": [
    {
      "question": "Sample behavioral question",
      "frequency": "Frequency percentage",
      "category": "Category",
      "tip": "Answering tip"
    }
  ],
  "questionStats": {
    "topCategories": [
      {
        "name": "Category name",
        "percentage": "Percentage",
        "trend": "Trend (e.g., increasing, stable)"
      }
    ],
    "difficultyDistribution": {
      "easy": "Percentage",
      "medium": "Percentage",
      "hard": "Percentage"
    }
  },
  "mockInterviewTips": [
    {
      "title": "Tip category",
      "tips": ["List of tips"],
      "items": ["List of common pitfalls (if applicable)"]
    }
  ]
}

Ensure all information is specific to meta, accurate, and follows this exact structure. Use real examples and maintain consistent formatting.
"""
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
print("\n=== Interview Journey ===")
print(json.dumps(meta_data["journey"], indent=2))

print("\n=== Candidate Experiences ===")
print(json.dumps(meta_data["candidateExperiences"], indent=2))

print("\n=== Technical Questions ===")
print(json.dumps(meta_data["technicalQuestions"], indent=2))

print("\n=== Role Specific Questions ===")
print(json.dumps(meta_data["roleSpecificQuestions"], indent=2))

print("\n=== Behavioral Questions ===")
print(json.dumps(meta_data["behavioralQuestions"], indent=2))

print("\n=== Question Statistics ===")
print(json.dumps(meta_data["questionStats"], indent=2))

print("\n=== Mock Interview Tips ===")
print(json.dumps(meta_data["mockInterviewTips"], indent=2))

# Extract JSON from between triple backticks
# json_str = re.search(r'```(.*?)```', content, re.DOTALL).group(1)
# meta_stack = json.loads(json_str)
