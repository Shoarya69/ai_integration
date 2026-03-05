import aio_pika
import json
from dotenv import load_dotenv
import os
load_dotenv()
RABBIT_URL = os.getenv("Rabbit_url")

async def publish_summary_task(user_id: int=1):

    connection = await aio_pika.connect_robust(RABBIT_URL)
    channel = await connection.channel()

    await channel.declare_queue("summary_queue", durable=True)

    message = {
        "user_id": user_id
    }

    await channel.default_exchange.publish(
        aio_pika.Message(
            body=json.dumps(message).encode(),
            delivery_mode=aio_pika.DeliveryMode.PERSISTENT
        ),
        routing_key="summary_queue"
    )

    await connection.close()