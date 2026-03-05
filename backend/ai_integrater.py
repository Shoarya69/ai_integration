import os
from dotenv import load_dotenv
from groq import AsyncGroq
load_dotenv()

api_key = os.getenv("GROQ_API_KEY")
promt = os.getenv("system_promt")

client = AsyncGroq(
        api_key=api_key,
    )
async def gem(mess: str, model: str, temp: int = 0.6, max_token: int = 1000):
    if not api_key:
     raise ValueError("GROQ_API_KEY not found in environment variables")

    chat_completion = await client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": promt
            },
            {
                "role": "user",
                "content": mess
            }
        ],
        model=model,
        temperature=temp,
        max_tokens=max_token
    )

    # print(chat_completion.choices[0].message.content)
    return chat_completion.choices[0].message.content