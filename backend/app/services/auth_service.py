"""Auth service business logic."""

from datetime import datetime, timedelta, timezone
import random
import string
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.models.user import User, OtpVerification
from app.schemas.auth import (
    LoginRequest, RegisterRequest, OtpSendRequest, OtpVerifyRequest,
    GoogleAuthRequest, ForgotPasswordRequest, ResetPasswordRequest,
)
from app.core.security import verify_password, get_password_hash, create_token_pair
from app.core.config import settings


class AuthService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def login(self, data: LoginRequest) -> dict:
        result = await self.db.execute(select(User).where(User.email == data.email))
        user = result.scalar_one_or_none()

        if not user or not user.hashed_password:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
        if not verify_password(data.password, user.hashed_password):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
        if not user.is_active:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Account is disabled")

        tokens = create_token_pair(str(user.id), user.role)
        return {
            "success": True,
            "message": "Login successful",
            "data": {
                "user": self._user_to_dict(user),
                "tokens": tokens,
            },
        }

    async def register(self, data: RegisterRequest) -> dict:
        # Check existing
        result = await self.db.execute(select(User).where(User.email == data.email))
        if result.scalar_one_or_none():
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

        user = User(
            first_name=data.first_name,
            last_name=data.last_name,
            email=data.email,
            phone=data.phone,
            hashed_password=get_password_hash(data.password),
            role="customer",
        )
        self.db.add(user)
        await self.db.flush()

        tokens = create_token_pair(str(user.id), user.role)
        return {
            "success": True,
            "message": "Registration successful",
            "data": {"user": self._user_to_dict(user), "tokens": tokens},
        }

    async def send_otp(self, data: OtpSendRequest) -> dict:
        otp = "".join(random.choices(string.digits, k=settings.OTP_LENGTH))
        expires_at = datetime.now(timezone.utc) + timedelta(minutes=settings.OTP_EXPIRE_MINUTES)

        otp_record = OtpVerification(
            phone=data.phone,
            otp=get_password_hash(otp),  # Hash the OTP
            expires_at=expires_at,
        )
        self.db.add(otp_record)

        # TODO: Send via MSG91
        # await sms_service.send_otp(data.phone, otp)

        return {"success": True, "message": f"OTP sent to {data.phone}"}

    async def verify_otp(self, data: OtpVerifyRequest) -> dict:
        result = await self.db.execute(
            select(OtpVerification)
            .where(OtpVerification.phone == data.phone, OtpVerification.is_verified == False)
            .order_by(OtpVerification.created_at.desc())
        )
        otp_record = result.scalar_one_or_none()

        if not otp_record:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="OTP not found")
        if datetime.now(timezone.utc) > otp_record.expires_at.replace(tzinfo=timezone.utc):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="OTP expired")
        if not verify_password(data.otp, otp_record.otp):
            otp_record.attempts += 1
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid OTP")

        otp_record.is_verified = True

        # Find or create user
        user_result = await self.db.execute(select(User).where(User.phone == data.phone))
        user = user_result.scalar_one_or_none()

        if not user:
            user = User(first_name="Customer", last_name="", phone=data.phone, is_phone_verified=True)
            self.db.add(user)
            await self.db.flush()

        tokens = create_token_pair(str(user.id), user.role)
        return {
            "success": True,
            "message": "OTP verified",
            "data": {"user": self._user_to_dict(user), "tokens": tokens},
        }

    async def google_login(self, data: GoogleAuthRequest) -> dict:
        # TODO: Verify Google ID token and extract user info
        raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED, detail="Google OAuth not configured")

    async def forgot_password(self, data: ForgotPasswordRequest) -> dict:
        # TODO: Send password reset email via Resend
        return {"success": True, "message": "If the email exists, a reset link was sent"}

    async def reset_password(self, data: ResetPasswordRequest) -> dict:
        # TODO: Verify token and update password
        return {"success": True, "message": "Password reset successful"}

    async def refresh(self, refresh_token: str) -> dict:
        from app.core.security import decode_token
        payload = decode_token(refresh_token)
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")
        tokens = create_token_pair(payload["sub"], payload["role"])
        return {"success": True, "message": "Token refreshed", "data": {"tokens": tokens}}

    @staticmethod
    def _user_to_dict(user: User) -> dict:
        return {
            "id": str(user.id),
            "email": user.email,
            "phone": user.phone,
            "firstName": user.first_name,
            "lastName": user.last_name,
            "avatar": user.avatar,
            "role": user.role,
            "isEmailVerified": user.is_email_verified,
            "isPhoneVerified": user.is_phone_verified,
        }
