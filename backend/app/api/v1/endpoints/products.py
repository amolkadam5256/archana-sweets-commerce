"""Product endpoints."""

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional

from app.database.session import get_db
from app.services.product_service import ProductService

router = APIRouter()


@router.get("/")
async def list_products(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    category_id: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    is_featured: Optional[bool] = None,
    is_best_seller: Optional[bool] = None,
    search: Optional[str] = None,
    sort_by: Optional[str] = "newest",
    db: AsyncSession = Depends(get_db),
):
    """List products with filtering, sorting, pagination."""
    return await ProductService(db).get_products(
        page=page, limit=limit, category_id=category_id,
        min_price=min_price, max_price=max_price,
        is_featured=is_featured, is_best_seller=is_best_seller,
        search=search, sort_by=sort_by,
    )


@router.get("/featured")
async def get_featured_products(db: AsyncSession = Depends(get_db)):
    """Get featured products for homepage."""
    return await ProductService(db).get_featured()


@router.get("/best-sellers")
async def get_best_sellers(db: AsyncSession = Depends(get_db)):
    """Get best-selling products."""
    return await ProductService(db).get_best_sellers()


@router.get("/search")
async def search_products(
    q: str = Query(..., min_length=1),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    """Full-text product search."""
    return await ProductService(db).search(q=q, page=page, limit=limit)


@router.get("/{slug}")
async def get_product(slug: str, db: AsyncSession = Depends(get_db)):
    """Get product by slug."""
    return await ProductService(db).get_by_slug(slug)


@router.get("/{product_id}/reviews")
async def get_product_reviews(
    product_id: str,
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=50),
    db: AsyncSession = Depends(get_db),
):
    """Get reviews for a product."""
    return await ProductService(db).get_reviews(product_id=product_id, page=page, limit=limit)
