"""edited: uniqueness in user.name

Revision ID: 99ab11282030
Revises: ccbcdbc8f30f
Create Date: 2025-05-10 23:15:10.575026

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '99ab11282030'
down_revision: Union[str, None] = 'ccbcdbc8f30f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # 임시 테이블 생성 (unique 제약조건 없이)
    op.create_table(
        'users_temp',
        sa.Column('id', sa.String(), nullable=False),
        sa.Column('username', sa.String(), nullable=False),
        sa.Column('image_path', sa.String()),
        sa.Column('created_at', sa.DateTime(), server_default=sa.text('CURRENT_TIMESTAMP')),
        sa.Column('gender', sa.String()),
        sa.Column('age', sa.Integer()),
        sa.PrimaryKeyConstraint('id')
    )

    # 데이터 복사
    op.execute('INSERT INTO users_temp SELECT * FROM users')

    # 기존 테이블 삭제
    op.drop_table('users')

    # 임시 테이블 이름 변경
    op.rename_table('users_temp', 'users')


def downgrade() -> None:
    # 임시 테이블 생성 (unique 제약조건 포함)
    op.create_table(
        'users_temp',
        sa.Column('id', sa.String(), nullable=False),
        sa.Column('username', sa.String(), nullable=False),
        sa.Column('image_path', sa.String()),
        sa.Column('created_at', sa.DateTime(), server_default=sa.text('CURRENT_TIMESTAMP')),
        sa.Column('gender', sa.String()),
        sa.Column('age', sa.Integer()),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('username')
    )

    # 데이터 복사
    op.execute('INSERT INTO users_temp SELECT * FROM users')

    # 기존 테이블 삭제
    op.drop_table('users')

    # 임시 테이블 이름 변경
    op.rename_table('users_temp', 'users') 