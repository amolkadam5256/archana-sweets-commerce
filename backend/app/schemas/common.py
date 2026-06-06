"""Common response schemas."""

from typing import Any, Optional
from pydantic import BaseModel


class MessageResponse(BaseModel):
    success: bool = True
    message: str
    data: Optional[Any] = None


class ErrorResponse(BaseModel):
    success: bool = False
    message: str
    errors: Optional[dict] = None


class PaginationMeta(BaseModel):
    total: int
    page: int
    limit: int
    total_pages: int
    has_next_page: bool
    has_prev_page: bool


class PaginatedResponse(BaseModel):
    success: bool = True
    data: list
    meta: PaginationMeta
