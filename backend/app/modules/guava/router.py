import os
import shutil
import uuid
from fastapi import APIRouter, File, UploadFile, HTTPException, BackgroundTasks
from app.modules.guava.schemas import GuavaPredictionResponse
from app.modules.guava.service import predict_guava_grade
from app.core.config import settings

router = APIRouter(prefix="/guava", tags=["Guava Grading"])

def cleanup_temp_file(filepath: str):
    """Safely removes a temporary file after the request completes."""
    try:
        if os.path.exists(filepath):
            os.remove(filepath)
    except Exception as e:
        print(f"Error cleaning up temp file {filepath}: {e}")

@router.post("/predict", response_model=GuavaPredictionResponse)
async def predict_guava(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...)
):
    # Validation: Ensure it's an image
    if not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="Invalid file type. Please upload a valid image (JPEG, PNG, WEBP)."
        )

    file_extension = os.path.splitext(file.filename)[1]
    if not file_extension:
        file_extension = ".jpg"
        
    temp_filename = f"{uuid.uuid4()}{file_extension}"
    temp_filepath = os.path.join(settings.UPLOAD_DIR, temp_filename)

    try:
        with open(temp_filepath, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to save uploaded image: {str(e)}"
        )

    background_tasks.add_task(cleanup_temp_file, temp_filepath)

    try:
        result = predict_guava_grade(temp_filepath, filename=file.filename)
        return result
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction process encountered an error: {str(e)}"
        )
