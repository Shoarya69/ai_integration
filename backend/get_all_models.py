import requests
import os
from dotenv import load_dotenv
import httpx

load_dotenv()

api_key = os.environ.get("GROQ_API_KEY")
url = "https://api.groq.com/openai/v1/models"

headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}


async def get_model_name():
    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)
    models = response.json()
    names = [m["id"] for m in models["data"]]
    return names


