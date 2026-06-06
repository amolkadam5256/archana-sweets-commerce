"""SQLAlchemy User model."""

import uuid
from datetime import datetime
from sqlalchemy import String, Boolean, DateTime, Enum, Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from app.database.session import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=True)
    phone: Mapped[str] = mapped_column(String(15), unique=True, index=True, nullable=True)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=True)
    first_name: Mapped[str] = mapped_column(String(100), nullable=False)
    last_name: Mapped[str] = mapped_column(String(100), nullable=False)
    avatar: Mapped[str] = mapped_column(String(500), nullable=True)
    role: Mapped[str] = mapped_column(
        Enum("customer", "admin", "super_admin", name="user_role"),
        default="customer",
        nullable=False,
    )
    google_id: Mapped[str] = mapped_column(String(255), unique=True, nullable=True)
    is_email_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    is_phone_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    addresses: Mapped[list["Address"]] = relationship("Address", back_populates="user", cascade="all, delete-orphan")
    orders: Mapped[list] = relationship("Order", back_populates="user")
    reviews: Mapped[list] = relationship("Review", back_populates="user")


class Address(Base):
    __tablename__ = "addresses"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    type: Mapped[str] = mapped_column(Enum("home", "work", "other", name="address_type"), default="home")
    name: Mapped[str] = mapped_column(String(100))
    phone: Mapped[str] = mapped_column(String(15))
    address_line1: Mapped[str] = mapped_column(String(255))
    address_line2: Mapped[str] = mapped_column(String(255), nullable=True)
    city: Mapped[str] = mapped_column(String(100))
    state: Mapped[str] = mapped_column(String(100))
    pincode: Mapped[str] = mapped_column(String(10))
    is_default: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    # Relationships
    user: Mapped["User"] = relationship("User", back_populates="addresses")


class OtpVerification(Base):
    __tablename__ = "otp_verifications"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    phone: Mapped[str] = mapped_column(String(15), index=True)
    otp: Mapped[str] = mapped_column(String(10))
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    attempts: Mapped[int] = mapped_column(default=0)
    expires_at: Mapped[datetime] = mapped_column(DateTime)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
