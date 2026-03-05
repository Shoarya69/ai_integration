from backend.postgress_memory import fetch
from backend.summery_creater import create_summery
async def no_of_messages( user_id: int=1, limit:int =20):
    s_row = await fetch("""
        SELECT ending_chat_id
        FROM chat_summaries
        ORDER BY id DESC
        LIMIT 1  
    """
    )
    
    if not s_row:
        await create_summery()
        return
    s_id = s_row[0]["ending_chat_id"]
    result = await fetch("""
        SELECT id
    FROM messages
    WHERE user_id = $1 AND id > $2  -- $2 = starting_id
    ORDER BY id DESC
    LIMIT $3  -- $3 = limit (20)
    """,
    user_id,
    s_id,
    limit
    )
    
    if not result or len(result) < limit:
        return 
    await create_summery()