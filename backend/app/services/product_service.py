"""Product service business logic."""

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_, func
from sqlalchemy.orm import selectinload
from fastapi import HTTPException, status

from app.models.product import Product, Category, Review, ProductImage, ProductVariant


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

        count_result = await self.db.execute(select(func.count()).select_from(query.subquery()))
        total = count_result.scalar() or 0

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

        query = query.offset((page - 1) * limit).limit(limit)
        result = await self.db.execute(query)
        products = result.scalars().all()

        total_pages = (total + limit - 1) // limit if total else 0
        return {
            "success": True,
            "data": [self._product_to_dict(p) for p in products],
            "meta": {
                "total": total,
                "page": page,
                "limit": limit,
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
        return {"success": True, "data": [self._review_to_dict(review) for review in reviews], "meta": {"page": page, "limit": limit}}

    async def create_product(self, data) -> dict:
        existing = await self.db.execute(select(Product).where(Product.slug == data.slug))
        if existing.scalar_one_or_none():
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Product slug already exists")

        product = Product(
            name=data.name,
            slug=data.slug,
            description=data.description,
            short_description=data.shortDescription,
            category_id=data.categoryId,
            tags=data.tags or [],
            is_featured=data.isFeatured,
            is_best_seller=data.isBestSeller,
            is_new=data.isNew,
            is_active=data.isActive,
            shelf_life=data.shelfLife,
            ingredients=data.ingredients,
            allergens=data.allergens,
            meta_title=data.metaTitle,
            meta_description=data.metaDescription,
        )

        self._attach_variants(product, data)
        self._attach_images(product, data)

        self.db.add(product)
        await self.db.flush()
        return {"success": True, "data": self._product_to_dict(product), "message": "Product created successfully"}

    async def update_product(self, product_id: str, data) -> dict:
        result = await self.db.execute(select(Product).where(Product.id == product_id))
        product = result.scalar_one_or_none()
        if not product:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
        if data.slug and data.slug != product.slug:
            slug_result = await self.db.execute(select(Product).where(Product.slug == data.slug))
            if slug_result.scalar_one_or_none():
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Product slug already exists")

        for field in [
            "name",
            "slug",
            "description",
            "shortDescription",
            "categoryId",
            "tags",
            "isFeatured",
            "isBestSeller",
            "isNew",
            "isActive",
            "shelfLife",
            "ingredients",
            "allergens",
            "metaTitle",
            "metaDescription",
        ]:
            if getattr(data, field, None) is not None:
                setattr(product, self._to_snake(field), getattr(data, field))

        if data.variants is not None:
            product.variants.clear()
            self._attach_variants(product, data)

        if data.images is not None:
            product.images.clear()
            self._attach_images(product, data)

        await self.db.flush()
        return {"success": True, "data": self._product_to_dict(product), "message": "Product updated successfully"}

    async def delete_product(self, product_id: str) -> dict:
        result = await self.db.execute(select(Product).where(Product.id == product_id))
        product = result.scalar_one_or_none()
        if not product:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
        await self.db.delete(product)
        return {"success": True, "message": "Product deleted successfully"}

    @staticmethod
    def _attach_variants(product: Product, data) -> None:
        variants = data.variants or []
        if not variants:
            return
        product.variants = [
            ProductVariant(
                weight=variant.weight,
                unit=variant.unit,
                price=variant.price,
                original_price=variant.originalPrice,
                stock=variant.stock,
                sku=variant.sku or "",
                is_active=variant.isActive,
            )
            for variant in variants
        ]
        prices = [variant.price for variant in product.variants]
        if prices:
            product.min_price = min(prices)
            product.max_price = max(prices)

    @staticmethod
    def _attach_images(product: Product, data) -> None:
        product.images = [
            ProductImage(
                url=image.url,
                alt_text=image.altText,
                is_primary=image.isPrimary,
                sort_order=image.sortOrder,
            )
            for image in (data.images or [])
        ]

    @staticmethod
    def _product_to_dict(p: Product) -> dict:
        return {
            "id": str(p.id),
            "name": p.name,
            "slug": p.slug,
            "shortDescription": p.short_description,
            "description": p.description,
            "categoryId": str(p.category_id),
            "category": {
                "id": str(p.category.id),
                "name": p.category.name,
                "slug": p.category.slug,
            } if p.category else None,
            "tags": p.tags or [],
            "isFeatured": p.is_featured,
            "isBestSeller": p.is_best_seller,
            "isNew": p.is_new,
            "isActive": p.is_active,
            "rating": p.rating,
            "reviewCount": p.review_count,
            "minPrice": p.min_price,
            "maxPrice": p.max_price,
            "shelfLife": p.shelf_life,
            "ingredients": p.ingredients,
            "allergens": p.allergens,
            "metaTitle": p.meta_title,
            "metaDescription": p.meta_description,
            "createdAt": p.created_at.isoformat() if p.created_at else None,
            "updatedAt": p.updated_at.isoformat() if p.updated_at else None,
            "images": [
                {
                    "id": str(img.id),
                    "url": img.url,
                    "altText": img.alt_text,
                    "isPrimary": img.is_primary,
                    "sortOrder": img.sort_order,
                }
                for img in p.images
            ],
            "variants": [
                {
                    "id": str(v.id),
                    "weight": v.weight,
                    "unit": v.unit,
                    "price": v.price,
                    "originalPrice": v.original_price,
                    "stock": v.stock,
                    "sku": v.sku,
                    "isActive": v.is_active,
                }
                for v in p.variants
            ],
        }

    @staticmethod
    def _review_to_dict(review: Review) -> dict:
        return {
            "id": str(review.id),
            "productId": str(review.product_id),
            "userId": str(review.user_id),
            "rating": review.rating,
            "title": review.title,
            "comment": review.comment,
            "isVerifiedPurchase": review.is_verified_purchase,
            "helpfulCount": review.helpful_count,
            "createdAt": review.created_at.isoformat() if review.created_at else None,
            "user": {
                "firstName": review.user.first_name,
                "lastName": review.user.last_name,
                "avatar": review.user.avatar,
            },
        }

    @staticmethod
    def _to_snake(name: str) -> str:
        return ''.join(['_' + c.lower() if c.isupper() else c for c in name]).lstrip('_')
