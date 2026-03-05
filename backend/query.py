from backend.postgress_memory import execute,fetch
from datetime import datetime

async def save_message(role,content,user_id = 1):

    await execute(
        """
        INSERT INTO messages (user_id, role,content)
        VALUES ($1,$2,$3)
        """,
        user_id,
        role,
        content
    )

async def save_Summery(s_id,e_id,summery):

    await execute(
        """
        INSERT INTO chat_summaries (starting_chat_id ,ending_chat_id ,summary)
        VALUES ($1,$2,$3)
        """,
        s_id,
        e_id,
        summery
    )


async def histroy_fetch(user_id: int = 1, limit: int = 10,with_id: bool = False):
    result = await fetch(
        """
        SELECT id, role, content
                FROM messages
                WHERE user_id=$1
                ORDER BY id DESC
                LIMIT $2

    """, 
    user_id,
    limit
    )

    history = ""
    
    for r in reversed(result):
        history += f"{r['role']}: {r['content']}\n"
    if with_id :
        ids = [row["id"] for row in result]
        return history, ids
    return history


async def last_summery():
    result = await fetch(
        """
        SELECT summary
        FROM chat_summaries
        ORDER BY id DESC
        LIMIT $1
        """,
        1
    )
    if not result:
        return None
    return result if result else "No summery right now"