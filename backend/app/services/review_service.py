"""Review service business logic."""

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.product import Review, Product
from app.models.user import User


class ReviewService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def list_reviews(self, product_id: str, page: int = 1, limit: int = 10) -> dict:
        query = select(Review).options(selectinload(Review.user)).where(Review.product_id == product_id)
        result = await self.db.execute(query.order_by(Review.created_at.desc()).offset((page - 1) * limit).limit(limit))
        reviews = result.scalars().all()
        return {
            "success": True,
            "data": [self._review_to_dict(review) for review in reviews],
            "meta": {
                "page": page,
                "limit": limit,
                "count": len(reviews),
            },
        }

    async def create_review(self, data, user: User) -> dict:
        product_result = await self.db.execute(select(Product).where(Product.id == data.productId, Product.is_active == True))
        product = product_result.scalar_one_or_none()
        if not product:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")

        review = Review(
            product_id=data.productId,
            user_id=user.id,
            rating=data.rating,
            title=data.title or "",
            comment=data.comment,
            images=data.images or [],
            is_verified_purchase=False,
        )
        self.db.add(review)
        await self.db.flush()

        return {
            "success": True,
            "message": "Review submitted successfully",
            "data": self._review_to_dict(review),
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
            "images": review.images or [],
            "isVerifiedPurchase": review.is_verified_purchase,
            "helpfulCount": review.helpful_count,
            "createdAt": review.created_at.isoformat() if review.created_at else None,
            "user": {
                "firstName": review.user.first_name,
                "lastName": review.user.last_name,
                "avatar": review.user.avatar,
            },
        }
