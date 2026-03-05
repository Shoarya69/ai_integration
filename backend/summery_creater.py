#this file create summery of content through which i can give it to my ai model for less token conhujuption
from backend.query import histroy_fetch,save_Summery,last_summery
from backend.ai_integrater import gem

async def create_summery():
    result,id = await histroy_fetch(with_id=True)
    last_sum = await last_summery()

    if not result or not id:
        return None
    prompt = f"""
        Summarize the conversation below.

        Rules:
        - Maximum 200 words
        - Maximum 50 lines
        - Keep important facts
        - Remove small talk
        - Preserve technical details

        Previous Summary:
        {last_sum}

        New Conversation:
        {result}
        """
    summery = await gem(prompt,"llama-3.1-8b-instant",temp=0.1,max_token=300)
    
    await save_Summery(s_id=id[0],e_id=id[-1],summery=summery)