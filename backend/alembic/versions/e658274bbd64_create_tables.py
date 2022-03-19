"""create tables

Revision ID: e658274bbd64
Revises: 
Create Date: 2022-03-19 00:53:45.732488

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e658274bbd64'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'polls',
        sa.Column('id', sa.Integer, primary_key=True, index=True),
        sa.Column('name', sa.String, nullable=False),
        sa.Column('description', sa.String, nullable=True),
    )
    op.create_table(
        'options',
        sa.Column('id', sa.Integer, primary_key=True, index=True),
        sa.Column('poll_id', sa.Integer, sa.ForeignKey("polls.id"), nullable=False),
        sa.Column('text', sa.String, nullable=False),
        sa.Column('votes', sa.Integer, default=0),
    )

def downgrade():
    op.drop_table('polls')
    op.drop_table('options')
