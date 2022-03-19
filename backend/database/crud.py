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


def create_option(db: Session, option: schemas.OptionCreate) -> schemas.Option:
    new_option = models.Option(**option)
    db.add(new_option)
    db.commit()
    db.refresh(new_option)
    return new_option


def vote(db: Session, option_id: int):
    res = db.query(models.Option).filter(models.Option.id == option_id).update({'votes': models.Option.votes + 1})
    db.commit()
    return res
