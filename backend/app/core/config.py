import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PORT: int = 8000
    HOST: str = "0.0.0.0"
    MANGO_ROBOFLOW_API_KEY: str = ""
    GUAVA_ROBOFLOW_API_KEY: str = ""
    BANANA_ROBOFLOW_API_KEY: str = ""
    PAPAYA_ROBOFLOW_API_KEY: str = ""
    UPLOAD_DIR: str = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "uploads")

    model_config = SettingsConfigDict(
        env_file=os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), ".env"),
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()

# Ensure upload directory exists
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
