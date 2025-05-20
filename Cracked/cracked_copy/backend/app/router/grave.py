from fastapi import APIRouter, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from fastapi import Depends
from database import get_db
from models import Grave
from pydantic import BaseModel
from sqlalchemy import func
router = APIRouter()

class GraveContent(BaseModel):
    content: str

# 묘비명 등록
@router.post("/save_grave_content/{user_id}")
def save_grave_content(user_id: str, grave_content: GraveContent, db: Session = Depends(get_db)):
    # 이미 등록된 묘비명이 있으면 수정
    existing_grave = db.query(Grave).filter(Grave.user_id == user_id).all()
    if existing_grave:
        for grave in existing_grave:
            db.delete(grave)
    new_grave = Grave(
        user_id=user_id,
        content=grave_content.content
    )
    db.add(new_grave)
    db.commit()
    db.refresh(new_grave)
    return {"message": "Grave content saved successfully"}

# 묘비명 조회
@router.get("/get_grave_content/{user_id}")
def get_grave_content(user_id: str, db: Session = Depends(get_db)):
    grave = db.query(Grave).filter(Grave.user_id == user_id).first()
    if grave is None:
        raise HTTPException(status_code=404, detail="Grave content not found")
    return {"grave_content": grave.content}

# 다른 사람들의 묘비명 조회
@router.get("/get_other_grave_content/{user_id}")
def get_other_grave_content(user_id: str, db: Session = Depends(get_db)):
    # 전체 묘비명 개수 확인
    total_graves = db.query(Grave).count()
    if total_graves <= 1:  # 자신의 묘비명만 있는 경우
        return {"grave_content": None}
    
    grave = db.query(Grave).filter(Grave.user_id != user_id).order_by(func.random()).first()
    if grave is None:
        raise HTTPException(status_code=404, detail="Grave content not found")
    return {"grave_content": grave.content}
