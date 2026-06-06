from fastapi import APIRouter
router = APIRouter()

@router.get("/")
async def reviews_root():
    return {"success": True, "data": [], "message": "reviews endpoint"}
