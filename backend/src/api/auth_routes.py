from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from src.database import get_session
from src.services.auth_service import AuthService
from src.models.user import UserCreate, UserPublic
from src.auth.schemas import JWTResponse

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=UserPublic)
def register(user_create: UserCreate, session: Session = Depends(get_session)):
    """
    Register a new user
    """
    auth_service = AuthService(session)
    
    try:
        user = auth_service.register_user(user_create)
        return user
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.post("/login", response_model=JWTResponse)
def login(email: str, password: str, session: Session = Depends(get_session)):
    """
    Authenticate user and return access token
    """
    auth_service = AuthService(session)
    
    user = auth_service.authenticate_user(email, password)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    token = auth_service.create_access_token_for_user(user)
    
    return JWTResponse(access_token=token)