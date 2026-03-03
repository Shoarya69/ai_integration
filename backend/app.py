from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.ai_integrater import gem
from backend.model import mes
app = FastAPI()



app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # your frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/req", tags=['gatway'])
async def get_respons(query:mes):
    if not query.mess:
        return {"error": "No query sent query"}
    try:
        result = await gem(query.mess)
    except Exception as e:
        print(e)
    print(result)
    return {"response": result}