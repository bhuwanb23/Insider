// export const getCompanyAnalysisPrompt = (companyName) => {
//     return `Analyze ${companyName}'s hiring channels and provide information in the following EXACT JSON structure:
// Return ONLY the following JSON structure for ${companyName}'s technology stack with no additional text or introduction:
// No need to add any details like here is the response or the JSON data is provided, Nothing needed other than JSON response
// {
//     "campusRecruitment": {
//         "title": "Campus Recruitment",
//         "description": "Brief description of ${companyName}'s campus recruitment process",
//         "icon": "🎓",
//         "badge": "String indicating typical eligibility",
//         "details": [
//             "4-5 specific steps in their campus recruitment process"
//         ],
//         "tips": [
//             "4 specific tips for campus recruitment at ${companyName}"
//         ]
//     },
//     "jobPortals": {
//         "title": "Job Portals",
//         "description": "Description of ${companyName}'s job portal presence",
//         "icon": "🔍",
//         "platforms": [
//             {
//                 "name": "Platform name",
//                 "url": "Platform URL"
//             }
//         ],
//         "tips": [
//             "4 specific tips for job portal applications"
//         ]
//     },
//     "referrals": {
//         "title": "Referrals",
//         "description": "Description of ${companyName}'s referral process",
//         "icon": "👥",
//         "howToAsk": [
//             "4 steps for seeking referrals at ${companyName}"
//         ],
//         "tips": [
//             "4 specific tips for getting referrals"
//         ]
//     },
//     "hackathons": {
//         "title": "Hackathons & Competitions",
//         "description": "Description of ${companyName}'s hackathon involvement",
//         "icon": "🧩",
//         "platforms": [
//             {
//                 "name": "Platform name",
//                 "url": "Platform URL"
//             }
//         ],
//         "activeContests": []
//     },
//     "coldOutreach": {
//         "title": "Cold Outreach",
//         "description": "Strategy for cold outreach to ${companyName}",
//         "icon": "✉️",
//         "emailTemplate": {
//             "subject": "Customized subject line format",
//             "body": "Customized email template for ${companyName}"
//         },
//         "tips": [
//             "4 specific tips for cold outreach"
//         ]
//     },
//     "internshipConversion": {
//         "title": "Internship → Full-Time",
//         "description": "Details about ${companyName}'s internship conversion process",
//         "icon": "🚀",
//         "badge": "Conversion rate indicator",
//         "tips": [
//             "4 specific tips for conversion"
//         ],
//         "conversionStats": {
//             "rate": "Approximate conversion rate",
//             "factors": [
//                 "4 key factors affecting conversion"
//             ]
//         }
//     },
//     "contractRoles": {
//         "title": "Freelancing / Contract Roles",
//         "description": "Information about contract opportunities at ${companyName}",
//         "icon": "💼",
//         "badge": "Type of contract work",
//         "platforms": [
//             {
//                 "name": "Platform name",
//                 "url": "Platform URL"
//             }
//         ],
//         "tips": [
//             "4 specific tips for contract roles"
//         ]
//     }
// }

// Ensure all information is specific to ${companyName} and follows this exact structure. Include real URLs where applicable and maintain consistent formatting.`;
// };

export const getCompanyAnalysisPrompt = (companyName) => {
  return `
Analyze ${companyName}'s hiring channels and extract detailed, updated, and platform-specific information from all possible public sources including (but not limited to) Quora, Reddit, LinkedIn, Glassdoor, Google Search, and other available platforms.

Return ONLY the following **exact JSON structure** for ${companyName}'s hiring and engagement channels. Do **not** include any additional text, comments, or introductions. Just return the JSON.

Ensure all information is accurate, real, and the latest available. Real URLs must be used where applicable. Use precise and high-level corporate English throughout.

{
  "campusRecruitment": {
    "title": "Campus Recruitment",
    "description": "Brief description of ${companyName}'s campus recruitment process in around 100 words",
    "icon": "🎓",
    "badge": "Typical eligibility criteria",
    "details": [
      "Detailed steps of the campus recruitment process"
    ],
    "tips": [
      "At least 6-7 practical, real-world tips for succeeding in campus recruitment at ${companyName}"
    ]
  },
  "jobPortals": {
    "title": "Job Portals",
    "description": "Summary of ${companyName}'s job portal presence in around 50 words",
    "icon": "🔍",
    "platforms": [
      {
        "name": "Platform Name",
        "url": "Platform URL"
      }
    ],
    "tips": [
      "At least 6-7 tips for improving success on job portal applications specific to ${companyName}"
    ]
  },
  "referrals": {
    "title": "Referrals",
    "description": "Brief description of ${companyName}'s referral process in ~50 words",
    "icon": "👥",
    "howToAsk": [
      "Practical steps for approaching employees and seeking referrals"
    ],
    "tips": [
      "At least 5 specific referral success tips backed by real examples or sources"
    ]
  },
  "hackathons": {
    "title": "Hackathons & Competitions",
    "description": "Comprehensive overview of ${companyName}'s involvement in hackathons in 60–70 words",
    "icon": "🧩",
    "platforms": [
      {
        "name": "Platform Name",
        "url": "Platform URL"
      }
    ],
    "activeContests": []
  },
  "coldOutreach": {
    "title": "Cold Outreach",
    "description": "Strategy and best practices for effective cold outreach to ${companyName}",
    "icon": "✉️",
    "emailTemplate": {
      "subject": "Custom subject line in 10–15 impactful words",
      "body": "Professional email template with a persuasive and high-level tone, at least 150 words, compelling enough to prompt a response from ${companyName}"
    },
    "tips": [
      "At least 6-7 advanced and modern tips for effective cold outreach"
    ]
  },
  "internshipConversion": {
    "title": "Internship → Full-Time",
    "description": "Insights on converting internships into full-time roles at ${companyName} in ~50 words",
    "icon": "🚀",
    "badge": "Conversion rate or eligibility criteria",
    "tips": [
      "At least 6-7 tips for successful internship-to-fulltime conversion"
    ],
    "conversionStats": {
      "rate": "Approximate conversion rate",
      "factors": [
        "6-7 key factors that influence conversion"
      ]
    }
  },
  "contractRoles": {
    "title": "Freelancing / Contract Roles",
    "description": "Overview of freelance or contract-based opportunities at ${companyName} (~50 words)",
    "icon": "💼",
    "badge": "Nature of contractual work",
    "platforms": [
      {
        "name": "Platform Name",
        "url": "Platform URL"
      }
    ],
    "tips": [
      "At least 6-7 tips for obtaining and succeeding in contract roles"
    ]
  }
}

🔒 **Instructions for AI Model**:
1. Ensure the data is updated and specific to ${companyName}.
2. Each section must reflect real-world practices and verified information.
3. Use real URLs where applicable (LinkedIn, Naukri, Internshala, etc.).
4. Leverage posts, discussions, and credible resources from Quora, Reddit, LinkedIn, etc.
5. All descriptions must be written in polished and impactful English.
6. Tips and steps must be insightful and actionable.
7. Cold outreach email should be crafted with top-tier professional language.
8. Stick strictly to the JSON format above. No wrapping, explanations, or markdown.
`
}

// export const getCompanyCulturePrompt = (companyName) => {
//     return `Analyze the work culture at ${companyName} and provide information in the following EXACT JSON structure:
// Return ONLY the following JSON structure for ${companyName}'s technology stack with no additional text or introduction:
// No need to add any details like here is the response or the JSON data is provided, Nothing needed other than JSON response
// {
//   "cultureOverview": {
//     "coreValues": [
//       { "value": "Core value name", "icon": "Emoji", "description": "Description of the value" }
//     ],
//     "culturalVibe": {
//       "type": "Type of culture (e.g., Flexible & Collaborative)",
//       "icon": "Emoji",
//       "attributes": ["List of attributes (e.g., Fast-paced, Modern)"],
//       "description": "Brief description of the cultural vibe"
//     },
//     "employeeEmpowerment": {
//       "rating": "Score out of 5",
//       "initiatives": ["List of empowerment initiatives"]
//     },
//     "leadershipStyle": {
//       "type": "Type of leadership hierarchy",
//       "icon": "Emoji",
//       "features": ["List of leadership features"]
//     }
//   },
//   "workLifeBalance": {
//     "rating": "Score out of 5",
//     "totalReviews": "Number of reviews",
//     "positivePercentage": "Percentage of positive reviews",
//     "workHours": {
//       "type": "Type of work hours (e.g., Flexible)",
//       "standard": "Standard work hours",
//       "flexibility": "Level of flexibility",
//       "timeZones": "Time zone coverage"
//     },
//     "metrics": [
//       { "category": "Metric name", "score": "Score out of 5", "status": "Status (e.g., great, good)" }
//     ]
//   },
//   "remoteWork": {
//     "policy": "Remote work policy",
//     "details": {
//       "remoteAllowed": "true/false",
//       "hybridStructure": "Description of hybrid structure",
//       "globalPolicy": "Global remote policy",
//       "equipmentProvided": "true/false"
//     },
//     "benefits": ["List of remote work benefits"],
//     "leaves": {
//       "annual": "Number of annual leaves",
//       "sick": "Number of sick leaves",
//       "parental": "Parental leave duration",
//       "sabbatical": "Sabbatical policy"
//     }
//   },
//   "teamCollaboration": {
//     "overallScore": "Score out of 5",
//     "activities": [
//       {
//         "type": "Activity type",
//         "frequency": "Frequency",
//         "participation": "Participation percentage",
//         "icon": "Emoji"
//       }
//     ],
//     "managerSupport": {
//       "rating": "Score out of 5",
//       "feedbackFrequency": "Frequency of feedback",
//       "oneOnOneMeetings": "Frequency of 1:1 meetings",
//       "testimonial": "Manager support testimonial"
//     }
//   },
//   "mentalHealth": {
//     "overallScore": "Score out of 5",
//     "programs": [
//       {
//         "name": "Program name",
//         "coverage": "Coverage details",
//         "sessions": "Number of sessions or 'Unlimited'",
//         "icon": "Emoji",
//         "apps": ["List of wellness apps (if applicable)"]
//       }
//     ],
//     "eapServices": {
//       "available": "true/false",
//       "coverage": "Coverage details",
//       "includes": ["List of EAP services"]
//     }
//   },
//   "diversity": {
//     "stats": {
//       "genderRatio": "Gender ratio",
//       "ethnicDiversity": "Ethnic diversity percentage",
//       "leadership": "Diversity in leadership"
//     },
//     "initiatives": [
//       {
//         "name": "Initiative name",
//         "members": "Number of members",
//         "activities": ["List of activities"],
//         "icon": "Emoji"
//       }
//     ],
//     "recognition": ["List of diversity recognitions"]
//   },
//   "employeeStories": [
//     {
//       "name": "Employee name",
//       "role": "Role",
//       "tenure": "Tenure at company",
//       "image": "Emoji or image URL",
//       "quote": "Employee quote",
//       "highlights": ["List of highlights"]
//     }
//   ]
// }

// Ensure all information is specific to ${companyName}, accurate, and follows this exact structure. Include real examples and maintain consistent formatting.`;
// };

export const getCompanyCulturePrompt = (companyName) => {
  return `Analyze the work culture at ${companyName} and provide information in the following EXACT JSON structure:
Return ONLY the following JSON structure for ${companyName}'s technology stack with no additional text or introduction:
No need to add any details like here is the response or the JSON data is provided, Nothing needed other than JSON response
{
"cultureOverview": {
  "coreValues": [
    { "value": "Core value name", "icon": "Emoji", "description": "Description of the value in 50 words atleast" }
  ],
  "culturalVibe": {
    "type": "Type of culture (e.g., Flexible & Collaborative)",
    "icon": "Emoji",
    "attributes": ["List of attributes (e.g., Fast-paced, Modern) based on clear understanding of the company"],
    "description": "Brief description of the cultural vibe in 50 words atleast"
  },
  "employeeEmpowerment": {
    "rating": "Score out of 5",
    "initiatives": ["List of empowerment initiatives in 50 words atleast based on clear understanding of the company"]
  },
  "leadershipStyle": {
    "type": "Type of leadership hierarchy",
    "icon": "Emoji",
    "features": ["List of leadership features in 50 words atleast based on clear understanding of the company"]
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
  "policy": "Remote work policy in 50 words atleast based on clear understanding of the company",
  "details": {
    "remoteAllowed": "true/false",
    "hybridStructure": "Description of hybrid structure in 50 words atleast",
    "globalPolicy": "Global remote policy in 50 words atleast",
    "equipmentProvided": "true/false in 50 words atleast"
  },
  "benefits": ["List of remote work benefits in 50 words atleast based on clear understanding of the company"],
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
    "testimonial": "Manager support testimonial based on clear understanding of the company in at least 50 words"
  }
},
"mentalHealth": {
  "overallScore": "Score out of 5",
  "programs": [
    {
      "name": "Program name",
      "coverage": "Coverage details based on clear understanding of the company in at least 50 words",
      "sessions": "Number of sessions or 'Unlimited'",
      "icon": "Emoji",
      "apps": ["List of wellness apps (if applicable)"]
    }
  ],
  "eapServices": {
    "available": "true/false",
    "coverage": "Coverage details based on clear understanding of the company in at least 50 words",
    "includes": ["List of EAP services based on clear understanding of the company in at least 50 words"]
  }
},
"diversity": {
  "stats": {
    "genderRatio": "Gender ratio based on clear understanding of the company",
    "ethnicDiversity": "Ethnic diversity percentage",
    "leadership": "Diversity in leadership"
  },
  "initiatives": [
    {
      "name": "Initiative name",
      "members": "Number of members in 50 words atleast",
      "activities": ["List of activities in 50 words atleast"],
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
    "quote": "Employee quote in 50 words atleast",
    "highlights": ["List of highlights in 50 words atleast"]
  }
]
}

🔒 **Instructions for AI Model**:
1. Use up-to-date and specific information relevant only to ${companyName}.
2. For core values, leadership, and collaboration, extract real employee testimonials, Glassdoor insights, and published values on the company’s official platforms.
3. For remote work, list actual policies, hybrid models, and employee benefits sourced from verified platforms.
4. Include actual data-backed metrics, ratings, and percentages (not placeholders).
5. For employee stories, use direct quotes or summarized narratives from employee experiences available on platforms like LinkedIn or Quora (include emojis or image URLs as needed).
6. Use professional, vivid, and modern corporate English with a structured tone.
7. All entries must be cohesive, well-structured, and accurate. Avoid assumptions — base insights only on real and traceable sources.
8. Stick strictly to the JSON format above. No wrapping, explanations, or markdown.

Ensure all information is specific to ${companyName}, accurate, and follows this exact structure. Include real examples and maintain consistent formatting.`;
};


export const getCoreCompanyDetailsPrompt = (companyName) => {
    return `Analyze ${companyName}'s core company details and provide information in the following EXACT JSON structure:
Return ONLY the following JSON structure for ${companyName}'s technology stack with no additional text or introduction:
No need to add any details like here is the response or the JSON data is provided, Nothing needed other than JSON response
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

export const getCompanyInterviewExperiencePrompt = (companyName) => {
    return `Analyze the interview experience at ${companyName} and provide information in the following EXACT JSON structure:
Return ONLY the following JSON structure for ${companyName}'s technology stack with no additional text or introduction:
No need to add any details like here is the response or the JSON data is provided, Nothing needed other than JSON response
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

Ensure all information is specific to ${companyName}, accurate, and follows this exact structure. Use real examples and maintain consistent formatting.`;
};

export const getCompanyJobHiringInsightsPrompt = (companyName) => {
    return `Analyze the job hiring insights for ${companyName} and provide information in the following EXACT JSON structure:
Return ONLY the following JSON structure for ${companyName}'s technology stack with no additional text or introduction:
No need to add any details like here is the response or the JSON data is provided, Nothing needed other than JSON response
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

Ensure all information is specific to ${companyName}, accurate, and follows this exact structure. Use real examples and maintain consistent formatting.`;
};

export const getCompanyNewsHighlightsPrompt = (companyName) => {
    return `Analyze the latest news and highlights for ${companyName} and provide information in the following EXACT JSON structure:
Return ONLY the following JSON structure for ${companyName}'s technology stack with no additional text or introduction:
No need to add any details like here is the response or the JSON data is provided, Nothing needed other than JSON response
{
  "headlines": [
    {
      "title": "Headline title",
      "source": "Source name",
      "date": "Date",
      "summary": "Summary of the news",
      "url": "URL to the news article",
      "image": "Image URL or filename"
    }
  ],
  "socialSentiment": {
    "overall": {
      "positive": "Percentage",
      "neutral": "Percentage",
      "negative": "Percentage"
    },
    "trends": [
      { "date": "Date", "sentiment": "Sentiment score" }
    ],
    "sources": {
      "twitter": { "positive": "Percentage", "neutral": "Percentage", "negative": "Percentage" },
      "linkedin": { "positive": "Percentage", "neutral": "Percentage", "negative": "Percentage" },
      "reddit": { "positive": "Percentage", "neutral": "Percentage", "negative": "Percentage" }
    }
  },
  "highlights": [
    {
      "title": "Highlight title",
      "description": "Highlight description",
      "date": "Date",
      "category": "Category"
    }
  ],
  "studentImpact": [
    {
      "title": "Impact title",
      "description": "Impact description",
      "impact": "Impact details"
    }
  ]
}

Ensure all information is specific to ${companyName}, accurate, and follows this exact structure. Use real examples and maintain consistent formatting.`;
};

export const getCompanyTechStackPrompt = (companyName) => {
    return `Analyze the technology stack at ${companyName} and provide information in the following EXACT JSON structure:
Return ONLY the following JSON structure for ${companyName}'s technology stack with no additional text or introduction:
No need to add any details like here is the response or the JSON data is provided, Nothing needed other than JSON response
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

Ensure all information is specific to ${companyName}, accurate, and follows this exact structure. Use real examples and maintain consistent formatting.`;
};