import os
import shutil
import uuid
from fastapi import APIRouter, File, UploadFile, HTTPException, BackgroundTasks
from app.modules.mango.schemas import MangoPredictionResponse
from app.modules.mango.service import predict_mango_grade
from app.core.config import settings

router = APIRouter(prefix="/mango", tags=["Mango Grading"])

def cleanup_temp_file(filepath: str):
    """Safely removes a temporary file after the request completes."""
    try:
        if os.path.exists(filepath):
            os.remove(filepath)
    except Exception as e:
        # Log error in background thread
        print(f"Error cleaning up temp file {filepath}: {e}")

@router.post("/predict", response_model=MangoPredictionResponse)
async def predict_mango(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...)
):
    # Validation: Ensure it's an image
    if not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="Invalid file type. Please upload a valid image (JPEG, PNG, WEBP)."
        )

    # Generate unique filename to avoid collision
    file_extension = os.path.splitext(file.filename)[1]
    if not file_extension:
        # Default extension if none provided
        file_extension = ".jpg"
        
    temp_filename = f"{uuid.uuid4()}{file_extension}"
    temp_filepath = os.path.join(settings.UPLOAD_DIR, temp_filename)

    try:
        # Save uploaded file to temp path
        with open(temp_filepath, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to save uploaded image: {str(e)}"
        )

    # Register background task to clean up the temporary file
    background_tasks.add_task(cleanup_temp_file, temp_filepath)

    try:
        # Execute Roboflow serverless model inference
        result = predict_mango_grade(temp_filepath, filename=file.filename)
        return result
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction process encountered an error: {str(e)}"
        )
