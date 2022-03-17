from datetime import datetime
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    
    elections = relationship("Election", backref="users")
    
    
class Election(Base):
    __tablename__ = "elections"
    
    id = Column(Integer, primary_key=True, index=True)
    creator_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.now)
    end_date = Column(DateTime)
    participant_num = Column(Integer, default=0)

    candidates = relationship("Candidate", backref="elections")


class Candidate(Base):
    __tablename__ = "candidates"
    
    id = Column(Integer, primary_key=True, index=True)
    election_id = Column(Integer, ForeignKey("elections.id"), nullable=False)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    votes = Column(Integer, default=0)
