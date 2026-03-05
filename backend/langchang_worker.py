from langchain_community.vectorstores.pgvector import PGVector
import urllib.parse
from langchain_huggingface import HuggingFaceEmbeddings
from dotenv import load_dotenv
import os
load_dotenv()

user = os.getenv("pg_user")
password= os.getenv("pg_pass")
database= os.getenv("pg_db")
host = os.getenv("pg_host")
port = os.getenv("pg_port")

encoded_password = urllib.parse.quote_plus(password)

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

vectorstore = PGVector(
    connection_string=f"postgresql://{user}:{encoded_password}@{host}:{port}/{database}",
    embedding_function=embeddings
)