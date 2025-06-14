import requests
import json
import re

def parse_response(raw_output):
    """
    Parse raw API response containing JSON and return cleaned JSON object
    
    Args:
        raw_output (str): Raw API response containing JSON
        
    Returns:
        dict: Parsed and cleaned JSON object
    """
    try:
        # Parse the initial JSON response
        response_json = json.loads(raw_output)
        content = response_json["choices"][0]["message"]["content"]
        
        # Extract JSON string between triple backticks if present
        if '```' in content:
            json_str = re.search(r'```(.*?)```', content, re.DOTALL).group(1)
            return json.loads(json_str)
        return json.loads(content)
    except json.JSONDecodeError as e:
        print(f"Error parsing JSON: {e}")
        return None
    except (KeyError, AttributeError) as e:
        print(f"Error processing response: {e}")
        return None

response = requests.post(
  url="https://openrouter.ai/api/v1/chat/completions",
  headers={
    "Authorization": "Bearer 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",
    "Content-Type": "application/json",
    "HTTP-Referer": "<YOUR_SITE_URL>", # Optional. Site URL for rankings on openrouter.ai.
    "X-Title": "<YOUR_SITE_NAME>", # Optional. Site title for rankings on openrouter.ai.
  },
  data=json.dumps({
    "model": "meta-llama/llama-3.3-8b-instruct:free",
    "messages": [
      {
        "role": "user",
        "content": """
        Analyze google's hiring channels and provide information in the following EXACT JSON structure:

{
    "campusRecruitment": {
        "title": "Campus Recruitment",
        "description": "Brief description of google's campus recruitment process",
        "icon": "🎓",
        "badge": "String indicating typical eligibility",
        "details": [
            "4-5 specific steps in their campus recruitment process"
        ],
        "tips": [
            "4 specific tips for campus recruitment at google"
        ]
    },
    "jobPortals": {
        "title": "Job Portals",
        "description": "Description of google's job portal presence",
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
        "description": "Description of google's referral process",
        "icon": "👥",
        "howToAsk": [
            "4 steps for seeking referrals at google"
        ],
        "tips": [
            "4 specific tips for getting referrals"
        ]
    },
    "hackathons": {
        "title": "Hackathons & Competitions",
        "description": "Description of google's hackathon involvement",
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
        "description": "Strategy for cold outreach to google",
        "icon": "✉️",
        "emailTemplate": {
            "subject": "Customized subject line format",
            "body": "Customized email template for google"
        ],
        "tips": [
            "4 specific tips for cold outreach"
        ]
    },
    "internshipConversion": {
        "title": "Internship → Full-Time",
        "description": "Details about google's internship conversion process",
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
        ]
    },
    "contractRoles": {
        "title": "Freelancing / Contract Roles",
        "description": "Information about contract opportunities at Google",
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

Ensure all information is specific to Google and follows this exact structure. Include real URLs where applicable and maintain consistent formatting."""
      }
    ],
    
  })
)

# Parse and print the cleaned JSON response
parsed_response = parse_response(response.text)
if parsed_response:
    print(json.dumps(parsed_response, indent=2))