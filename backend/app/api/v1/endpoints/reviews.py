from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.session import get_db
from app.services.review_service import ReviewService
from app.schemas.store import ReviewCreateRequest
from app.core.dependencies import get_current_user

router = APIRouter()


@router.get("/")
async def list_reviews(
    product_id: str | None = Query(None),
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=50),
    db: AsyncSession = Depends(get_db),
):
    if not product_id:
        return {"success": True, "data": [], "meta": {"page": page, "limit": limit}}
    return await ReviewService(db).list_reviews(product_id=product_id, page=page, limit=limit)


@router.post("/")
async def create_review(
    data: ReviewCreateRequest,
    db: AsyncSession = Depends(get_db),
    user: object = Depends(get_current_user),
):
    return await ReviewService(db).create_review(data, user)
