from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'

    id = Column(String, primary_key=True)
    username = Column(String, nullable=False)
    gender = Column(String)
    age = Column(Integer)
    image_path = Column(String)
    created_at = Column(DateTime, server_default=func.now())

class Grave(Base):
    __tablename__ = 'grave'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(String, ForeignKey('users.id'))
    content = Column(String)
    created_at = Column(DateTime, server_default=func.now())


class Session(Base):
    __tablename__ = 'session'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(String, ForeignKey('users.id'))
    color = Column(String)
    x = Column(Float)
    y = Column(Float)
    size = Column(Float)
    summary = Column(String)

    created_at = Column(DateTime, server_default=func.now())


class Chat(Base):
    __tablename__ = 'chat'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(String, ForeignKey('users.id'))
    session_id = Column(Integer)
    question = Column(String)
    answer = Column(String)
    order_idx = Column(Integer)
    created_at = Column(DateTime, server_default=func.now())
