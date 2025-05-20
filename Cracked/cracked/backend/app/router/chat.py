from fastapi import APIRouter, HTTPException, UploadFile, File
from sqlalchemy import func
from app.config import OPENAI_API_KEY
from openai import OpenAI
from pydantic import BaseModel
from sqlalchemy.orm import Session
from fastapi import Depends
from database import get_db
from typing import List
from models import Chat as ChatModel
from models import Session as SessionModel
router = APIRouter()

# response 형식
class Chat(BaseModel):
    id: int
    user_id: str
    session_id: int
    question: str
    answer: str
    order_idx: int

class Session(BaseModel):
    id: int
    user_id: str
    color: str
    x: float
    y: float
    size: float

def Chat_to_dict(chat: ChatModel):
    return {
        "id": chat.id,
        "user_id": chat.user_id,
        "session_id": chat.session_id,
        "question": chat.question,
        "answer": chat.answer,
        "order_idx": chat.order_idx,
        "created_at": chat.created_at
    }

def Session_to_dict(session: SessionModel):
    return {
        "id": session.id,
        "user_id": session.user_id,
        "color": session.color,
        "x": session.x,
        "y": session.y,
        "size": session.size,
        "created_at": session.created_at
    }

# get all session
@router.get("/get_all_session/{user_id}", response_model=List[Session])
def get_all_session(user_id: str, db: Session = Depends(get_db)):
    sessions = db.query(SessionModel).filter(SessionModel.user_id == user_id).all()
    return [Session_to_dict(session) for session in sessions]

# 모든 질문 get
@router.get("/get_all_chat/{user_id}", response_model=List[Chat])
def get_all_chat(user_id: str, session_id: int, db: Session = Depends(get_db)):
    chats = db.query(ChatModel).filter(ChatModel.user_id == user_id, ChatModel.session_id == session_id).all()
    return [Chat_to_dict(chat) for chat in chats]

# session 생성
@router.post("/create_session/{user_id}", response_model=Session)
def create_session(user_id: str, color: str, x: float, y: float, size: float, db: Session = Depends(get_db)):
    new_session = SessionModel(
        user_id=user_id,
        color=color,
        x=x,
        y=y,
        size=size
    )
    db.add(new_session)
    db.commit()
    db.refresh(new_session)
    return Session_to_dict(new_session)
    
# ai 질문 생성
@router.post("/create_question/{user_id}", response_model=Chat)
def create_question(user_id: str, session_id: int, db: Session = Depends(get_db)):
    client = OpenAI(api_key=OPENAI_API_KEY)

    # messages = [{"role": "system", "content": "You are a helpful assistant that create question for user."}]
    messages = [{
        "role": "system",
        "content": (
            "당신은 사용자가 자신의 인생을 돌아보고 묘비문을 쓰도록 돕는 대화 코치입니다. "
            "이전 대화 내용(질문과 답변)을 분석하여, 지금 사용자가 감정적으로 몰입하고 있으나 잠시 멈췄을 때, "
            "그 감정 흐름을 이어갈 수 있는 질문을 생성하세요. "
            "질문은 너무 직접적이거나 진단적이지 않아야 하며, 시적이거나 은유적인 언어도 사용할 수 있습니다. "
            "질문은 짧고 인상 깊어야 하며, 사용자가 자신의 내면에 더 깊이 다가가도록 유도해야 합니다. "
            "질문은 반드시 한 줄이어야 합니다."
        )
    }]
    previous_chats = get_all_chat(user_id, session_id, db)
    for chat in previous_chats:
        messages.append({"role": "assistant", "content": chat["question"]})
        messages.append({"role": "user", "content": chat["answer"]})

    response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages
        )
    
    previous_chats_len = len(previous_chats)
    
    question = response.choices[0].message.content.strip()

    # 질문 저장
    new_chat = ChatModel(
        user_id=user_id,
        session_id=session_id,
        question=question,
        answer="",
        order_idx=previous_chats_len
    )
    db.add(new_chat)
    db.commit()
    db.refresh(new_chat)

    return Chat_to_dict(new_chat)

# response 형식
class AnswerQuestionResponse(BaseModel):
    message: str

# ai 질문 답변
@router.post("/answer_question/{user_id}", response_model=AnswerQuestionResponse)
def answer_question(user_id: str, session_id: int, answer: str, db: Session = Depends(get_db)):
    # 가장 큰 order_idx 찾기
    max_order_idx = db.query(func.max(ChatModel.order_idx)).filter(
        ChatModel.user_id == user_id,
        ChatModel.session_id == session_id
    ).scalar()
    
    chat = db.query(ChatModel).filter(
        ChatModel.user_id == user_id,
        ChatModel.session_id == session_id,
        ChatModel.order_idx == max_order_idx
    ).first()
    
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")
    
        
    chat.answer = answer
    db.commit()

    messages = [{
        "role": "system",
        "content": (
            "당신은 사용자가 자신의 인생을 돌아보고 묘비문을 쓰도록 돕는 대화 코치입니다. "
            "이전 대화 내용(질문과 답변)을 분석하여, 이 대화의 요약을 작성하세요. "
            "이 요약은 사용자가 자신의 감정과 생각을 정리하는 데 도움이 되어야 합니다. "
            "요약은 간결하고 명확해야 하며, 사용자가 자신의 감정과 생각을 다시 돌아볼 수 있도록 유도해야 합니다. "
            "요약은 반드시 한 문장이어야 합니다."
        )
    }]
    previous_chats = get_all_chat(user_id, session_id, db)
    for chat in previous_chats:
        messages.append({"role": "assistant", "content": chat["question"]})
        messages.append({"role": "user", "content": chat["answer"]})
    client = OpenAI(api_key=OPENAI_API_KEY)
    response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages
    )
    summary = response.choices[0].message.content.strip()
    session = db.query(SessionModel).filter(
        SessionModel.user_id == user_id,
        SessionModel.id == session_id
    ).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    session.summary = summary
    db.commit()
    
    return {"message": "Answer updated successfully"}

class SessionSummaryResponse(BaseModel):
    message: str

@router.get("/session_summary/{user_id}", response_model=SessionSummaryResponse)
def get_summary(user_id: str, session_id: int, db: Session = Depends(get_db)):
    session = db.query(SessionModel).filter(
        SessionModel.user_id == user_id,
        SessionModel.id == session_id
    ).first()
    
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    return {"message": session.summary}