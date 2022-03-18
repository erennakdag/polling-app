# FastAPI Imports
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# Database Handling Imports
from database import crud, models, schemas
from database.database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS Middleware for the React Fronend
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
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


# Create new user
@app.post('/create-user/', response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: SessionLocal = Depends(get_db)):
    
    if crud.get_user_by_email_or_username(db, user.email, user.username):
        raise HTTPException(status_code=400, detail='Email or Username already taken!')
    
    return crud.create_user(db, user)


@app.get('/get-user/{username}', response_model=schemas.User)
def get_user(username: str, db: SessionLocal = Depends(get_db)):
    
    user = crud.get_user_by_username(db, username)
    if user:
        return user
    else:
        raise HTTPException(status_code=404, detail='User not found!')
