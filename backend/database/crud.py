from sqlalchemy.orm import Session
from . import models, schemas


def get_poll(db: Session, poll_id: int) -> schemas.Poll:
    return db.query(models.Poll).filter(models.Poll.id == poll_id).first()

def create_poll(db: Session, poll: schemas.PollCreate) -> schemas.Poll:
    new_poll = models.Poll(**poll.dict())
    db.add(new_poll)
    db.commit()
    db.refresh(new_poll)
    return new_poll
    
