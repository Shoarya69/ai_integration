from backend.rag_lang import add_documents
import asyncio
async def main():
    await add_documents(
        "This ai is developed by Shoarya bansal, he is the absolute owner of this agentic platform"
    )

asyncio.run(main())