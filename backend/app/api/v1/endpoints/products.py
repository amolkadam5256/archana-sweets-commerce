"""Product endpoints."""

from fastapi import APIRouter, Depends, Path, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional

from app.database.session import get_db
from app.services.product_service import ProductService
from app.services.review_service import ReviewService
from app.schemas.store import ProductCreateRequest, ProductUpdateRequest, ReviewCreateRequest
from app.core.dependencies import require_admin_user, get_current_user

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
    return await ProductService(db).get_products(
        page=page,
        limit=limit,
        category_id=category_id,
        min_price=min_price,
        max_price=max_price,
        is_featured=is_featured,
        is_best_seller=is_best_seller,
        search=search,
        sort_by=sort_by,
    )


@router.get("/featured")
async def get_featured_products(db: AsyncSession = Depends(get_db)):
    return await ProductService(db).get_featured()


@router.get("/best-sellers")
async def get_best_sellers(db: AsyncSession = Depends(get_db)):
    return await ProductService(db).get_best_sellers()


@router.get("/search")
async def search_products(
    q: str = Query(..., min_length=1),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    return await ProductService(db).search(q=q, page=page, limit=limit)


@router.post("/")
async def create_product(
    data: ProductCreateRequest,
    db: AsyncSession = Depends(get_db),
    _: object = Depends(require_admin_user),
):
    return await ProductService(db).create_product(data)


@router.put("/{product_id}")
async def update_product(
    data: ProductUpdateRequest,
    product_id: str = Path(...),
    db: AsyncSession = Depends(get_db),
    _: object = Depends(require_admin_user),
):
    return await ProductService(db).update_product(product_id, data)


@router.delete("/{product_id}")
async def delete_product(
    product_id: str = Path(...),
    db: AsyncSession = Depends(get_db),
    _: object = Depends(require_admin_user),
):
    return await ProductService(db).delete_product(product_id)


@router.get("/{product_id}/reviews")
async def get_product_reviews(
    product_id: str,
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=50),
    db: AsyncSession = Depends(get_db),
):
    return await ReviewService(db).list_reviews(product_id=product_id, page=page, limit=limit)


@router.post("/{product_id}/reviews")
async def submit_product_review(
    product_id: str,
    data: ReviewCreateRequest,
    db: AsyncSession = Depends(get_db),
    user: object = Depends(get_current_user),
):
    payload = data.model_dump()
    payload["productId"] = product_id
    review_data = ReviewCreateRequest(**payload)
    return await ReviewService(db).create_review(review_data, user)


@router.get("/{slug}")
async def get_product(slug: str, db: AsyncSession = Depends(get_db)):
    return await ProductService(db).get_by_slug(slug)
