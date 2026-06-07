"""Upload endpoints for Cloudinary media storage."""

from fastapi import APIRouter, Depends, File, UploadFile

from app.core.dependencies import require_admin_user
from app.utils.cloudinary import upload_image, CloudinaryError
from app.schemas.store import UploadResponse

router = APIRouter()


@router.post("/", response_model=UploadResponse)
async def upload_media(
    file: UploadFile = File(...),
    folder: str | None = None,
    _: object = Depends(require_admin_user),
):
    try:
        contents = await file.read()
        url = await upload_image(contents, file.filename, folder=folder or "archana_sweets")
        return {"success": True, "message": "Image uploaded successfully", "url": url}
    except CloudinaryError as exc:
        return {"success": False, "message": str(exc), "url": ""}
