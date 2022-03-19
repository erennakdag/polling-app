# polling-app

An online polling website

You can create a poll and add options to it to later share the link and let people vote on the options.

## Tech Stack and Dependencies:

Frontend:

- ReactJS (TypeScript)
- React Router
- Material UI

Backend:

- Python with FastAPI
- SQLAlchemy for Database Handling
- Alembic for Database Config and Migration
- SQLite

### Frontend Pages:

- Index Page: Create New Polls
- Poll Page: See the results and vote on options

### API Endpoints:

- get-poll
- new-poll
- create-options
- vote

### Database Schema:

- polls: id, name, description
- options: id, poll_id, text, votes

### To host it on local:

`cd backend`

`python3 -m venv venv`

`source ./venv/bin/activate`

`pip3 install -r requirements.txt`

`uvicorn main:app --reload`

`cd ../frontend`

`npm install`

`npm start`

I hope you like the site :)
