import requests
import json
import re

response = requests.post(
  url="https://openrouter.ai/api/v1/chat/completions",
  headers={
    "Authorization": "Bearer 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",
    "Content-Type": "application/json",
  },
  data=json.dumps({
    "model": "meta-llama/llama-3.3-8b-instruct:free",
    "messages": [
      {
        "role": "user",
        "content": """
        Analyze the latest news and highlights for meta and provide information in the following EXACT JSON structure:

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

Ensure all information is specific to meta, accurate, and follows this exact structure. Use real examples and maintain consistent formatting.
"""
      }
    ],
    
  })
)
# Parse the response
response_json = response.json()
content = response_json["choices"][0]["message"]["content"]

# Extract JSON from between triple backticks
json_str = re.search(r'```([\s\S]*?)```', content, re.DOTALL).group(1)
news_data = json.loads(json_str)

# Print each section individually
print("\nHeadlines:")
for headline in news_data["headlines"]:
    print(f"- {headline['title']} ({headline['date']})")
    print(f"  Source: {headline['source']}")
    print(f"  Summary: {headline['summary']}")
    print(f"  URL: {headline['url']}\n")

print("\nSocial Sentiment:")
print(f"Overall: Positive {news_data['socialSentiment']['overall']['positive']}, "
      f"Neutral {news_data['socialSentiment']['overall']['neutral']}, "
      f"Negative {news_data['socialSentiment']['overall']['negative']}")

print("\nHighlights:")
for highlight in news_data["highlights"]:
    print(f"- {highlight['title']} ({highlight['category']})")
    print(f"  {highlight['description']}\n")

print("\nStudent Impact:")
for impact in news_data["studentImpact"]:
    print(f"- {impact['title']}")
    print(f"  {impact['description']}")
    print(f"  Impact: {impact['impact']}\n")
