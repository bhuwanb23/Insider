def get_company_analysis_prompt(company_name: str) -> str:
    return f'''Analyze {company_name}'s hiring channels and provide information in the following EXACT JSON structure:

{{
    "campusRecruitment": {{
        "title": "Campus Recruitment",
        "description": "Brief description of {company_name}'s campus recruitment process",
        "icon": "🎓",
        "badge": "String indicating typical eligibility",
        "details": [
            "4-5 specific steps in their campus recruitment process"
        ],
        "tips": [
            "4 specific tips for campus recruitment at {company_name}"
        ]
    }},
    "jobPortals": {{
        "title": "Job Portals",
        "description": "Description of {company_name}'s job portal presence",
        "icon": "🔍",
        "platforms": [
            {{
                "name": "Platform name",
                "url": "Platform URL"
            }}
        ],
        "tips": [
            "4 specific tips for job portal applications"
        ]
    }},
    "referrals": {{
        "title": "Referrals",
        "description": "Description of {company_name}'s referral process",
        "icon": "👥",
        "howToAsk": [
            "4 steps for seeking referrals at {company_name}"
        ],
        "tips": [
            "4 specific tips for getting referrals"
        ]
    }},
    "hackathons": {{
        "title": "Hackathons & Competitions",
        "description": "Description of {company_name}'s hackathon involvement",
        "icon": "🧩",
        "platforms": [
            {{
                "name": "Platform name",
                "url": "Platform URL"
            }}
        ],
        "activeContests": []
    }},
    "coldOutreach": {{
        "title": "Cold Outreach",
        "description": "Strategy for cold outreach to {company_name}",
        "icon": "✉️",
        "emailTemplate": {{
            "subject": "Customized subject line format",
            "body": "Customized email template for {company_name}"
        }},
        "tips": [
            "4 specific tips for cold outreach"
        ]
    }},
    "internshipConversion": {{
        "title": "Internship → Full-Time",
        "description": "Details about {company_name}'s internship conversion process",
        "icon": "🚀",
        "badge": "Conversion rate indicator",
        "tips": [
            "4 specific tips for conversion"
        ],
        "conversionStats": {{
            "rate": "Approximate conversion rate",
            "factors": [
                "4 key factors affecting conversion"
            ]
        }}
    }},
    "contractRoles": {{
        "title": "Freelancing / Contract Roles",
        "description": "Information about contract opportunities at {company_name}",
        "icon": "💼",
        "badge": "Type of contract work",
        "platforms": [
            {{
                "name": "Platform name",
                "url": "Platform URL"
            }}
        ],
        "tips": [
            "4 specific tips for contract roles"
        ]
    }}
}}

Ensure all information is specific to {company_name} and follows this exact structure. Include real URLs where applicable and maintain consistent formatting.'''

def get_company_culture_prompt(company_name: str) -> str:
    return f'''Analyze the work culture at {company_name} and provide information in the following structured format:

{{
    "workEnvironment": {{
        "title": "Work Environment",
        "description": "Overview of {company_name}'s work environment",
        "icon": "🏢",
        "aspects": {{
            "workLifeBalance": {{
                "rating": "Score out of 5",
                "description": "Details about work-life balance",
                "highlights": [
                    "3-4 key points about work-life balance"
                ]
            }},
            "remoteWork": {{
                "policy": "Current remote work policy",
                "details": [
                    "3-4 specific points about remote work setup"
                ]
            }},
            "officeStructure": {{
                "description": "Office setup and atmosphere",
                "features": [
                    "3-4 notable office features or policies"
                ]
            }}
        }}
    }},
    "growthOpportunities": {{
        "title": "Career Growth",
        "description": "Career development at {company_name}",
        "icon": "📈",
        "programs": [
            {{
                "name": "Program name",
                "description": "Program details",
                "eligibility": "Eligibility criteria"
            }}
        ],
        "promotionCycle": {{
            "frequency": "Typical promotion timeline",
            "process": [
                "3-4 steps in promotion process"
            ]
        }}
    }},
    "benefits": {{
        "title": "Benefits & Perks",
        "description": "Overview of benefits package",
        "icon": "🎁",
        "categories": {{
            "health": [
                "List of health benefits"
            ],
            "financial": [
                "List of financial benefits"
            ],
            "lifestyle": [
                "List of lifestyle perks"
            ],
            "professional": [
                "List of professional development benefits"
            ]
        }}
    }}
}}

Provide accurate, up-to-date information specific to {company_name} while maintaining this exact structure.''' 