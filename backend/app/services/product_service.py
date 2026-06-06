"""Product service business logic."""

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_, and_, func
from sqlalchemy.orm import selectinload
from fastapi import HTTPException, status

from app.models.product import Product, Category, Review
from app.schemas.common import PaginationMeta


class ProductService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_products(self, page=1, limit=20, **filters) -> dict:
        query = select(Product).options(
            selectinload(Product.images),
            selectinload(Product.variants),
            selectinload(Product.category),
        ).where(Product.is_active == True)

        if filters.get("category_id"):
            query = query.where(Product.category_id == filters["category_id"])
        if filters.get("is_featured"):
            query = query.where(Product.is_featured == True)
        if filters.get("is_best_seller"):
            query = query.where(Product.is_best_seller == True)
        if filters.get("min_price"):
            query = query.where(Product.min_price >= filters["min_price"])
        if filters.get("max_price"):
            query = query.where(Product.max_price <= filters["max_price"])
        if filters.get("search"):
            term = f"%{filters['search']}%"
            query = query.where(or_(Product.name.ilike(term), Product.description.ilike(term)))

        # Count total
        count_result = await self.db.execute(select(func.count()).select_from(query.subquery()))
        total = count_result.scalar()

        # Sort
        sort_by = filters.get("sort_by", "newest")
        if sort_by == "price_asc":
            query = query.order_by(Product.min_price.asc())
        elif sort_by == "price_desc":
            query = query.order_by(Product.min_price.desc())
        elif sort_by == "rating":
            query = query.order_by(Product.rating.desc())
        elif sort_by == "popular":
            query = query.order_by(Product.review_count.desc())
        else:
            query = query.order_by(Product.created_at.desc())

        # Paginate
        query = query.offset((page - 1) * limit).limit(limit)
        result = await self.db.execute(query)
        products = result.scalars().all()

        total_pages = (total + limit - 1) // limit
        return {
            "success": True,
            "data": [self._product_to_dict(p) for p in products],
            "meta": {
                "total": total, "page": page, "limit": limit,
                "totalPages": total_pages,
                "hasNextPage": page < total_pages,
                "hasPrevPage": page > 1,
            },
        }

    async def get_by_slug(self, slug: str) -> dict:
        result = await self.db.execute(
            select(Product)
            .options(selectinload(Product.images), selectinload(Product.variants), selectinload(Product.category))
            .where(Product.slug == slug, Product.is_active == True)
        )
        product = result.scalar_one_or_none()
        if not product:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
        return {"success": True, "data": self._product_to_dict(product)}

    async def get_featured(self) -> dict:
        result = await self.db.execute(
            select(Product)
            .options(selectinload(Product.images), selectinload(Product.variants))
            .where(Product.is_featured == True, Product.is_active == True)
            .limit(8)
        )
        products = result.scalars().all()
        return {"success": True, "data": [self._product_to_dict(p) for p in products]}

    async def get_best_sellers(self) -> dict:
        result = await self.db.execute(
            select(Product)
            .options(selectinload(Product.images), selectinload(Product.variants))
            .where(Product.is_best_seller == True, Product.is_active == True)
            .order_by(Product.review_count.desc())
            .limit(8)
        )
        products = result.scalars().all()
        return {"success": True, "data": [self._product_to_dict(p) for p in products]}

    async def search(self, q: str, page=1, limit=20) -> dict:
        return await self.get_products(page=page, limit=limit, search=q)

    async def get_reviews(self, product_id: str, page=1, limit=10) -> dict:
        result = await self.db.execute(
            select(Review)
            .where(Review.product_id == product_id)
            .order_by(Review.created_at.desc())
            .offset((page - 1) * limit)
            .limit(limit)
        )
        reviews = result.scalars().all()
        return {"success": True, "data": reviews, "meta": {"page": page, "limit": limit}}

    @staticmethod
    def _product_to_dict(p: Product) -> dict:
        return {
            "id": str(p.id),
            "name": p.name,
            "slug": p.slug,
            "shortDescription": p.short_description,
            "rating": p.rating,
            "reviewCount": p.review_count,
            "minPrice": p.min_price,
            "maxPrice": p.max_price,
            "isFeatured": p.is_featured,
            "isBestSeller": p.is_best_seller,
            "isNew": p.is_new,
            "images": [{"url": img.url, "altText": img.alt_text, "isPrimary": img.is_primary} for img in p.images],
            "variants": [{"id": str(v.id), "weight": v.weight, "unit": v.unit, "price": v.price, "stock": v.stock} for v in p.variants],
        }
