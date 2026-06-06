from fastapi import APIRouter
router = APIRouter()

@router.get("/")
async def cart_root():
    return {"success": True, "data": [], "message": "cart endpoint"}
