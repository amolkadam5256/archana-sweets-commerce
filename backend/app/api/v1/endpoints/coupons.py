from fastapi import APIRouter
router = APIRouter()

@router.get("/")
async def coupons_root():
    return {"success": True, "data": [], "message": "coupons endpoint"}
