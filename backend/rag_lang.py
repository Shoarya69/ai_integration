from backend.langchang_worker import vectorstore
from backend.query import histroy_fetch,last_summery
async def add_documents(question,answer):
    texts = [question, answer]
    metadatas = [
        {"role": "user"},
        {"role": "assistant"}
    ]
    await vectorstore.aadd_texts(texts=texts,metadatas=metadatas)


async def similirity(msg: str):
    docs = await vectorstore.asimilarity_search(msg, k=3)
    histroy = await histroy_fetch(limit=10)
    last_sum = await last_summery()
    context = "\n".join([d.page_content for d in docs])

    prompt = f"""
        Chat History:
        {histroy}

        Last_Summery:
        {last_sum}

        Context:
        {context}

        Question:
        {msg}
        """
    return prompt



