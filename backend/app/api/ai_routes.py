from fastapi import APIRouter
from pydantic import BaseModel
from app.services.ai_service import extract_interaction_from_text

router = APIRouter(prefix="/ai", tags=["AI"])


class TextInput(BaseModel):
    text: str


@router.post("/extract")
def extract_data(data: TextInput):
    result = extract_interaction_from_text(data.text)
    return {"data": result}