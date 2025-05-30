import OpenAI from 'openai';
import { getCompanyAnalysisPrompt, getCompanyCulturePrompt } from './prompts.js';

const a4fApiKey = "ddc-a4f-7132f706565644e3a56187c91c66d168";
const a4fBaseUrl = 'https://api.a4f.co/v1';

const client = new OpenAI({
    apiKey: a4fApiKey,
    baseURL: a4fBaseUrl,
});

// Test the API connection
export const testApiConnection = async () => {
    try {
        const testCompletion = await client.chat.completions.create({
            model: "provider-4/claude-3.7-sonnet",
            messages: [
                { role: "user", content: "Hello! Give me a short response." }
            ]
        });
        console.log("Test response:", testCompletion.choices[0].message.content);
        return true;
    } catch (error) {
        console.error("Test API call failed:", error);
        return false;
    }
};

export const getCompanyWaysToGetIn = async (companyName) => {
    try {
        const completion = await client.chat.completions.create({
            model: "provider-4/claude-3.7-sonnet",
            messages: [
                { role: "user", content: getCompanyAnalysisPrompt(companyName) }
            ],
            temperature: 0.7,
            max_tokens: 1000
        });
        return completion.choices[0].message.content;
    } catch (error) {
        console.error('Error getting company ways to get in:', error);
        throw error;
    }
};

export const getCompanyCulture = async (companyName) => {
    try {
        const completion = await client.chat.completions.create({
            model: "provider-4/claude-3.7-sonnet",
            messages: [
                { role: "user", content: getCompanyCulturePrompt(companyName) }
            ],
            temperature: 0.7,
            max_tokens: 1000
        });
        return completion.choices[0].message.content;
    } catch (error) {
        console.error('Error getting company culture:', error);
        throw error;
    }
};

// Example usage
// const init = async () => {
//     if (await testApiConnection()) {
//         try {
//             const result = await getCompanyWaysToGetIn("Google");
//             console.log("\nCompany information:");
//             console.log(result);
//         } catch (error) {
//             console.error("Error in main execution:", error);
//         }
//     }
// };
// 
// init(); 