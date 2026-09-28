import requests

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: list[Message]


SYSTEM_PROMPT = """
You are a helpful customer support AI assistant.

Your job is to help customers clearly, politely, and efficiently.

Rules:
- Be friendly and professional.
- Keep answers relatively concise.
- If you do not know something, say that you do not know.
- Never invent company policies, prices, refunds, delivery times, or other facts.
- Ask a clarifying question when the customer's request is unclear.
- Give step-by-step instructions when they are useful.
"""


@app.get("/")
def home():
    return {
        "message": "Customer Support AI is running"
    }


@app.post("/api/chat")
def chat(request: ChatRequest):

    conversation = SYSTEM_PROMPT + "\n\n"

    for message in request.messages:
        if message.role == "user":
            conversation += f"Customer: {message.content}\n"
        else:
            conversation += f"Support AI: {message.content}\n"

    conversation += "\nSupport AI:"

    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "llama3.2:3b",
            "prompt": conversation,
            "stream": False
        }
    )

    response.raise_for_status()

    data = response.json()

    return {
        "reply": data["response"]
    }