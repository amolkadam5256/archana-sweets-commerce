from fastapi import APIRouter
router = APIRouter()

@router.get("/")
async def wishlist_root():
    return {"success": True, "data": [], "message": "wishlist endpoint"}
