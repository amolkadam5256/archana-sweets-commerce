"""Category endpoints."""

from fastapi import APIRouter, Depends, Path
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.session import get_db
from app.services.category_service import CategoryService
from app.schemas.store import CategoryCreateRequest
from app.core.dependencies import require_admin_user

router = APIRouter()


@router.get("/")
async def list_categories(db: AsyncSession = Depends(get_db)):
    return {"success": True, "data": await CategoryService(db).list_categories()}


@router.get("/{slug}/products")
async def get_category_products(slug: str, db: AsyncSession = Depends(get_db)):
    return {"success": True, "data": await CategoryService(db).get_products_by_category(slug)}


@router.get("/{slug}")
async def get_category(slug: str, db: AsyncSession = Depends(get_db)):
    return {"success": True, "data": await CategoryService(db).get_by_slug(slug)}


@router.post("/")
async def create_category(
    data: CategoryCreateRequest,
    db: AsyncSession = Depends(get_db),
    _: object = Depends(require_admin_user),
):
    category = await CategoryService(db).create_category(data)
    return {"success": True, "message": "Category created successfully", "data": category}
