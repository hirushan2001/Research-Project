from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.modules.mango.router import router as mango_router
from app.modules.guava.router import router as guava_router
from app.modules.banana.router import router as banana_router
from app.modules.papaya.router import router as papaya_router
from app.core.config import settings

app = FastAPI(
    title="Fruit Quality Assessment System API",
    description="Backend services for Mango, Guava, Banana, and Papaya grading models.",
    version="1.0.0"
)

# CORS configuration
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(mango_router, prefix="/api")
app.include_router(guava_router, prefix="/api")
app.include_router(banana_router, prefix="/api")
app.include_router(papaya_router, prefix="/api")

@app.get("/")
def read_root():
    has_mango_key = bool(settings.MANGO_ROBOFLOW_API_KEY and settings.MANGO_ROBOFLOW_API_KEY.strip() != "" and settings.MANGO_ROBOFLOW_API_KEY != "your_mango_api_key_here")
    has_guava_key = bool(settings.GUAVA_ROBOFLOW_API_KEY and settings.GUAVA_ROBOFLOW_API_KEY.strip() != "" and settings.GUAVA_ROBOFLOW_API_KEY != "your_guava_api_key_here")
    has_banana_key = bool(settings.BANANA_ROBOFLOW_API_KEY and settings.BANANA_ROBOFLOW_API_KEY.strip() != "" and settings.BANANA_ROBOFLOW_API_KEY != "your_banana_api_key_here")
    has_papaya_key = bool(settings.PAPAYA_ROBOFLOW_API_KEY and settings.PAPAYA_ROBOFLOW_API_KEY.strip() != "" and settings.PAPAYA_ROBOFLOW_API_KEY != "your_papaya_api_key_here")
    
    mock_mode = not (has_mango_key or has_guava_key or has_banana_key or has_papaya_key)
    
    return {
        "status": "healthy",
        "app": "Fruit Quality Assessment System API",
        "version": "1.0.0",
        "active_modules": ["mango", "guava", "banana", "papaya"],
        "mock_mode": mock_mode
    }
