"""SQLAlchemy Order & Cart models."""

import uuid
from datetime import datetime
from sqlalchemy import String, Boolean, DateTime, Float, Integer, Text, ForeignKey, JSON, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from app.database.session import Base


class Cart(Base):
    __tablename__ = "carts"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=True)
    session_id: Mapped[str] = mapped_column(String(255), nullable=True, index=True)
    coupon_code: Mapped[str] = mapped_column(String(50), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    items: Mapped[list["CartItem"]] = relationship("CartItem", back_populates="cart", cascade="all, delete-orphan")


class CartItem(Base):
    __tablename__ = "cart_items"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    cart_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("carts.id", ondelete="CASCADE"))
    product_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("products.id"))
    variant_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("product_variants.id"))
    quantity: Mapped[int] = mapped_column(Integer, default=1)
    price: Mapped[float] = mapped_column(Float)

    cart: Mapped["Cart"] = relationship("Cart", back_populates="items")


class Order(Base):
    __tablename__ = "orders"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_number: Mapped[str] = mapped_column(String(50), unique=True, index=True)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"))
    shipping_address: Mapped[dict] = mapped_column(JSON)
    status: Mapped[str] = mapped_column(
        Enum("pending","confirmed","processing","shipped","out_for_delivery","delivered","cancelled","refunded", name="order_status"),
        default="pending",
        index=True,
    )
    payment_status: Mapped[str] = mapped_column(
        Enum("pending","paid","failed","refunded", name="payment_status"), default="pending"
    )
    payment_method: Mapped[str] = mapped_column(String(50))
    subtotal: Mapped[float] = mapped_column(Float)
    discount: Mapped[float] = mapped_column(Float, default=0.0)
    delivery_fee: Mapped[float] = mapped_column(Float, default=0.0)
    total: Mapped[float] = mapped_column(Float)
    coupon_code: Mapped[str] = mapped_column(String(50), nullable=True)
    coupon_discount: Mapped[float] = mapped_column(Float, default=0.0)
    razorpay_order_id: Mapped[str] = mapped_column(String(255), nullable=True)
    razorpay_payment_id: Mapped[str] = mapped_column(String(255), nullable=True)
    notes: Mapped[str] = mapped_column(Text, nullable=True)
    estimated_delivery: Mapped[datetime] = mapped_column(DateTime, nullable=True)
    delivered_at: Mapped[datetime] = mapped_column(DateTime, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user: Mapped["User"] = relationship("User", back_populates="orders")
    items: Mapped[list["OrderItem"]] = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")


class OrderItem(Base):
    __tablename__ = "order_items"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("orders.id", ondelete="CASCADE"))
    product_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("products.id"))
    product_name: Mapped[str] = mapped_column(String(255))
    product_image: Mapped[str] = mapped_column(String(500), nullable=True)
    variant_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("product_variants.id"))
    variant_label: Mapped[str] = mapped_column(String(100))
    quantity: Mapped[int] = mapped_column(Integer)
    price: Mapped[float] = mapped_column(Float)
    total_price: Mapped[float] = mapped_column(Float)

    order: Mapped["Order"] = relationship("Order", back_populates="items")


class Coupon(Base):
    __tablename__ = "coupons"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    code: Mapped[str] = mapped_column(String(50), unique=True, index=True)
    description: Mapped[str] = mapped_column(String(255))
    discount_type: Mapped[str] = mapped_column(Enum("percentage", "fixed", name="discount_type"))
    discount_value: Mapped[float] = mapped_column(Float)
    min_order_amount: Mapped[float] = mapped_column(Float, default=0.0)
    max_discount: Mapped[float] = mapped_column(Float, nullable=True)
    usage_limit: Mapped[int] = mapped_column(Integer, nullable=True)
    usage_count: Mapped[int] = mapped_column(Integer, default=0)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    valid_from: Mapped[datetime] = mapped_column(DateTime)
    valid_until: Mapped[datetime] = mapped_column(DateTime)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
