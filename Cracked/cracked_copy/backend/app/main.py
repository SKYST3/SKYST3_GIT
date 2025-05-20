# app/main.py

from fastapi import FastAPI
import os
from fastapi.middleware.cors import CORSMiddleware
from app.router import user, grave, chat
app = FastAPI(debug=True)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(user.router, prefix="/api/users", tags=["User"])
app.include_router(grave.router, prefix="/api/grave", tags=["Grave"])
app.include_router(chat.router, prefix="/api/chat", tags=["Chat"])

# app.include_router(llm_crews_api.router, prefix="/api/crews", tags=["LLM Crews V"])

if __name__ == "__main__":
    import uvicorn

    server_domain = "localhost"
    port = 8000
    print(server_domain, port)
    uvicorn.run("app.main:app", host=server_domain, port=int(port), reload=True)