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
Analyze meta's core company details and provide information in the following EXACT JSON structure:

{
    "basicIdentity": {
        "name": "meta",
        "logo": "URL to company logo",
        "tagline": "Company tagline",
        "industry": "Primary industry",
        "headquarters": "HQ location",
        "foundedYear": "Year founded",
        "keyPeople": [
            {
                "name": "Leader name",
                "role": "Role/Position",
                "image": "Profile image URL",
                "linkedIn": "LinkedIn profile URL"
            }
        ],
        "employees": {
            "global": "Total global employees",
            "india": "Employees in India"
        }
    },
    "overview": {
        "description": "Comprehensive company description",
        "whatWeDo": "Core business activities",
        "keyMarkets": ["List of key markets/domains"],
        "vision": "Company vision statement",
        "mission": "Company mission statement",
        "coreValues": ["List of core values"],
        "globalPresence": ["List of countries with presence"]
    },
    "legalDetails": {
        "companyType": "Type of company",
        "legalStructure": {
            "type": "Legal entity type",
            "registrationNumber": "Company registration number",
            "registrationCountry": "Country of registration",
            "incorporationDate": "Date of incorporation",
            "fiscalYear": "Fiscal year period"
        },
        "fundingHistory": {
            "currentStage": "Current funding stage",
            "rounds": [
                {
                    "stage": "Funding round",
                    "year": "Year",
                    "amount": "Amount raised",
                    "leadInvestor": "Lead investor name"
                }
            ]
        },
        "stockInfo": {
            "exchange": "Stock exchange if public",
            "ticker": "Stock ticker symbol",
            "marketCap": "Current market cap",
            "sharesOutstanding": "Number of shares"
        }
    },
    "timeline": [
        {
            "year": "Year of event",
            "event": "Significant company event"
        }
    ],
    "recognition": {
        "workplace": [
            {
                "title": "Award/recognition title",
                "year": "Year received",
                "description": "Description of recognition",
                "source": "Source URL"
            }
        ],
        "rankings": [
            {
                "title": "Ranking title",
                "year": "Year",
                "rank": "Numerical rank",
                "description": "Description",
                "source": "Source URL"
            }
        ],
        "product": [
            {
                "title": "Award title",
                "year": "Year",
                "description": "Description",
                "source": "Source URL"
            }
        ]
    },
    "contact": {
        "website": "Company website URL",
        "careersPage": "Careers page URL",
        "socialMedia": {
            "linkedin": "LinkedIn URL",
            "twitter": "Twitter URL",
            "glassdoor": "Glassdoor URL"
        },
        "support": "Support email"
    },
    "culture": {
        "pillars": ["List of cultural pillars"],
        "foundersMessage": "Message from founders",
        "heroBanner": "URL to hero banner image"
    }
}

Ensure all information is specific to meta, accurate, and follows this exact structure. Include real URLs where applicable and maintain consistent formatting.
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
print("\n=== Basic Identity ===")
print(json.dumps(meta_data["basicIdentity"], indent=2))

print("\n=== Overview ===")
print(json.dumps(meta_data["overview"], indent=2))

print("\n=== Legal Details ===")
print(json.dumps(meta_data["legalDetails"], indent=2))

print("\n=== Timeline ===")
print(json.dumps(meta_data["timeline"], indent=2))

print("\n=== Recognition ===")
print(json.dumps(meta_data["recognition"], indent=2))

print("\n=== Contact ===")
print(json.dumps(meta_data["contact"], indent=2))

print("\n=== Culture ===")
print(json.dumps(meta_data["culture"], indent=2))

# Extract JSON from between triple backticks
# json_str = re.search(r'```(.*?)```', content, re.DOTALL).group(1)
# meta_stack = json.loads(json_str)
