from string import ascii_letters as letters, digits
from random import randrange
import sqlite3

# essential constants
GMAIL_SUFFIX = '@gmail.com'
MIN_USERNAME_LENGTH = 4
MAX_USERNAME_LENGTH = 12
PASSWORD_LENGTH = 8

# store the names of the users
users = []


def create_random_user() -> tuple:
    """
    Creates Random and Fake User Objects for later use
    """
    
    pw_pool = letters + digits
    
    id = randrange(0, 1_000_000)
    username = ''.join(
        letters[randrange(0, len(letters))]
        for _ in range(MIN_USERNAME_LENGTH + randrange(0, MAX_USERNAME_LENGTH - MIN_USERNAME_LENGTH))
    )
    email = f"{username}{randrange(10, 100)}{GMAIL_SUFFIX}"
    password = ''.join(
        pw_pool[randrange(0, len(pw_pool))]
        for _ in range(PASSWORD_LENGTH)
    )
    elections = []
    
    # create elections for this user
    for _ in range(randrange(0, 3)):
        elections.append(create_random_election(id))
        
    users.append(username)
    
    return id, username, email, password, elections


def create_random_election(creator_id: int) -> tuple:
    """
    Creates Random and Fake Election Objects for later use

    Args:
        creator_id (int): foreign_key from the table 'users'
    """
    
    # create data for the election objects
    id = randrange(0, 1_000_000)
    name = 'bruh'
    description = 'bruhbruhbruh'
    created_at = end_date = '31.3.2031'
    participant_num = randrange(0, 11)
    candidates = []

    # create candidates and their votes
    first = participant_num - (participant_num // 2)
    candidates.extend((create_random_candidate(id, first), create_random_candidate(id, participant_num - first)))
    
    return id, creator_id, name, description, created_at, end_date, participant_num, candidates
    
    
def create_random_candidate(election_id: int, votes: int) -> tuple:
    """
    Creates Random and Fake Candidate Objects for later use

    Args:
        election_id (int): foreign_key from the table elections
        votes (int): the vote count of this candidate
    """
    
    id = randrange(0, 1_000_000)
    name = users[randrange(0, len(users))]
    description = 'candidatebruhbruhbruh'
    
    return id, election_id, name, description, votes


if __name__ == "__main__":
    
    connection = sqlite3.connect('././voting_app.db')
    db = connection.cursor()
    
    for i in range(100):
        
        user = create_random_user()
        elections = user[-1]
        user = user[:-1]

        db.execute("INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?);", user)
        for election in elections:
            candidates = election[-1]
            db.execute("INSERT INTO elections (id, creator_id, name, description, created_at, end_date, participant_num) VALUES (?, ?, ?, ?, ?, ?, ?);", election[:-1])
            for candidate in candidates:
                db.execute("INSERT INTO candidates (id, election_id, name, description, votes) VALUES (?, ?, ?, ?, ?);", candidate)
    
    db.close()
    connection.commit()
