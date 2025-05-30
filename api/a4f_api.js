import OpenAI from 'openai';

const a4fApiKey = "ddc-a4f-7132f706565644e3a56187c91c66d168";
const a4fBaseUrl = 'https://api.a4f.co/v1';

const a4fClient = new OpenAI({
  apiKey: a4fApiKey,
  baseURL: a4fBaseUrl,
});

export const getCompanyWaysToGetIn = async (companyName) => {
  const systemPrompt = `You are an AI assistant that provides detailed information about how to get into specific companies.
  Focus on the following entry ways: Campus Recruitment, Job Portals, Referrals, Hackathons, Cold Outreach, Internship Conversion, and Contract Roles.`;

  const userPrompt = `Please provide detailed information about how to get into ${companyName}. Include:

1. Campus Recruitment:
   - Which universities they typically recruit from
   - Their typical recruitment timeline
   - Any specific programs they offer

2. Job Portals:
   - Which platforms they primarily use
   - Types of roles typically posted
   - Any specific job portal strategies

3. Referral Process:
   - How their referral system works
   - Best practices for seeking referrals
   - Success rate of referrals

4. Hackathons & Competitions:
   - Do they organize any specific hackathons
   - Which competitions they typically sponsor
   - Success stories from past events

5. Cold Outreach:
   - Best channels for reaching out
   - Key people to connect with
   - Template customization tips

6. Internship Conversion:
   - Internship programs available
   - Conversion rate to full-time
   - Tips for successful conversion

7. Contract Roles:
   - Available contract opportunities
   - Typical contract duration
   - Conversion possibilities to full-time

Please provide specific, actionable information that would be most helpful for someone trying to join ${companyName}.`;

  try {
    const response = await a4fClient.chat.completions.create({
      model: "provider-2/r1-1776",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error getting company ways to get in:', error);
    throw error;
  }
};

// Example usage
// getCompanyWaysToGetIn("Google").then(console.log).catch(console.error);