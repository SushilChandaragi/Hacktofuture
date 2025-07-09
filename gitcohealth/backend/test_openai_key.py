import openai
import os
from dotenv import load_dotenv

# Load .env and set API key
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
openai.api_key = api_key

def test_openai_key():
    try:
        # For openai>=1.0.0, use the new API
        client = openai.OpenAI(api_key=api_key)
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": "Say hello!"}
            ],
            max_tokens=10
        )
        print("OpenAI API key works! Response:")
        print(response.choices[0].message.content)
    except Exception as e:
        print("OpenAI API key failed or is invalid.")
        print("Error:", e)

if __name__ == "__main__":
    test_openai_key()
