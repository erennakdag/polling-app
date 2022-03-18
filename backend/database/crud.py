from sqlalchemy.orm import Session
from . import models, schemas
from werkzeug.security import check_password_hash, generate_password_hash

def get_user_by_id(db: Session, user_id: int) -> schemas.User:
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email_or_username(db: Session, email: str, username: str) -> schemas.User:
    return db.query(models.User).filter(models.User.email == email or models.User.username == username).first()

def get_user_by_username(db: Session, username: str) -> schemas.User:
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate) -> schemas.User:
    user_data = user.dict()
    
    user_data['password'] = generate_password_hash(user_data['password'])
    
    new_user = models.User(**user_data)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
