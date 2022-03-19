from typing import List, Optional
from pydantic import BaseModel


class OptionBase(BaseModel):
    poll_id: int
    

class OptionCreate(OptionBase):
    text: str


class Option(OptionBase):
    id: int
    text: str
    votes: int
    
    class Config:
        orm_mode = True


class PollBase(BaseModel):
    name: str
    description: Optional[str]


class PollCreate(PollBase):
    pass


class Poll(PollBase):
    id: int
    options: List[Option] = []
    
    class Config:
        orm_mode = True
