import os
from dotenv import load_dotenv
from groq import AsyncGroq
load_dotenv()

api_key = os.getenv("GROQ_API_KEY")

client = AsyncGroq(
        api_key=api_key,
    )
async def gem(mess: str):
    if not api_key:
     raise ValueError("GROQ_API_KEY not found in environment variables")

    chat_completion = await client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": "You are an AI assistant named Nordix AI. If anyone asks your name or asks 'how are you', reply that you are Nordix AI and respond politely."
            },
            {
                "role": "user",
                "content": mess
            }
        ],
        model="llama-3.3-70b-versatile",
    )

    # print(chat_completion.choices[0].message.content)
    return chat_completion.choices[0].message.content