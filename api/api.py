from openai import OpenAI

a4f_api_key = "ddc-a4f-7132f706565644e3a56187c91c66d168"
a4f_base_url = "https://api.a4f.co/v1"

client = OpenAI(
    api_key=a4f_api_key,
    base_url=a4f_base_url,
)

completion = client.chat.completions.create(
  model="provider-2/r1-1776",
  messages=[
    {
        "role": "user",
        "content": 
        """
            Find the details of the Happyfox company mentioned below and give me response in the json format
            basicIdentity: {
                name: "TechCorp International",
                logo: "https://example.com/logo.png", // Replace with actual logo URL
                tagline: "Innovating Tomorrow's Technology Today",
                industry: "Information Technology",
                headquarters: "San Francisco, California",
                foundedYear: 2010,
                keyPeople: [
                {
                    name: "Sarah Johnson",
                    role: "CEO",
                    image: "https://example.com/sarah.jpg",
                    linkedIn: "https://linkedin.com/in/sarahjohnson"
                },
                {
                    name: "Michael Chen",
                    role: "CTO",
                    image: "https://example.com/michael.jpg",
                    linkedIn: "https://linkedin.com/in/michaelchen"
                },
                {
                    name: "Michael Chen",
                    role: "CTO",
                    image: "https://example.com/michael.jpg",
                    linkedIn: "https://linkedin.com/in/michaelchen"
                }
                ],
                employees: {
                global: 15000,
                india: 5000
                }
            },
        """
    }
  ]
)
print(completion.choices[0].message.content)