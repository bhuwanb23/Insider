import { getCompanyAnalysisPrompt, getCompanyCulturePrompt, getCoreCompanyDetailsPrompt, getCompanyInterviewExperiencePrompt, getCompanyJobHiringInsightsPrompt, getCompanyNewsHighlightsPrompt, getCompanyTechStackPrompt } from './prompts.js';


// OpenRouter API config
// const OPENROUTER_API_KEY = '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';
// const OPENROUTER_API_KEY = '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';
const OPENROUTER_API_KEY = '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';
const OPENROUTER_SITE_URL = process.env.OPENROUTER_SITE_URL || '';
const OPENROUTER_SITE_NAME = process.env.OPENROUTER_SITE_NAME || '';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const OPENROUTER_MODEL = 'meta-llama/llama-3.3-8b-instruct:free';

// Helper function to clean markdown code blocks from response
const cleanJsonResponse = (response) => {
    // Return raw response for context files to handle parsing
    return response;
};

// OpenRouter API call helper
const makeOpenRouterApiCall = async (prompt, label) => {
    try {
        const res = await fetch(OPENROUTER_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'HTTP-Referer': OPENROUTER_SITE_URL,
                'X-Title': OPENROUTER_SITE_NAME,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: OPENROUTER_MODEL,
                messages: [
                    { role: 'user', content: prompt }
                ]
            })
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error(`HTTP error for ${label}:`, res.status, errorText);
            throw new Error(`HTTP error ${res.status}: ${errorText}`);
        }

        const data = await res.json();

        // Check for OpenRouter error structure
        if (data.error) {
            console.error(`OpenRouter error for ${label}:`, data.error);
            throw new Error(`OpenRouter error: ${data.error.message || JSON.stringify(data.error)}`);
        }

        const responseContent = data.choices?.[0]?.message?.content;
        if (!responseContent) {
            console.error(`No content in OpenRouter response for ${label}:`, JSON.stringify(data));
            throw new Error(`No content in OpenRouter response for ${label}`);
        }

        console.log(`Raw ${label} API Response received`);
        // Return raw response content for context files to handle parsing
        return responseContent;
    } catch (error) {
        console.error(`Error getting ${label}:`, error);
        throw error;
    }
};

// // Test the API connection
// export const testApiConnection = async () => {
//     try {
//         const testCompletion = await client.chat.completions.create({
//             model: "provider-4/claude-3.7-sonnet",
//             messages: [
//                 { role: "user", content: "Hello! Give me a short response." }
//             ]
//         });
//         console.log("Test response:", testCompletion.choices[0].message.content);
//         return true;
//     } catch (error) {
//         console.error("Test API call failed:", error);
//         return false;
//     }
// };

export const getCompanyWaysToGetIn = async (companyName) => {
    console.log(`Fetching ways to get in data for company: ${companyName}`);
    const prompt = getCompanyAnalysisPrompt(companyName);
    return makeOpenRouterApiCall(prompt, 'Ways to Get In');
};

export const getCompanyCulture = async (companyName) => {
    console.log(`Fetching culture data for company: ${companyName}`);
    const prompt = getCompanyCulturePrompt(companyName);
    return makeOpenRouterApiCall(prompt, 'Culture');
};

export const getCoreCompanyDetails = async (companyName) => {
    console.log(`Fetching core company details for company: ${companyName}`);
    const prompt = getCoreCompanyDetailsPrompt(companyName);
    return makeOpenRouterApiCall(prompt, 'Core Company Details');
};

export const getCompanyInterviewExperience = async (companyName) => {
    console.log(`Fetching interview experience for company: ${companyName}`);
    const prompt = getCompanyInterviewExperiencePrompt(companyName);
    return makeOpenRouterApiCall(prompt, 'Interview Experience');
};

export const getCompanyJobHiringInsights = async (companyName) => {
    console.log(`Fetching job hiring insights for company: ${companyName}`);
    const prompt = getCompanyJobHiringInsightsPrompt(companyName);
    return makeOpenRouterApiCall(prompt, 'Job Hiring Insights');
};

export const getCompanyNewsHighlights = async (companyName) => {
    console.log(`Fetching news highlights for company: ${companyName}`);
    const prompt = getCompanyNewsHighlightsPrompt(companyName);
    return makeOpenRouterApiCall(prompt, 'News Highlights');
};

export const getCompanyTechStack = async (companyName) => {
    console.log(`Fetching tech stack for company: ${companyName}`);
    const prompt = getCompanyTechStackPrompt(companyName);
    return makeOpenRouterApiCall(prompt, 'Tech Stack');
};
