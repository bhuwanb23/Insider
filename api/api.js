import { getCompanyAnalysisPrompt, getCompanyCulturePrompt, getCoreCompanyDetailsPrompt, getCompanyInterviewExperiencePrompt, getCompanyJobHiringInsightsPrompt, getCompanyNewsHighlightsPrompt, getCompanyTechStackPrompt } from './prompts.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// OpenRouter API config
export const API_KEY_STORAGE_KEY = 'openrouter_api_key';
export const API_REQUEST_COUNT_KEY = 'openrouter_api_request_count'; // New storage key for the counter
    
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
// const OPENROUTER_MODEL = 'meta-llama/llama-3.3-8b-instruct:free';
const OPENROUTER_MODEL = 'deepseek/deepseek-chat-v3-0324:free';

// Function to increment API request count
const incrementApiRequestCount = async () => {
    try {
        let currentCount = await AsyncStorage.getItem(API_REQUEST_COUNT_KEY);
        currentCount = currentCount ? parseInt(currentCount, 10) + 1 : 1;
        await AsyncStorage.setItem(API_REQUEST_COUNT_KEY, currentCount.toString());
    } catch (error) {
        console.error('Failed to increment API request count', error);
    }
};

// Helper function to clean markdown code blocks from response
const cleanJsonResponse = (response) => {
    // Return raw response for context files to handle parsing
    return response;
};

// OpenRouter API call helper
const makeOpenRouterApiCall = async (prompt, label) => {
    try {
        const storedApiKey = await AsyncStorage.getItem(API_KEY_STORAGE_KEY);
        const currentApiKey = storedApiKey || OPENROUTER_API_KEY_FALLBACK;

        if (!currentApiKey) {
            throw new Error('No API key found. Please set your OpenRouter API key in Settings.');
        }

        // Check if it's just the fallback key and no stored key
        if (!storedApiKey && currentApiKey === OPENROUTER_API_KEY_FALLBACK) {
            throw new Error('Please set up your own OpenRouter API key in Settings to continue.');
        }

        const res = await fetch(OPENROUTER_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${currentApiKey}`,
                // 'HTTP-Referer': OPENROUTER_SITE_URL,
                // 'X-Title': OPENROUTER_SITE_NAME,
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

        // Increment the counter on successful API response
        await incrementApiRequestCount();

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
