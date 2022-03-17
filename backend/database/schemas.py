from datetime import datetime
from typing import List
from pydantic import BaseModel


class CandidateBase(BaseModel):
    election_id: int
    name: str
    description: str
    

class CandidateCreate(CandidateBase):
    pass


class Candidate(CandidateBase):
    id: int
    votes: int
    
    class Config:
        orm_mode = True


class ElectionBase(BaseModel):
    creator_id: int
    name: str
    desciption: str


class ElectionCreate(ElectionBase):
    pass


class Election(ElectionBase):
    id: int
    created_at: datetime
    end_date: datetime
    participant_num: int
    candidates: List[Candidate] = []
    
    class Config:
        orm_mode = True


class UserBase(BaseModel):
    username: str
    email: str
    password: str
    

class UserCreate(UserBase):
    pass


class User(UserBase):
    id: int
    elections: List[Election] = []
    
    class Config:
        orm_mode = True
