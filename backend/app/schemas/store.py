"""Schemas for products, categories, reviews, and uploads."""

from typing import List, Optional
from pydantic import BaseModel, Field


class CategoryCreateRequest(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    image: Optional[str] = None
    isActive: bool = True
    sortOrder: int = 0


class CategoryUpdateRequest(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None
    image: Optional[str] = None
    isActive: Optional[bool] = None
    sortOrder: Optional[int] = None


class ProductImageCreate(BaseModel):
    url: str
    altText: Optional[str] = None
    isPrimary: bool = False
    sortOrder: int = 0


class ProductVariantCreate(BaseModel):
    weight: float
    unit: str = "g"
    price: float
    originalPrice: Optional[float] = None
    stock: int = 0
    sku: Optional[str] = None
    isActive: bool = True


class ProductCreateRequest(BaseModel):
    name: str
    slug: str
    description: str
    shortDescription: str
    categoryId: str
    tags: Optional[List[str]] = []
    isFeatured: bool = False
    isBestSeller: bool = False
    isNew: bool = True
    isActive: bool = True
    shelfLife: Optional[str] = None
    ingredients: Optional[str] = None
    allergens: Optional[str] = None
    metaTitle: Optional[str] = None
    metaDescription: Optional[str] = None
    variants: Optional[List[ProductVariantCreate]] = None
    images: Optional[List[ProductImageCreate]] = None


class ProductUpdateRequest(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None
    shortDescription: Optional[str] = None
    categoryId: Optional[str] = None
    tags: Optional[List[str]] = None
    isFeatured: Optional[bool] = None
    isBestSeller: Optional[bool] = None
    isNew: Optional[bool] = None
    isActive: Optional[bool] = None
    shelfLife: Optional[str] = None
    ingredients: Optional[str] = None
    allergens: Optional[str] = None
    metaTitle: Optional[str] = None
    metaDescription: Optional[str] = None
    variants: Optional[List[ProductVariantCreate]] = None
    images: Optional[List[ProductImageCreate]] = None


class ReviewCreateRequest(BaseModel):
    productId: str
    rating: int = Field(..., ge=1, le=5)
    title: Optional[str] = None
    comment: str
    images: Optional[List[str]] = None


class ReviewUpdateRequest(BaseModel):
    rating: Optional[int] = Field(None, ge=1, le=5)
    title: Optional[str] = None
    comment: Optional[str] = None
    images: Optional[List[str]] = None


class UserProfileUpdateRequest(BaseModel):
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    phone: Optional[str] = None
    avatar: Optional[str] = None


class UploadResponse(BaseModel):
    success: bool = True
    message: str
    url: str
