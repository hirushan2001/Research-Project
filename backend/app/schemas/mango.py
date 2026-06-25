from pydantic import BaseModel, Field

class MangoPredictionResponse(BaseModel):
    grade: str = Field(..., description="The predicted grade of the mango (G1, G2, G3, G4)")
    confidence: float = Field(..., description="The confidence score of the prediction (0.0 to 1.0)")
    message: str = Field(..., description="The quality description message")
    prediction_time: float = Field(..., description="Time taken to process the prediction in seconds")
