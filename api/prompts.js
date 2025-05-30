export const getCompanyAnalysisPrompt = (companyName) => {
    return `Analyze ${companyName}'s hiring channels and provide information in the following EXACT JSON structure:

{
    "campusRecruitment": {
        "title": "Campus Recruitment",
        "description": "Brief description of ${companyName}'s campus recruitment process",
        "icon": "🎓",
        "badge": "String indicating typical eligibility",
        "details": [
            "4-5 specific steps in their campus recruitment process"
        ],
        "tips": [
            "4 specific tips for campus recruitment at ${companyName}"
        ]
    },
    "jobPortals": {
        "title": "Job Portals",
        "description": "Description of ${companyName}'s job portal presence",
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
        "description": "Description of ${companyName}'s referral process",
        "icon": "👥",
        "howToAsk": [
            "4 steps for seeking referrals at ${companyName}"
        ],
        "tips": [
            "4 specific tips for getting referrals"
        ]
    },
    "hackathons": {
        "title": "Hackathons & Competitions",
        "description": "Description of ${companyName}'s hackathon involvement",
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
        "description": "Strategy for cold outreach to ${companyName}",
        "icon": "✉️",
        "emailTemplate": {
            "subject": "Customized subject line format",
            "body": "Customized email template for ${companyName}"
        },
        "tips": [
            "4 specific tips for cold outreach"
        ]
    },
    "internshipConversion": {
        "title": "Internship → Full-Time",
        "description": "Details about ${companyName}'s internship conversion process",
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
        "description": "Information about contract opportunities at ${companyName}",
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

Ensure all information is specific to ${companyName} and follows this exact structure. Include real URLs where applicable and maintain consistent formatting.`;
};

export const getCompanyCulturePrompt = (companyName) => {
    return `Analyze the work culture at ${companyName} and provide information in the following structured format:

{
    "workEnvironment": {
        "title": "Work Environment",
        "description": "Overview of ${companyName}'s work environment",
        "icon": "🏢",
        "aspects": {
            "workLifeBalance": {
                "rating": "Score out of 5",
                "description": "Details about work-life balance",
                "highlights": [
                    "3-4 key points about work-life balance"
                ]
            },
            "remoteWork": {
                "policy": "Current remote work policy",
                "details": [
                    "3-4 specific points about remote work setup"
                ]
            },
            "officeStructure": {
                "description": "Office setup and atmosphere",
                "features": [
                    "3-4 notable office features or policies"
                ]
            }
        }
    },
    "growthOpportunities": {
        "title": "Career Growth",
        "description": "Career development at ${companyName}",
        "icon": "📈",
        "programs": [
            {
                "name": "Program name",
                "description": "Program details",
                "eligibility": "Eligibility criteria"
            }
        ],
        "promotionCycle": {
            "frequency": "Typical promotion timeline",
            "process": [
                "3-4 steps in promotion process"
            ]
        }
    },
    "benefits": {
        "title": "Benefits & Perks",
        "description": "Overview of benefits package",
        "icon": "🎁",
        "categories": {
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
        }
    }
}

Provide accurate, up-to-date information specific to ${companyName} while maintaining this exact structure.`;
};

export const getCoreCompanyDetailsPrompt = (companyName) => {
    return `Analyze ${companyName}'s core company details and provide information in the following EXACT JSON structure:

{
    "basicIdentity": {
        "name": "${companyName}",
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

Ensure all information is specific to ${companyName}, accurate, and follows this exact structure. Include real URLs where applicable and maintain consistent formatting.`;
}; 