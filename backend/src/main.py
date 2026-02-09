from fastapi import FastAPI
from src.api.auth_routes import router as auth_router
from src.api.user_routes import router as user_router
from src.api.task_routes import router as task_router
from contextlib import asynccontextmanager
from src.database import engine
from src.models.user import User
from src.models.task import Task
from sqlmodel import SQLModel

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create tables on startup
    SQLModel.metadata.create_all(bind=engine)
    yield
    # Cleanup on shutdown if needed
    pass

app = FastAPI(
    title="Multi-User Todo API",
    description="API for the multi-user todo web application with JWT authentication",
    version="0.1.0",
    lifespan=lifespan
)

# Include routers
app.include_router(auth_router, prefix="/api")
app.include_router(user_router, prefix="/api")
app.include_router(task_router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Multi-User Todo API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}