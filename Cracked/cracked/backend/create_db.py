from app.config import DATABASE_URL
from sqlalchemy import create_engine
from models import Base

def init_models():
    # SQLite는 파일 기반 데이터베이스이므로 별도의 데이터베이스 생성이 필요 없음
    engine = create_engine(DATABASE_URL)
    
    # 모든 모델의 테이블 생성
    Base.metadata.create_all(engine)
    print(f"Tables created in database: {DATABASE_URL}")

if __name__ == "__main__":
    init_models()