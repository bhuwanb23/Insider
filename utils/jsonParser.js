// Centralized JSON parsing utility for all context files

// Clean and parse JSON responses from OpenRouter
export function cleanForJsonParse(str) {
  if (!str || typeof str !== 'string') {
    throw new Error('Invalid input: Expected string');
  }

  let cleaned = str;
  try {
    // Step 1: Pre-processing cleanup
    // Remove markdown code block indicators
    cleaned = cleaned.replace(/```json\n?|```\n?/g, '');
    // Remove BOM and other invisible characters
    cleaned = cleaned.replace(/^\uFEFF/, '');
    // Normalize all quote-like characters to standard double quotes
    cleaned = cleaned.replace(/[`'""]/g, '"');

    // Step 2: Robustly handle content within double-quoted strings:
    // Escape newlines and aggressively escape all internal double quotes.
    cleaned = cleaned.replace(/"(.*?)"/g, function(match, content) {
      // Escape all special characters within string content
      content = content
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\t/g, '\\t')
        .replace(/\f/g, '\\f')
        .replace(/\\b/g, '') // Remove escaped word boundaries
        .replace(/\b/g, '') // Remove word boundaries
        .replace(/`/g, '') // Remove backticks
        .replace(/\\(?=[^"\\])/g, '\\\\') // Escape backslashes not followed by quotes
        .replace(/"/g, '\\"');
      return '"' + content + '"';
    });

    // Step 3: Remove template literals and their backticks
    cleaned = cleaned.replace(/`[^`]*`/g, function(match) {
      return '"' + match.slice(1, -1).replace(/"/g, '\\"') + '"';
    });

    // Step 3: Remove all other newlines and carriage returns (should only be outside strings now).
    cleaned = cleaned.replace(/([^\\])(\r\n|\n|\r)/gm, '$1');

    // Step 4: Remove various non-JSON compliant elements and artifacts.
    // Remove all types of comments (single-line // and multi-line /* */).
    cleaned = cleaned.replace(/\/\*[^]*?\*\/|(?<!:)\/\/[^\n]*(\r?\n|$)/gm, '');
    // Remove parenthetical notes after URLs or values.
    cleaned = cleaned.replace(/"\s*\([^)]*\)\s*"/g, '"');
    cleaned = cleaned.replace(/\s*\([^)]*\)\s*(,|$)/g, '$1');
    // Remove invalid triple quotes and handle special values.
    cleaned = cleaned.replace(/"{3,}/g, '"');
    cleaned = cleaned.replace(/,\s*,+/g, ',');
    cleaned = cleaned.replace(/\bNone\b/g, 'null');
    cleaned = cleaned.replace(/\bTrue\b/g, 'true');
    cleaned = cleaned.replace(/\bFalse\b/g, 'false');
    cleaned = cleaned.replace(/\bundefined\b/g, 'null');
    cleaned = cleaned.replace(/\bNaN\b/g, 'null');
    // Remove any invalid control characters.
    cleaned = cleaned.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');

    // Step 5: Apply structural JSON fixes.
    // Remove trailing commas before closing brackets/braces.
    cleaned = cleaned.replace(/,\s*([}\]])/g, '$1');
    // Remove trailing commas before nested objects/arrays.
    cleaned = cleaned.replace(/,\s*([\[{])/g, '$1');
    // Quote unquoted numeric ranges.
    cleaned = cleaned.replace(/([:\[,])\s*([0-9]+-[0-9]+)(\s*[,}\]])/g, '$1"$2"$3');
    // Fix array syntax errors (remove leading/trailing commas directly within array brackets).
    cleaned = cleaned.replace(/,\s*]/g, ']');
    cleaned = cleaned.replace(/\[\s*,/g, '[');
    // Insert missing commas between adjacent JSON objects or arrays.
    cleaned = cleaned.replace(/}\s*{/g, '},{');
    cleaned = cleaned.replace(/\]\s*\[/g, '],[');
    // Attempt to quote unquoted property names.
    cleaned = cleaned.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');
    // Ensure no multiple spaces after commas or colons.
    cleaned = cleaned.replace(/([,:])\s+/g, '$1 ');
    // Trim outer whitespace.
    cleaned = cleaned.trim();

    // Step 6: Extract only the JSON part (from first { to last }).
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
// Enhanced parseJsonResponse function
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
        console.log(`[${contextName}] Cleaned for JSON parse:`);
      }

      try {
        data = JSON.parse(cleaned);
      } catch (parseError) {
        throw new Error(`JSON parse error: ${parseError.message}\nCleaned content: ${cleaned}`);
      }

      if (__DEV__) {
        console.log(`[${contextName}] Parsed object:`, data);
      }
    }

    if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
      throw new Error('Empty or invalid data structure received from server');
    }

    // Enhanced validation with detailed error reporting
    if (validator) {
      try {
        validator(data);
      } catch (validationError) {
        throw new Error(`Validation error for ${contextName}: ${validationError.message}\nReceived data: ${JSON.stringify(data, null, 2)}`);
      }
    }

    return data;
  } catch (error) {
    console.error(`[${contextName}] Error parsing JSON:`, error);
    throw error;
  }
}

// Enhanced validation utilities with type checking and data structure validation
export const validators = {
  coreCompanyDetails: (data) => {
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      throw new Error('Invalid data: Expected a non-null object');
    }

    const requiredFields = {
      name: 'string',
      description: 'string',
      founded: ['string', 'number'],
      headquarters: 'string',
      size: ['string', 'number'],
      industry: 'string',
      website: 'string',
      socialMedia: 'object',
      keyPeople: 'array',
      funding: ['object', 'array'],
      acquisitions: 'array',
      products: 'array',
      awards: ['array', 'object'],
      certifications: 'array',
      partnerships: 'array',
      competitors: 'array',
      recentNews: 'array'
    };

    Object.entries(requiredFields).forEach(([field, expectedType]) => {
      if (!(field in data)) {
        throw new Error(`Missing required field: ${field}`);
      }

      const types = Array.isArray(expectedType) ? expectedType : [expectedType];
      const valueType = Array.isArray(data[field]) ? 'array' : typeof data[field];
      if (!types.includes(valueType)) {
        throw new Error(`Invalid type for ${field}: expected ${types.join(' or ')}, got ${valueType}`);
      }
    });
  },

  interviewExperience: (data) => {
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      throw new Error('Invalid data: Expected a non-null object');
    }

    const requiredFields = {
      journey: 'object',
      candidateExperiences: 'array',
      technicalQuestions: 'array',
      roleSpecificQuestions: 'array',
      behavioralQuestions: 'array',
      questionStats: 'object',
      mockInterviewTips: ['array', 'object']
    };

    Object.entries(requiredFields).forEach(([field, expectedType]) => {
      if (!(field in data)) {
        throw new Error(`Missing required field: ${field}`);
      }

      const types = Array.isArray(expectedType) ? expectedType : [expectedType];
      const valueType = Array.isArray(data[field]) ? 'array' : typeof data[field];
      if (!types.includes(valueType)) {
        throw new Error(`Invalid type for ${field}: expected ${types.join(' or ')}, got ${valueType}`);
      }
    });
  },

  waysToGetIn: (data) => {
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      throw new Error('Invalid data: Expected a non-null object');
    }

    const requiredFields = {
      campusRecruitment: 'object',
      jobPortals: 'object'
    };

    const optionalFields = {
      referrals: 'object',
      hackathons: 'object',
      coldOutreach: 'object',
      internshipConversion: 'object',
      contractRoles: 'object'
    };

    // Validate required fields
    Object.entries(requiredFields).forEach(([field, expectedType]) => {
      if (!(field in data)) {
        throw new Error(`Missing required field: ${field}`);
      }

      const types = Array.isArray(expectedType) ? expectedType : [expectedType];
      const valueType = Array.isArray(data[field]) ? 'array' : typeof data[field];
      if (!types.includes(valueType)) {
        throw new Error(`Invalid type for ${field}: expected ${types.join(' or ')}, got ${valueType}`);
      }
    });

    // Validate optional fields if present
    Object.entries(optionalFields).forEach(([field, expectedType]) => {
      if (field in data) {
        const types = Array.isArray(expectedType) ? expectedType : [expectedType];
        const valueType = Array.isArray(data[field]) ? 'array' : typeof data[field];
        if (!types.includes(valueType)) {
          throw new Error(`Invalid type for optional field ${field}: expected ${types.join(' or ')}, got ${valueType}`);
        }
      }
    });

    // Validate campusRecruitment structure
    const campusFields = ['title', 'description', 'icon', 'badge', 'details', 'tips'];
    campusFields.forEach(field => {
      if (!(field in data.campusRecruitment)) {
        throw new Error(`Missing required field in campusRecruitment: ${field}`);
      }
    });

    // Validate jobPortals structure
    const jobPortalFields = ['title', 'description', 'icon', 'platforms', 'tips'];
    jobPortalFields.forEach(field => {
      if (!(field in data.jobPortals)) {
        throw new Error(`Missing required field in jobPortals: ${field}`);
      }
    });
  },

  techStack: (data) => {
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      throw new Error('Invalid data: Expected a non-null object');
    }

    const requiredFields = {
      frontend: 'object',
      backend: 'object',
      cloud: 'object',
      database: 'object',
      analytics: 'object',
      team: ['array', 'object']
    };

    Object.entries(requiredFields).forEach(([field, expectedType]) => {
      if (!(field in data)) {
        throw new Error(`Missing required field: ${field}`);
      }

      const types = Array.isArray(expectedType) ? expectedType : [expectedType];
      const valueType = Array.isArray(data[field]) ? 'array' : typeof data[field];
      if (!types.includes(valueType)) {
        throw new Error(`Invalid type for ${field}: expected ${types.join(' or ')}, got ${valueType}`);
      }
    });
  },

  workCulture: (data) => {
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      throw new Error('Invalid data: Expected a non-null object');
    }

    const requiredFields = {
      cultureOverview: 'object',
      workLifeBalance: 'object',
      remoteWork: 'object',
      teamCollaboration: 'object',
      mentalHealth: 'object',
      diversity: 'object',
      employeeStories: 'array'
    };

    Object.entries(requiredFields).forEach(([field, expectedType]) => {
      if (!(field in data)) {
        throw new Error(`Missing required field: ${field}`);
      }

      const types = Array.isArray(expectedType) ? expectedType : [expectedType];
      const valueType = Array.isArray(data[field]) ? 'array' : typeof data[field];
      if (!types.includes(valueType)) {
        throw new Error(`Invalid type for ${field}: expected ${types.join(' or ')}, got ${valueType}`);
      }
    });
  },

  jobHiring: (data) => {
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      throw new Error('Invalid data: Expected a non-null object');
    }

    const requiredFields = {
      commonRoles: 'array',
      internshipConversion: 'object',
      hiringChannels: 'array',
      jobTrends: 'object',
      hiringTimeline: 'object',
      hiringProcess: 'object',
      resumeTips: 'array'
    };

    Object.entries(requiredFields).forEach(([field, expectedType]) => {
      if (!(field in data)) {
        throw new Error(`Missing required field: ${field}`);
      }

      const types = Array.isArray(expectedType) ? expectedType : [expectedType];
      const valueType = Array.isArray(data[field]) ? 'array' : typeof data[field];
      if (!types.includes(valueType)) {
        throw new Error(`Invalid type for ${field}: expected ${types.join(' or ')}, got ${valueType}`);
      }
    });
  },

  news: (data) => {
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      throw new Error('Invalid data: Expected a non-null object');
    }

    const requiredFields = {
      headlines: 'array',
      socialSentiment: 'object',
      highlights: 'array',
      studentImpact: 'object'
    };

    Object.entries(requiredFields).forEach(([field, expectedType]) => {
      if (!(field in data)) {
        throw new Error(`Missing required field: ${field}`);
      }

      const types = Array.isArray(expectedType) ? expectedType : [expectedType];
      const valueType = Array.isArray(data[field]) ? 'array' : typeof data[field];
      if (!types.includes(valueType)) {
        throw new Error(`Invalid type for ${field}: expected ${types.join(' or ')}, got ${valueType}`);
      }
    });
  }
};