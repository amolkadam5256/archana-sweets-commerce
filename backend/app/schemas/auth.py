"""Pydantic schemas for authentication."""

from pydantic import BaseModel, EmailStr, field_validator
import re


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class RegisterRequest(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    phone: str
    password: str
    confirm_password: str

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        cleaned = re.sub(r"\D", "", v)
        if not re.match(r"^[6-9]\d{9}$", cleaned):
            raise ValueError("Invalid Indian phone number")
        return cleaned

    @field_validator("confirm_password")
    @classmethod
    def passwords_match(cls, v: str, info) -> str:
        if "password" in info.data and v != info.data["password"]:
            raise ValueError("Passwords do not match")
        return v

    @field_validator("password")
    @classmethod
    def password_strength(cls, v: str) -> str:
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters")
        return v


class OtpSendRequest(BaseModel):
    phone: str


class OtpVerifyRequest(BaseModel):
    phone: str
    otp: str


class GoogleAuthRequest(BaseModel):
    id_token: str


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class ResetPasswordRequest(BaseModel):
    token: str
    password: str
    confirm_password: str


class TokenData(BaseModel):
    access_token: str
    refresh_token: str
    expires_in: int
    token_type: str = "bearer"


class TokenResponse(BaseModel):
    success: bool = True
    message: str = "Authentication successful"
    data: dict
