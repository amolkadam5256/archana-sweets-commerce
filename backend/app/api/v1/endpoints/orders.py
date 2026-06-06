from fastapi import APIRouter
router = APIRouter()

@router.get("/")
async def orders_root():
    return {"success": True, "data": [], "message": "orders endpoint"}
