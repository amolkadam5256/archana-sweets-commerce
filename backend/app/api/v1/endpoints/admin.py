from fastapi import APIRouter, Depends
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.session import get_db
from app.core.dependencies import require_admin_user
from app.models.product import Product, Category
from app.models.user import User

router = APIRouter()


@router.get("/dashboard")
async def get_admin_dashboard(
    db: AsyncSession = Depends(get_db),
    _: object = Depends(require_admin_user),
) -> dict:
    product_count = await db.execute(select(func.count()).select_from(Product))
    category_count = await db.execute(select(func.count()).select_from(Category))
    user_count = await db.execute(select(func.count()).select_from(User))

    return {
        "success": True,
        "data": {
            "productCount": product_count.scalar() or 0,
            "categoryCount": category_count.scalar() or 0,
            "userCount": user_count.scalar() or 0,
        },
        "message": "Admin dashboard summary",
    }
