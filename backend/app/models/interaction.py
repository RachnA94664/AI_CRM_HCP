from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base
from pydantic import BaseModel
from typing import Optional

class Interaction(Base):
    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)

    hcp_name = Column(String)
    interaction_type = Column(String)
    notes = Column(Text)
    sentiment = Column(String)

    hcp_id = Column(Integer, ForeignKey("hcp.id"))

    hcp = relationship("HCP", back_populates="interactions")



# Request Schema (CREATE)
class InteractionCreate(BaseModel):
    hcp_name: str
    interaction_type: str
    notes: Optional[str] = None
    sentiment: Optional[str] = None


# Response Schema
class InteractionResponse(BaseModel):
    id: int
    hcp_name: str
    interaction_type: str
    notes: Optional[str]
    sentiment: Optional[str]

    class Config:
        from_attributes = True