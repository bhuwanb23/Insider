from openai import OpenAI
from prompts import get_company_analysis_prompt, get_company_culture_prompt

a4f_api_key = "ddc-a4f-7132f706565644e3a56187c91c66d168"
a4f_base_url = "https://api.a4f.co/v1"

client = OpenAI(
    api_key=a4f_api_key,
    base_url=a4f_base_url,
)

# First, let's test with a simple request
try:
    test_completion = client.chat.completions.create(
        model="provider-4/claude-3.7-sonnet",
        messages=[
            {"role": "user", "content": "Hello! Give me a short response."}
        ]
    )
    print("Test response:", test_completion.choices[0].message.content)
except Exception as e:
    print(f"Test API call failed: {str(e)}")

def get_company_ways_to_get_in(company_name: str):
    try:
        completion = client.chat.completions.create(
            model="provider-4/claude-3.7-sonnet",
            messages=[
                {"role": "user", "content": get_company_analysis_prompt(company_name)}
            ]
        )
        return completion.choices[0].message.content
    except Exception as e:
        print(f"Error getting company ways to get in: {str(e)}")
        return None

def get_company_culture(company_name: str):
    try:
        completion = client.chat.completions.create(
            model="provider-4/claude-3.7-sonnet",
            messages=[
                {"role": "user", "content": get_company_culture_prompt(company_name)}
            ]
        )
        return completion.choices[0].message.content
    except Exception as e:
        print(f"Error getting company culture: {str(e)}")
        return None

# Only run the main function if the test was successful
if 'test_completion' in locals():
    try:
        result = get_company_ways_to_get_in("HappyFox")
        if result:
            print("\nCompany information:")
            print(result)
        else:
            print("Failed to get company information")
    except Exception as e:
        print(f"Error in main execution: {str(e)}")