from fastapi import APIRouter
router = APIRouter()

@router.get("/")
async def payments_root():
    return {"success": True, "data": [], "message": "payments endpoint"}
