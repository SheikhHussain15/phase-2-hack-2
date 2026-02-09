from sqlmodel import create_engine, Session
from sqlalchemy.pool import QueuePool
import os

# Get database URL from environment variable
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./test.db")

# Create the database engine with serverless-friendly settings
connect_args = {}
if DATABASE_URL.startswith("postgresql"):
    # For PostgreSQL, use settings that work well with serverless
    connect_args = {
        "pool_pre_ping": True,  # Verify connections before use
        "pool_recycle": 300,    # Recycle connections every 5 minutes
    }

engine = create_engine(
    DATABASE_URL,
    echo=True,
    poolclass=QueuePool,
    pool_size=5,
    max_overflow=10,
    **connect_args
)

def get_session():
    with Session(engine) as session:
        yield session