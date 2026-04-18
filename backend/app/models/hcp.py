from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.db.database import Base

class HCP(Base):
    __tablename__ = "hcp"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)

    interactions = relationship("Interaction", back_populates="hcp")

from pydantic import BaseModel

class HCPCreate(BaseModel):
    name: str


class HCPResponse(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True