from fastapi import FastAPI,BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from backend.ai_integrater import gem
from backend.model import mes
from backend.get_all_models import get_model_name
from backend.query import save_message
from backend.rag_lang import similirity,add_documents
from backend.postgress_memory import init_db
from backend.querer_for_seeing_number_of_messages import no_of_messages
app = FastAPI()



app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # your frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    await init_db()

@app.post("/api/req", tags=['gateway'])
async def get_respons(query:mes,bg: BackgroundTasks):
    if not query.mess:
        return {"Success": False,"msg": "No query sent query"}
        
    if len(query.mess) > 1000:
        return {"Success": False,"msg": "Too big promt"}
    try:
        await save_message(role="user",content=query.mess)
        promt = await similirity(query.mess)
        result = await gem(promt,query.model)
        await save_message(role="assistant",content=result)
        bg.add_task(add_documents,query.mess,result)
        bg.add_task(no_of_messages)
        return {"Success": True,"response": result}
    except Exception as e:
        print(e)
        return {"Success": True,"response": "Somting wrong in backend"}

@app.get("/api/all_models_name", tags=['model_name'])
async def get_models():
    try:
        result = await get_model_name()
        return {"models_name": result}
    except Exception as e:
        print(e)
        return {"Success": False, "msg": "somting went wrong with this api all_models check it it might be api or other issues"}
    
    