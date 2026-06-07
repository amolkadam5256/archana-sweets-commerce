from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.session import get_db
from app.core.dependencies import get_current_user
from app.schemas.store import UserProfileUpdateRequest

router = APIRouter()


@router.get("/me")
async def get_my_profile(
    user=Depends(get_current_user),
) -> dict:
    return {
        "success": True,
        "data": {
            "id": str(user.id),
            "email": user.email,
            "phone": user.phone,
            "firstName": user.first_name,
            "lastName": user.last_name,
            "avatar": user.avatar,
            "role": user.role,
            "isEmailVerified": user.is_email_verified,
            "isPhoneVerified": user.is_phone_verified,
            "createdAt": user.created_at.isoformat() if user.created_at else None,
            "updatedAt": user.updated_at.isoformat() if user.updated_at else None,
        },
    }


@router.put("/me")
async def update_my_profile(
    data: UserProfileUpdateRequest,
    db: AsyncSession = Depends(get_db),
    user=Depends(get_current_user),
) -> dict:
    if data.firstName is not None:
        user.first_name = data.firstName
    if data.lastName is not None:
        user.last_name = data.lastName
    if data.phone is not None:
        user.phone = data.phone
    if data.avatar is not None:
        user.avatar = data.avatar

    await db.flush()
    return {
        "success": True,
        "message": "Profile updated successfully",
        "data": {
            "id": str(user.id),
            "email": user.email,
            "phone": user.phone,
            "firstName": user.first_name,
            "lastName": user.last_name,
            "avatar": user.avatar,
            "role": user.role,
            "isEmailVerified": user.is_email_verified,
            "isPhoneVerified": user.is_phone_verified,
            "createdAt": user.created_at.isoformat() if user.created_at else None,
            "updatedAt": user.updated_at.isoformat() if user.updated_at else None,
        },
    }
