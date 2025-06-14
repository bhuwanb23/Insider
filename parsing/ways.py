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
Analyze meta's hiring channels and provide information in the following EXACT JSON structure:

{
    "campusRecruitment": {
        "title": "Campus Recruitment",
        "description": "Brief description of meta's campus recruitment process",
        "icon": "🎓",
        "badge": "String indicating typical eligibility",
        "details": [
            "4-5 specific steps in their campus recruitment process"
        ],
        "tips": [
            "4 specific tips for campus recruitment at meta"
        ]
    },
    "jobPortals": {
        "title": "Job Portals",
        "description": "Description of meta's job portal presence",
        "icon": "🔍",
        "platforms": [
            {
                "name": "Platform name",
                "url": "Platform URL"
            }
        ],
        "tips": [
            "4 specific tips for job portal applications"
        ]
    },
    "referrals": {
        "title": "Referrals",
        "description": "Description of meta's referral process",
        "icon": "👥",
        "howToAsk": [
            "4 steps for seeking referrals at meta"
        ],
        "tips": [
            "4 specific tips for getting referrals"
        ]
    },
    "hackathons": {
        "title": "Hackathons & Competitions",
        "description": "Description of meta's hackathon involvement",
        "icon": "🧩",
        "platforms": [
            {
                "name": "Platform name",
                "url": "Platform URL"
            }
        ],
        "activeContests": []
    },
    "coldOutreach": {
        "title": "Cold Outreach",
        "description": "Strategy for cold outreach to meta",
        "icon": "✉️",
        "emailTemplate": {
            "subject": "Customized subject line format",
            "body": "Customized email template for meta"
        },
        "tips": [
            "4 specific tips for cold outreach"
        ]
    },
    "internshipConversion": {
        "title": "Internship → Full-Time",
        "description": "Details about meta's internship conversion process",
        "icon": "🚀",
        "badge": "Conversion rate indicator",
        "tips": [
            "4 specific tips for conversion"
        ],
        "conversionStats": {
            "rate": "Approximate conversion rate",
            "factors": [
                "4 key factors affecting conversion"
            ]
        }
    },
    "contractRoles": {
        "title": "Freelancing / Contract Roles",
        "description": "Information about contract opportunities at meta",
        "icon": "💼",
        "badge": "Type of contract work",
        "platforms": [
            {
                "name": "Platform name",
                "url": "Platform URL"
            }
        ],
        "tips": [
            "4 specific tips for contract roles"
        ]
    }
}

Ensure all information is specific to meta and follows this exact structure. Include real URLs where applicable and maintain consistent formatting.
"""
      }
    ],
    
  })
)
# Parse the response
response_json = response.json()
content = response_json["choices"][0]["message"]["content"]
# Extract and parse JSON from response
try:
    match = re.search(r'```(.*?)```', content, re.DOTALL)
    if not match:
        print("Error: Could not find JSON between triple backticks")
        print("Content received:")
        print(content)
        exit(1)
    
    json_str = match.group(1)
    print("Extracted JSON string:")
    print(json_str)
    
    meta_data = json.loads(json_str)
except json.JSONDecodeError as e:
    print(f"JSON decode error: {e}")
    print("Problematic JSON string:")
    print(json_str)
    exit(1)

# Print each section with formatting
print("\n=== Campus Recruitment ===")
print(json.dumps(meta_data["campusRecruitment"], indent=2))

print("\n=== Job Portals ===")
print(json.dumps(meta_data["jobPortals"], indent=2))

print("\n=== Referrals ===")
print(json.dumps(meta_data["referrals"], indent=2))

print("\n=== Hackathons ===")
print(json.dumps(meta_data["hackathons"], indent=2))

print("\n=== Cold Outreach ===")
print(json.dumps(meta_data["coldOutreach"], indent=2))

print("\n=== Internship Conversion ===")
print(json.dumps(meta_data["internshipConversion"], indent=2))

print("\n=== Contract Roles ===")
print(json.dumps(meta_data["contractRoles"], indent=2))

# Extract JSON from between triple backticks
# json_str = re.search(r'```(.*?)```', content, re.DOTALL).group(1)
# meta_stack = json.loads(json_str)
