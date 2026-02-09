from sqlmodel import Session, select
from passlib.context import CryptContext
from src.models.user import User, UserCreate, UserPublic
from src.auth.jwt_utils import create_access_token
from typing import Optional
from datetime import timedelta

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a plain password against a hashed password
    """
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """
    Hash a plain password
    """
    return pwd_context.hash(password)

class AuthService:
    def __init__(self, session: Session):
        self.session = session

    def register_user(self, user_create: UserCreate) -> UserPublic:
        """
        Register a new user with the provided credentials
        """
        # Check if user already exists
        existing_user = self.session.exec(
            select(User).where(User.email == user_create.email)
        ).first()
        
        if existing_user:
            raise ValueError("Email already registered")
        
        # Hash the password
        hashed_password = get_password_hash(user_create.password)
        
        # Create the user
        db_user = User(
            email=user_create.email,
            hashed_password=hashed_password
        )
        
        self.session.add(db_user)
        self.session.commit()
        self.session.refresh(db_user)
        
        # Return public representation
        return UserPublic.from_orm(db_user)

    def authenticate_user(self, email: str, password: str) -> Optional[UserPublic]:
        """
        Authenticate a user with email and password
        """
        # Find user by email
        user = self.session.exec(
            select(User).where(User.email == email)
        ).first()
        
        if not user or not verify_password(password, user.hashed_password):
            return None
        
        # Return public representation
        return UserPublic.from_orm(user)

    def create_access_token_for_user(self, user: UserPublic) -> str:
        """
        Create an access token for the given user
        """
        data = {
            "user_id": user.id,
            "email": user.email
        }
        
        # Set token to expire in 30 minutes
        expire = timedelta(minutes=30)
        token = create_access_token(data=data, expires_delta=expire)
        
        return token