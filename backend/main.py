# FastAPI Imports
from typing import List
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Database Handling Imports
from database import crud, models, schemas
from database.database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS Middleware for the React Fronend
origins = [
    "http://localhost:3000",
    "http://192.168.2.37:3000/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Test Endpoint
@app.get('/')
def index():
    return {"test": "data"}


@app.get('/{poll_id}', response_model=schemas.Poll)
def get_poll(poll_id: int, db: SessionLocal = Depends(get_db)):
    return crud.get_poll(db, poll_id)


@app.post('/new-poll/', response_model=schemas.Poll)
def create_poll(poll: schemas.PollCreate, db: SessionLocal = Depends(get_db)):
    return crud.create_poll(db, poll)


@app.post('/create-options/{poll_id}')
def create_options(poll_id: int, options: List[str], db: SessionLocal = Depends(get_db)):
    try:
        for text in options:
            crud.create_option(db, {"poll_id": poll_id, "text": text})
    except Exception as e:
        print(e)
        return {'error': 'something went wrong'}
    
    return {'success': 'everything went as expected'}


@app.post('/vote/{option_id}')
def vote(option_id: int, db: SessionLocal = Depends(get_db)):
    return crud.vote(db, option_id)
