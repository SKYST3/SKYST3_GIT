from fastapi import APIRouter, HTTPException, UploadFile, File, Depends
import os
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from database import get_db
from pydantic import BaseModel
from app.config import UPLOAD_FOLDER
from app.utils.process_image import portrait_image
from models import User
import uuid
from fastapi import Form

router = APIRouter()

def User_to_dict(user: User):
    return {
        "user_id": user.id,
        "username": user.username,
        "gender": user.gender,
        "age": user.age,
        "image_path": user.image_path,
        "created_at": str(user.created_at)
    }

def save_image(image: UploadFile, user_id: str):
    # 이미지 저장 경로 생성
    image_path = os.path.join(UPLOAD_FOLDER, user_id+image.filename)
    # 이미지 저장
    with open(image_path, "wb") as f:
        f.write(image.file.read())
    
    portrait_image(image_path, image_path)
    
    return image_path

class RegisterUserResponse(BaseModel):
    message: str

class RegisterUserAndroidResponse(BaseModel):
    message: str
    user_id: str

@router.post("/android/register", response_model=RegisterUserAndroidResponse)
def register_user_android(
    name: str = Form(...),
    gender: str = Form(...),
    age: int = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # 이미지 저장

    # 새로운 유저 생성
    # Generate a random hash for android user
    user_id = str(uuid.uuid4())
    image_path = save_image(image, user_id)

    new_user = User(
        id=user_id,
        username=name,
        gender=gender,
        age=age,
        image_path=image_path
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User registered successfully",
            "user_id": user_id}

@router.post("/register/{user_id}", response_model=RegisterUserResponse)
def register_user(user_id: str, name: str, gender: str, age: int, image: UploadFile = File(...), db: Session = Depends(get_db)):
    # 이미지 저장
    image_path = save_image(image, user_id)

    # 새로운 유저 생성
    new_user = User(
        id=user_id,
        username=name,
        gender=gender,
        age=age,
        image_path=image_path
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {"message": "User registered successfully"}

# get user info
class GetUserInfoResponse(BaseModel):
    user_id: str
    username: str
    gender: str
    age: int
    image_path: str
    created_at: str

@router.get("/user_info/{user_id}", response_model=GetUserInfoResponse)
def get_user_info(user_id: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    return User_to_dict(user)

# 이미지 다운로드
@router.get("/image/{user_id}")
def download_image(user_id: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    return FileResponse(user.image_path)
