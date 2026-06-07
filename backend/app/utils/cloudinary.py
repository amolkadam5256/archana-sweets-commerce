"""Cloudinary upload helper."""

import hashlib
import httpx
import time
from typing import Optional

from app.core.config import settings


class CloudinaryError(Exception):
    pass


async def upload_image(file_bytes: bytes, filename: str, folder: Optional[str] = None) -> str:
    if not settings.CLOUDINARY_API_KEY or not settings.CLOUDINARY_API_SECRET or not settings.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
        raise CloudinaryError("Cloudinary configuration is required")

    timestamp = int(time.time())
    payload = f"timestamp={timestamp}"
    if folder:
        payload += f"&folder={folder}"
    payload += settings.CLOUDINARY_API_SECRET
    signature = hashlib.sha1(payload.encode("utf-8")).hexdigest()

    data = {
        "api_key": settings.CLOUDINARY_API_KEY,
        "timestamp": timestamp,
        "signature": signature,
    }
    if folder:
        data["folder"] = folder

    url = f"https://api.cloudinary.com/v1_1/{settings.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload"
    async with httpx.AsyncClient(timeout=30) as client:
        response = await client.post(
            url,
            data=data,
            files={"file": (filename, file_bytes)},
        )

    if response.status_code != 200:
        raise CloudinaryError(f"Cloudinary upload failed: {response.text}")

    result = response.json()
    return result.get("secure_url")
