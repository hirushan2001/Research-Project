from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import mango
from app.core.config import settings
from app.services.roboflow_service import HAS_INFERENCE_SDK

app = FastAPI(
    title="Fruit Quality Assessment System API",
    description="Backend services for Mango, Guava, Banana, and Papaya grading models.",
    version="1.0.0"
)

# CORS configuration
# Configure permissions for the frontend Vite development server and production builds
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
app.include_router(mango.router, prefix="/api")

@app.get("/")
def read_root():
    has_api_key = bool(settings.ROBOFLOW_API_KEY and settings.ROBOFLOW_API_KEY != "your_roboflow_api_key_here")
    mock_mode = not HAS_INFERENCE_SDK or not has_api_key
    
    return {
        "status": "healthy",
        "app": "Fruit Quality Assessment System API",
        "version": "1.0.0",
        "active_modules": ["mango"],
        "mock_mode": mock_mode
    }
