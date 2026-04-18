from pydantic import BaseModel
from typing import Optional


# 🔹 Request Schema (CREATE)
class InteractionCreate(BaseModel):
    hcp_name: str
    interaction_type: str
    notes: Optional[str] = None
    sentiment: Optional[str] = None


# 🔹 Response Schema
class InteractionResponse(BaseModel):
    id: int
    hcp_name: str
    interaction_type: str
    notes: Optional[str]
    sentiment: Optional[str]

    class Config:
        from_attributes = True