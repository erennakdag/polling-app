from datetime import datetime
from typing import List
from pydantic import BaseModel


class OptionBase(BaseModel):
    poll_id: int
    name: str
    description: str
    

class OptionCreate(OptionBase):
    pass


class Option(OptionBase):
    id: int
    votes: int
    
    class Config:
        orm_mode = True


class PollBase(BaseModel):
    name: str
    description: str


class PollCreate(PollBase):
    end_date: datetime


class Poll(PollBase):
    id: int
    created_at: datetime
    end_date: datetime
    participant_num: int
    options: List[Option] = []
    
    class Config:
        orm_mode = True
