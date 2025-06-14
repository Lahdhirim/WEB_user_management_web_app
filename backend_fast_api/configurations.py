from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from urllib.parse import quote_plus
from dotenv import load_dotenv
import os

# load environment variables from .env file
load_dotenv()
user = os.getenv("MONGO_USER")
password = quote_plus(os.getenv("MONGO_PASSWORD"))
db_name = os.getenv("MONGO_DB_FASTAPI")
uri = f"mongodb+srv://{user}:{password}@cluster0.v3u3f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Get the database
db = client[db_name]

# Get the collection of users
users_collection = db['users']