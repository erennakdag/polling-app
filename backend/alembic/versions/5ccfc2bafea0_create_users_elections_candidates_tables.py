"""create users/elections/candidates tables

Revision ID: 5ccfc2bafea0
Revises: 
Create Date: 2022-03-12 11:40:50.580296

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5ccfc2bafea0'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'users',
        sa.Column('id', sa.Integer, primary_key=True, index=True),
        sa.Column('username', sa.String, unique=True, index=True, nullable=False),
        sa.Column('email', sa.String, unique=True, index=True, nullable=False),
        sa.Column('password', sa.String, nullable=False),
    )
    op.create_table(
        'elections',
        sa.Column('id', sa.Integer, primary_key=True, index=True),
        sa.Column('creator_id', sa.Integer, sa.ForeignKey("users.id"), nullable=False),
        sa.Column('name', sa.String, nullable=False),
        sa.Column('description', sa.String, nullable=False),
        sa.Column('created_at', sa.String),
        sa.Column('end_date', sa.String),
        sa.Column('participant_num', sa.Integer, default=0),
    )
    op.create_table(
        'candidates',
        sa.Column('id', sa.Integer, primary_key=True, index=True),
        sa.Column('election_id', sa.Integer, sa.ForeignKey("elections.id"), nullable=False),
        sa.Column('name', sa.String, nullable=False),
        sa.Column('description', sa.String, nullable=False),
        sa.Column('votes', sa.Integer, default=0),
    )


def downgrade():
    op.drop_table('users')
    op.drop_table('elections')
    op.drop_table('candidates')
