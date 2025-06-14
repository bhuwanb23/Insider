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
Analyze the job hiring insights for meta and provide information in the following EXACT JSON structure:

{
  "commonRoles": [
    {
      "title": "Role title",
      "department": "Department",
      "experienceLevel": "Experience level",
      "location": "Location type",
      "icon": "Emoji"
    }
  ],
  "internshipConversion": {
    "rate": "Conversion rate percentage",
    "totalInterns": "Total number of interns",
    "convertedCount": "Number converted",
    "yearOverYearGrowth": "YoY growth percentage"
  },
  "hiringChannels": [
    {
      "name": "Channel name",
      "logo": "Logo URL",
      "successRate": "Success rate percentage",
      "activeListings": "Number of active listings (if applicable)",
      "partnerInstitutes": "Number of partner institutes (if applicable)",
      "bonusAmount": "Referral bonus (if applicable)",
      "directApplications": "Number of direct applications (if applicable)"
    }
  ],
  "jobTrends": {
    "quarterlyGrowth": {
      "tech": "Tech growth percentage",
      "design": "Design growth percentage",
      "marketing": "Marketing growth percentage"
    },
    "topLocations": [
      {
        "city": "City name",
        "country": "Country name",
        "openings": "Number of openings"
      }
    ],
    "topDepartments": [
      {
        "name": "Department name",
        "openings": "Number of openings",
        "growth": "Growth percentage"
      }
    ]
  },
  "hiringTimeline": {
    "campus": {
      "period": "Period",
      "frequency": "Frequency",
      "nextDrive": "Next drive date"
    },
    "offCampus": {
      "period": "Period",
      "frequency": "Frequency",
      "averageOpenings": "Average number of openings"
    },
    "hackathons": {
      "period": "Period",
      "frequency": "Frequency",
      "lastEvent": "Last event date"
    }
  },
  "hiringProcess": [
    {
      "stage": "Stage name",
      "duration": "Stage duration",
      "successRate": "Success rate percentage (if applicable)",
      "tips": "Tips (if applicable)",
      "topics": ["List of topics (if applicable)"],
      "rounds": "Number of rounds (if applicable)",
      "focusAreas": ["List of focus areas (if applicable)"],
      "includes": ["List of included items (if applicable)"]
    }
  ],
  "resumeTips": {
    "preferences": ["List of resume preferences"],
    "tools": [
      {
        "name": "Tool name",
        "purpose": "Purpose of tool",
        "keywords": ["List of keywords (if applicable)"],
        "platform": "Platform name (if applicable)",
        "focusAreas": ["List of focus areas (if applicable)"]
      }
    ],
    "optimization": ["List of optimization tips"]
  }
}

Ensure all information is specific to meta, accurate, and follows this exact structure. Use real examples and maintain consistent formatting."""
      }
    ],
    
  })
)
# Parse the response
response_json = response.json()
content = response_json["choices"][0]["message"]["content"]

# Extract JSON from between triple backticks
json_str = re.search(r'```(.*?)```', content, re.DOTALL).group(1)
jobs_data = json.loads(json_str)

# Print each section with formatted output
print("Common Roles:")
print(json.dumps(jobs_data["commonRoles"], indent=2))
print("\nInternship Conversion:")
print(json.dumps(jobs_data["internshipConversion"], indent=2))
print("\nHiring Channels:")
print(json.dumps(jobs_data["hiringChannels"], indent=2))
print("\nJob Trends:")
print(json.dumps(jobs_data["jobTrends"], indent=2))
print("\nHiring Timeline:")
print(json.dumps(jobs_data["hiringTimeline"], indent=2))
print("\nHiring Process:")
print(json.dumps(jobs_data["hiringProcess"], indent=2))
print("\nResume Tips:")
print(json.dumps(jobs_data["resumeTips"], indent=2))

# Extract JSON from between triple backticks
# json_str = re.search(r'```(.*?)```', content, re.DOTALL).group(1)
# meta_stack = json.loads(json_str)
