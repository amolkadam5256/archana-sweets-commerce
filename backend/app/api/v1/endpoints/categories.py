"""Middleware stubs for remaining endpoints."""

from fastapi import APIRouter

# categories
router = APIRouter()

@router.get("/")
async def list_categories():
    return {"success": True, "data": [], "message": "Categories"} 
