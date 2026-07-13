import time
import random
import logging
import json
from typing import Dict, Any
from app.core.config import settings

logger = logging.getLogger("mango-grading")
logging.basicConfig(level=logging.INFO)

import base64
import requests

# We run a custom HTTP workflow client that supports Python 3.13+ directly without inference-sdk
HAS_INFERENCE_SDK = True
logger.info("Roboflow HTTP client loaded successfully.")

GRADE_MESSAGES = {
    "G1": "Excellent Quality (Premium quality, no visible spots or defects)",
    "G2": "Good Quality (Minor blemishes, suitable for standard retail)",
    "G3": "Average Quality (Moderate spots or shape defects, suitable for processing/local market)",
    "G4": "Poor Quality (Significant decay or damage, not recommended for consumption)"
}

def parse_roboflow_output(result: Any) -> Dict[str, Any]:
    """
    Attempts to search and parse the predicted class and confidence from a Roboflow API response.
    Supports a wide variety of model outputs (classification blocks, JSON responses).
    """
    logger.info(f"Raw Roboflow API result: {result}")
    
    # Standard output extraction logic
    if isinstance(result, list) and len(result) > 0:
        output_data = result[0]
    else:
        output_data = result
 
    # Let's search recursively for classification output
    grade = None
    confidence = None
 
    def search_dict(d: Any):
        nonlocal grade, confidence
        if not isinstance(d, dict):
            return
        
        if "predictions" in d and isinstance(d["predictions"], list) and len(d["predictions"]) > 0:
            pred = d["predictions"][0]
            if isinstance(pred, dict):
                if "class" in pred:
                    grade = pred["class"]
                elif "class_name" in pred:
                    grade = pred["class_name"]
                if "confidence" in pred:
                    confidence = pred["confidence"]
        
        if "top" in d:
            grade = d["top"]
        if "class" in d:
            grade = d["class"]
        if "confidence" in d and confidence is None:
            try:
                confidence = float(d["confidence"])
            except (ValueError, TypeError):
                pass
                
        for value in d.values():
            if isinstance(value, dict):
                search_dict(value)
            elif isinstance(value, list):
                for item in value:
                    search_dict(item)
 
    search_dict(output_data)
 
    if grade is not None:
        grade_str = str(grade).upper().strip()
        if "G1" in grade_str or "EXCELLENT" in grade_str:
            grade = "G1"
        elif "G2" in grade_str or "GOOD" in grade_str:
            grade = "G2"
        elif "G3" in grade_str or "AVERAGE" in grade_str:
            grade = "G3"
        elif "G4" in grade_str or "POOR" in grade_str:
            grade = "G4"
        else:
            grade = "G1" if "g1" in grade_str else "G2"
        
        confidence = float(confidence) if confidence is not None else 0.95
        return {"grade": grade, "confidence": confidence}
        
    raise ValueError("Could not extract grade from Roboflow response")


def predict_mango_grade(image_path: str, filename: str = "") -> Dict[str, Any]:
    """
    Sends an image to the Roboflow Serverless Inference API via HTTP POST.
    Falls back to a simulated mock prediction if the Roboflow API key is
    missing, empty, or set to the default placeholder.
    """
    start_time = time.time()
    
    # Check if API key is valid / set
    has_api_key = settings.ROBOFLOW_API_KEY and settings.ROBOFLOW_API_KEY.strip() != "" and settings.ROBOFLOW_API_KEY != "your_roboflow_api_key_here"
    
    if not has_api_key:
        logger.warning("Roboflow API Key is missing or default. Falling back to simulated mock prediction.")
        return simulate_mock_prediction(start_time, filename or os.path.basename(image_path))
        
    logger.info(f"Encoding image to base64: {image_path}")
    with open(image_path, "rb") as image_file:
        base64_data = base64.b64encode(image_file.read()).decode("ascii")

    url = f"https://serverless.roboflow.com/mango-grading-system/1?api_key={settings.ROBOFLOW_API_KEY}"
    headers = {"Content-Type": "application/x-www-form-urlencoded"}

    logger.info("Calling Roboflow Serverless Inference API (mango-grading-system/1)...")
    response = requests.post(url, data=base64_data, headers=headers, timeout=20)
    
    # If the response failed, extract the detailed Roboflow compile/execution error
    if response.status_code != 200:
        try:
            error_details = response.json()
            error_msg = error_details.get("message", response.text)
            raise ValueError(f"Roboflow Server Error: {error_msg}")
        except Exception:
            response.raise_for_status()
            
    result = response.json()
    
    # Log the raw model output for diagnostics
    logger.info("==================================================")
    logger.info(f"RAW ROBOFLOW API RESPONSE:\n{json.dumps(result, indent=2)}")
    logger.info("==================================================")
    
    parsed = parse_roboflow_output(result)
    grade = parsed["grade"]
    confidence = parsed["confidence"]
    
    prediction_time = round(time.time() - start_time, 2)
    message = GRADE_MESSAGES.get(grade, "Unknown Quality")
    
    return {
        "grade": grade,
        "confidence": confidence,
        "message": message,
        "prediction_time": prediction_time
    }


def simulate_mock_prediction(start_time: float, filename: str) -> Dict[str, Any]:
    """
    Generates a realistic mock prediction based on the filename to aid testing/demoing.
    """
    # Introduce a short delay to simulate network latency
    time.sleep(random.uniform(0.5, 1.2))
    
    fn_lower = filename.lower()
    
    # Determine grade based on filename for demo control, otherwise random
    if "g1" in fn_lower or "excellent" in fn_lower:
        grade = "G1"
    elif "g2" in fn_lower or "good" in fn_lower:
        grade = "G2"
    elif "g3" in fn_lower or "average" in fn_lower or "medium" in fn_lower:
        grade = "G3"
    elif "g4" in fn_lower or "poor" in fn_lower or "bad" in fn_lower:
        grade = "G4"
    else:
        # Weighted random selection (highly favoring good/excellent mangoes)
        grade = random.choices(["G1", "G2", "G3", "G4"], weights=[0.4, 0.35, 0.15, 0.10])[0]
        
    # Generate realistic confidence score
    if grade == "G1":
        confidence = round(random.uniform(0.92, 0.99), 2)
    elif grade == "G2":
        confidence = round(random.uniform(0.85, 0.93), 2)
    elif grade == "G3":
        confidence = round(random.uniform(0.75, 0.88), 2)
    else:
        confidence = round(random.uniform(0.70, 0.85), 2)
        
    message = GRADE_MESSAGES[grade]
    prediction_time = round(time.time() - start_time, 2)
    
    return {
        "grade": grade,
        "confidence": confidence,
        "message": message,
        "prediction_time": prediction_time
    }
