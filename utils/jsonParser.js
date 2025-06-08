// Centralized JSON parsing utility for all context files

// Clean and parse JSON responses from OpenRouter
export function cleanForJsonParse(str) {
  if (!str || typeof str !== 'string') {
    throw new Error('Invalid input: Expected string');
  }

  let cleaned = str;
  try {
    // Remove all types of comments (single-line // and multi-line /* */)
    // This regex carefully avoids removing http(s)://
    cleaned = cleaned.replace(/\/\*[^]*?\*\/|(?<!:)\/\/[^\n]*(\r?\n|$)/gm, '');
    // Remove parenthetical notes after URLs or values
    cleaned = cleaned.replace(/"\s*\([^)]*\)\s*"/g, '"');
    cleaned = cleaned.replace(/\s*\([^)]*\)\s*(,|\n|$)/g, '$1');
    // Remove backticks and smart quotes
    cleaned = cleaned.replace(/[`""'']/g, '"');
    // Remove invalid triple quotes
    cleaned = cleaned.replace(/"""/g, '');
    // Remove double commas (common LLM artifact)
    cleaned = cleaned.replace(/,\s*,+/g, ',');
    // Replace non-JSON compliant 'None' with 'null'
    cleaned = cleaned.replace(/None/g, 'null');
    // Remove trailing commas before closing brackets/braces
    cleaned = cleaned.replace(/,\s*([}\]])/g, '$1');
    // Remove trailing commas before nested objects/arrays
    cleaned = cleaned.replace(/,\s*([\[{])/g, '$1');
    // Quote unquoted numeric ranges (e.g., 4-6) in key-value pairs or as array elements
    cleaned = cleaned.replace(/([:\[,])\s*([0-9]+-[0-9]+)(\s*[,}\]])/g, '$1"$2"$3');
    // Remove newlines and carriage returns, replace with single space if within property values to avoid breaking JSON structure, otherwise remove
    cleaned = cleaned.replace(/"([^"\\]*(?:\\.[^"\\]*)*)"/g, function(match) {
      return match.replace(/\n/g, '\\n').replace(/\r/g, '\\r');
    });
    cleaned = cleaned.replace(/(\r\n|\n|\r)/gm, '');
    // Fix array syntax errors
    cleaned = cleaned.replace(/,\s*]/g, ']'); // Remove trailing commas in arrays
    cleaned = cleaned.replace(/\[\s*,/g, '['); // Remove leading commas in arrays
    // Attempt to quote unquoted property names (simple cases). Ensure it doesn't double quote.
    cleaned = cleaned.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');
    // Remove any invalid control characters (excluding valid JSON escape sequences)
    cleaned = cleaned.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');
    // Ensure no multiple spaces after commas or colons
    cleaned = cleaned.replace(/([,:])\s+/g, '$1 ');
    // Trim outer whitespace
    cleaned = cleaned.trim();
    // Extract only the JSON part (from first { to last })
    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      cleaned = cleaned.substring(firstBrace, lastBrace + 1);
    } else {
      throw new Error('No JSON object found in response');
    }
    return cleaned;
  } catch (error) {
    console.error('[JSON Parser] Error cleaning JSON:', error);
    throw new Error(`Failed to clean JSON response: ${error.message}`);
  }
}

// Parse JSON response with context-specific validation
export function parseJsonResponse(dataOrRaw, contextName, validator) {
  try {
    let data = dataOrRaw;
    
    if (typeof dataOrRaw === 'string') {
      if (!dataOrRaw.trim()) {
        throw new Error('Empty response received from server');
      }

      if (__DEV__) {
        console.log(`[${contextName}] Raw API response:`, dataOrRaw);
      }

      const cleaned = cleanForJsonParse(dataOrRaw);
      
      if (__DEV__) {
        console.log(`[${contextName}] Cleaned for JSON parse:`, cleaned);
      }

      try {
        data = JSON.parse(cleaned);
      } catch (parseError) {
        throw new Error(`JSON parse error: ${parseError.message}`);
      }

      if (__DEV__) {
        console.log(`[${contextName}] Parsed object:`, data);
      }
    }

    if (!data) {
      throw new Error('No data received from server');
    }

    // Validate data if validator is provided
    if (validator) {
      validator(data);
    }

    return data;
  } catch (error) {
    console.error(`[${contextName}] Error parsing JSON:`, error);
    throw error;
  }
}

// Validation utilities for different contexts
export const validators = {
  coreCompanyDetails: (data) => {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data: Object is null or not an object');
    }

    const requiredFields = [
      'name', 'description', 'founded', 'headquarters', 'size',
      'industry', 'website', 'socialMedia', 'keyPeople', 'funding',
      'acquisitions', 'products', 'awards', 'certifications',
      'partnerships', 'competitors', 'recentNews'
    ];

    const missingFields = requiredFields.filter(field => !data[field]);
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
  },

  interviewExperience: (data) => {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data: Object is null or not an object');
    }

    const requiredFields = [
      'journey', 'candidateExperiences', 'technicalQuestions',
      'roleSpecificQuestions', 'behavioralQuestions', 'questionStats',
      'mockInterviewTips'
    ];

    const missingFields = requiredFields.filter(field => !data[field]);
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
  },

  waysToGetIn: (data) => {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data: Object is null or not an object');
    }

    const requiredFields = [
      'campusRecruitment', 'jobPortals', 'referrals', 'hackathons',
      'coldOutreach', 'internshipConversion', 'contractRoles'
    ];

    const missingFields = requiredFields.filter(field => !data[field]);
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
  },

  techStack: (data) => {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data: Object is null or not an object');
    }

    const requiredFields = [
      'frontend', 'backend', 'cloud', 'database', 'analytics', 'team'
    ];

    const missingFields = requiredFields.filter(field => !data[field]);
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
  },

  workCulture: (data) => {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data: Object is null or not an object');
    }

    const requiredFields = [
      'cultureOverview', 'workLifeBalance', 'remoteWork', 'teamCollaboration',
      'mentalHealth', 'diversity', 'employeeStories'
    ];

    const missingFields = requiredFields.filter(field => !data[field]);
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
  },

  jobHiring: (data) => {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data: Object is null or not an object');
    }

    const requiredFields = [
      'commonRoles', 'internshipConversion', 'hiringChannels', 'jobTrends',
      'hiringTimeline', 'hiringProcess', 'resumeTips'
    ];

    const missingFields = requiredFields.filter(field => !data[field]);
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
  },

  news: (data) => {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data: Object is null or not an object');
    }

    const requiredFields = ['headlines', 'socialSentiment', 'highlights', 'studentImpact'];
    const missingFields = requiredFields.filter(field => !data[field]);
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
  }
}; 