from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from app.config import DATABASE_URL


# ✅ 동기 엔진 (Celery에서 사용)
engine = create_engine(
    DATABASE_URL,
    echo=True,
)

Session = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False
)

# ✅ FastAPI에서 의존성 주입을 위한 세션
def get_db():
    with Session() as session:
        yield session


# import sqlite3
# from sqlite3 import Error

# def create_connection():
#     """데이터베이스 연결을 생성합니다."""
#     conn = None
#     try:
#         conn = sqlite3.connect('./data/database.db')
#         print("SQLite 데이터베이스에 성공적으로 연결되었습니다.")
#         return conn
#     except Error as e:
#         print(f"에러 발생: {e}")
#         return None

# def create_tables(conn):
#     """기본 테이블들을 생성합니다."""
#     try:
#         cursor = conn.cursor()
        
#         # 사용자 테이블 생성
#         cursor.execute('''
#         CREATE TABLE IF NOT EXISTS users (
#             id TEXT PRIMARY KEY,
#             username TEXT NOT NULL UNIQUE,
#             image_path TEXT,
#             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
#         )
#         ''')
        
#         # grave 테이블 생성
#         cursor.execute('''
#         CREATE TABLE IF NOT EXISTS grave (
#             id INTEGER PRIMARY KEY AUTOINCREMENT,
#             user_id TEXT,
#             content TEXT,
#             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
#         )
#         ''')

#         # chat 테이블 생성
#         cursor.execute('''
#         CREATE TABLE IF NOT EXISTS chat (
#             id INTEGER PRIMARY KEY AUTOINCREMENT,
#             user_id TEXT,
#             question TEXT,
#             answer TEXT,
#             order_idx INTEGER,
#             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
#         )
#         ''')

#         conn.commit()
#         print("테이블이 성공적으로 생성되었습니다.")
#     except Error as e:
#         print(f"테이블 생성 중 에러 발생: {e}")

# def init_db():
#     """데이터베이스를 초기화합니다."""
#     conn = create_connection()
#     if conn is not None:
#         create_tables(conn)
#         conn.close()
#     else:
#         print("데이터베이스 연결에 실패했습니다.")

# if __name__ == '__main__':
#     init_db() 