"""
ArchanaSweets.com — FastAPI Backend
Enterprise eCommerce API
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.responses import JSONResponse

from app.core.config import settings
from app.core.logging import configure_logging
from app.database.session import init_db
from app.api.v1.router import api_router
from app.middleware.rate_limit import setup_rate_limiter


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application startup/shutdown lifecycle."""
    # Startup
    configure_logging()
    await init_db()
    yield
    # Shutdown — cleanup resources here


def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.APP_NAME,
        description="ArchanaSweets.com — Premium Homemade Indian Sweets eCommerce API",
        version=settings.API_VERSION,
        docs_url="/api/docs" if settings.DEBUG else None,
        redoc_url="/api/redoc" if settings.DEBUG else None,
        openapi_url="/api/openapi.json" if settings.DEBUG else None,
        lifespan=lifespan,
    )

    # ── CORS ──────────────────────────────────────────────────
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.ALLOWED_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # ── Rate Limiting ─────────────────────────────────────────
    setup_rate_limiter(app)

    # ── API Router ────────────────────────────────────────────
    app.include_router(api_router, prefix=settings.API_PREFIX)

    # ── Health Check ──────────────────────────────────────────
    @app.get("/health", tags=["Health"])
    async def health_check():
        return JSONResponse({"status": "healthy", "service": settings.APP_NAME})

    return app


app = create_app()
