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
from app.core.dependencies import get_current_user

router = APIRouter()


@router.post("/login", response_model=TokenResponse)
async def login(data: LoginRequest, db: AsyncSession = Depends(get_db)):
    return await AuthService(db).login(data)


@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def register(data: RegisterRequest, db: AsyncSession = Depends(get_db)):
    return await AuthService(db).register(data)


@router.post("/google", response_model=TokenResponse)
async def google_login(data: GoogleAuthRequest, db: AsyncSession = Depends(get_db)):
    return await AuthService(db).google_login(data)


@router.post("/otp/send", response_model=MessageResponse)
async def send_otp(data: OtpSendRequest, db: AsyncSession = Depends(get_db)):
    return await AuthService(db).send_otp(data)


@router.post("/otp/verify", response_model=TokenResponse)
async def verify_otp(data: OtpVerifyRequest, db: AsyncSession = Depends(get_db)):
    return await AuthService(db).verify_otp(data)


@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(refresh_token: str, db: AsyncSession = Depends(get_db)):
    return await AuthService(db).refresh(refresh_token)


@router.post("/forgot-password", response_model=MessageResponse)
async def forgot_password(data: ForgotPasswordRequest, db: AsyncSession = Depends(get_db)):
    return await AuthService(db).forgot_password(data)


@router.post("/reset-password", response_model=MessageResponse)
async def reset_password(data: ResetPasswordRequest, db: AsyncSession = Depends(get_db)):
    return await AuthService(db).reset_password(data)


@router.get("/me")
async def get_current_user_profile(user=Depends(get_current_user)):
    return {
        "success": True,
        "data": {
            "id": str(user.id),
            "email": user.email,
            "phone": user.phone,
            "firstName": user.first_name,
            "lastName": user.last_name,
            "avatar": user.avatar,
            "role": user.role,
            "isEmailVerified": user.is_email_verified,
            "isPhoneVerified": user.is_phone_verified,
            "createdAt": user.created_at.isoformat() if user.created_at else None,
            "updatedAt": user.updated_at.isoformat() if user.updated_at else None,
        },
    }


@router.post("/logout", response_model=MessageResponse)
async def logout():
    return {"success": True, "message": "Logged out successfully"}
