import asyncpg
from dotenv import load_dotenv
import os

load_dotenv()

user = os.getenv("pg_user")
password= os.getenv("pg_pass")
database= os.getenv("pg_db")
host = os.getenv("pg_host")
port = os.getenv("pg_port")


DB_CONFIG = {
    "user": user,
    "password": password,
    "database": database,
    "host": host,
    "port": port,
    "min_size": 5,
    "max_size": 10
}

async def init_db():
    global pool
    pool = await asyncpg.create_pool(**DB_CONFIG)


async def execute(query, *args):
    async with pool.acquire() as conn:
        return await conn.execute(query, *args)


async def fetch(query, *args):
    async with pool.acquire() as conn:
        return await conn.fetch(query, *args)


async def fetchrow(query, *args):
    async with pool.acquire() as conn:
        return await conn.fetchrow(query, *args)

# async def test_db():
#     conn = await get_connection()

#     rows = await conn.fetch("SELECT * FROM messages")

#     print(rows)

#     await conn.close()

# asyncio.run(test_db())