"""Category service business logic."""

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.product import Category, Product


class CategoryService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def list_categories(self) -> list[dict]:
        result = await self.db.execute(
            select(Category)
            .options(selectinload(Category.products))
            .where(Category.is_active == True)
            .order_by(Category.sort_order.asc(), Category.created_at.desc())
        )
        categories = result.scalars().all()
        return [self._category_to_dict(category) for category in categories]

    async def get_by_slug(self, slug: str) -> dict:
        result = await self.db.execute(
            select(Category).where(Category.slug == slug, Category.is_active == True)
        )
        category = result.scalar_one_or_none()
        if not category:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")
        return self._category_to_dict(category)

    async def create_category(self, data) -> dict:
        existing = await self.db.execute(select(Category).where(Category.slug == data.slug))
        if existing.scalar_one_or_none():
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Category slug already exists")

        category = Category(
            name=data.name,
            slug=data.slug,
            description=data.description,
            image=data.image,
            is_active=data.isActive,
            sort_order=data.sortOrder,
        )
        self.db.add(category)
        await self.db.flush()
        return self._category_to_dict(category)

    async def get_products_by_category(self, slug: str) -> list[dict]:
        result = await self.db.execute(
            select(Category).options(selectinload(Category.products).selectinload(Product.images)).where(
                Category.slug == slug, Category.is_active == True
            )
        )
        category = result.scalar_one_or_none()
        if not category:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")

        return [
            {
                "id": str(product.id),
                "name": product.name,
                "slug": product.slug,
                "shortDescription": product.short_description,
                "price": product.min_price,
                "categoryId": str(product.category_id),
                "isFeatured": product.is_featured,
                "isBestSeller": product.is_best_seller,
                "isNew": product.is_new,
                "images": [{"url": image.url, "altText": image.alt_text} for image in product.images],
            }
            for product in category.products
            if product.is_active
        ]

    @staticmethod
    def _category_to_dict(category: Category) -> dict:
        return {
            "id": str(category.id),
            "name": category.name,
            "slug": category.slug,
            "description": category.description,
            "image": category.image,
            "parentId": str(category.parent_id) if category.parent_id else None,
            "isActive": category.is_active,
            "sortOrder": category.sort_order,
            "createdAt": category.created_at.isoformat() if category.created_at else None,
        }
