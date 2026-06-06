"""Authentication endpoints."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.session import get_db
from app.schemas.auth import (
    LoginRequest, RegisterRequest, OtpSendRequest,
    OtpVerifyRequest, GoogleAuthRequest, TokenResponse,
    ForgotPasswordRequest, ResetPasswordRequest,
)
from app.schemas.common import MessageResponse
from app.services.auth_service import AuthService

router = APIRouter()


@router.post("/login", response_model=TokenResponse)
async def login(data: LoginRequest, db: AsyncSession = Depends(get_db)):
    """Login with email and password."""
    return await AuthService(db).login(data)


@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def register(data: RegisterRequest, db: AsyncSession = Depends(get_db)):
    """Register new customer account."""
    return await AuthService(db).register(data)


@router.post("/google", response_model=TokenResponse)
async def google_login(data: GoogleAuthRequest, db: AsyncSession = Depends(get_db)):
    """Login or register with Google OAuth ID token."""
    return await AuthService(db).google_login(data)


@router.post("/otp/send", response_model=MessageResponse)
async def send_otp(data: OtpSendRequest, db: AsyncSession = Depends(get_db)):
    """Send OTP to phone number."""
    return await AuthService(db).send_otp(data)


@router.post("/otp/verify", response_model=TokenResponse)
async def verify_otp(data: OtpVerifyRequest, db: AsyncSession = Depends(get_db)):
    """Verify OTP and login/register."""
    return await AuthService(db).verify_otp(data)


@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(refresh_token: str, db: AsyncSession = Depends(get_db)):
    """Refresh JWT access token."""
    return await AuthService(db).refresh(refresh_token)


@router.post("/forgot-password", response_model=MessageResponse)
async def forgot_password(data: ForgotPasswordRequest, db: AsyncSession = Depends(get_db)):
    """Send password reset email."""
    return await AuthService(db).forgot_password(data)


@router.post("/reset-password", response_model=MessageResponse)
async def reset_password(data: ResetPasswordRequest, db: AsyncSession = Depends(get_db)):
    """Reset password with token."""
    return await AuthService(db).reset_password(data)


@router.post("/logout", response_model=MessageResponse)
async def logout():
    """Logout (client clears tokens)."""
    return {"success": True, "message": "Logged out successfully"}
