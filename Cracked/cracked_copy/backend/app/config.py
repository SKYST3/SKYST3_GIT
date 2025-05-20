from dotenv import load_dotenv
import os

load_dotenv()

UPLOAD_FOLDER = 'data/uploads'

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

DATABASE_URL = "sqlite:///./data/database.db"