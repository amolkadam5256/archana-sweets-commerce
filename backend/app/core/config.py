"""Application configuration using Pydantic Settings."""

from typing import List
from pydantic_settings import BaseSettings
from pydantic import field_validator


class Settings(BaseSettings):
    # ── App ──────────────────────────────────────────────────
    APP_NAME: str = "Archana Sweets API"
    API_VERSION: str = "1.0.0"
    API_PREFIX: str = "/api/v1"
    DEBUG: bool = False
    ENVIRONMENT: str = "development"

    # ── Database ─────────────────────────────────────────────
    DATABASE_URL: str = "postgresql+asyncpg://admin:Admin%407709@localhost:5432/archanasweets_db"
    DATABASE_POOL_SIZE: int = 10
    DATABASE_MAX_OVERFLOW: int = 20

    # ── Redis ────────────────────────────────────────────────
    REDIS_URL: str = "redis://localhost:6379"
    REDIS_CACHE_TTL: int = 300  # 5 minutes

    # ── JWT ──────────────────────────────────────────────────
    JWT_SECRET_KEY: str = "change-this-secret-key-in-production"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # ── Google OAuth ─────────────────────────────────────────
    GOOGLE_CLIENT_ID: str = ""
    GOOGLE_CLIENT_SECRET: str = ""

    # ── CORS ─────────────────────────────────────────────────
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "https://archanasweets.com",
        "https://www.archanasweets.com",
    ]

    # ── AWS S3 ───────────────────────────────────────────────
    AWS_ACCESS_KEY_ID: str = ""
    AWS_SECRET_ACCESS_KEY: str = ""
    AWS_REGION: str = "ap-south-1"
    AWS_S3_BUCKET: str = "archanasweets-media"

    # ── Razorpay ─────────────────────────────────────────────
    RAZORPAY_KEY_ID: str = ""
    RAZORPAY_KEY_SECRET: str = ""

    # ── SMS / OTP ────────────────────────────────────────────
    MSG91_AUTH_KEY: str = ""
    MSG91_TEMPLATE_ID: str = ""
    OTP_EXPIRE_MINUTES: int = 10
    OTP_LENGTH: int = 6

    # ── Email ────────────────────────────────────────────────
    RESEND_API_KEY: str = ""
    FROM_EMAIL: str = "no-reply@archanasweets.com"

    # ── Rate Limiting ────────────────────────────────────────
    RATE_LIMIT_PER_MINUTE: int = 60

    @field_validator("ALLOWED_ORIGINS", mode="before")
    @classmethod
    def parse_origins(cls, v):
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(",")]
        return v

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
