from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.interaction import InteractionCreate, InteractionResponse
from app.services import interaction_service

# ✅ Router with prefix
router = APIRouter(
    prefix="/interactions",
    tags=["Interactions"]
)


# 🔹 CREATE Interaction
@router.post("/", response_model=InteractionResponse)
def create_interaction(
    data: InteractionCreate,
    db: Session = Depends(get_db)
):
    return interaction_service.create_interaction(db, data)


# 🔹 GET ALL Interactions
@router.get("/", response_model=list[InteractionResponse])
def get_all_interactions(db: Session = Depends(get_db)):
    return interaction_service.get_interactions(db)

# 🔹 UPDATE
@router.put("/{interaction_id}", response_model=InteractionResponse)
def update_interaction(
    interaction_id: int,
    data: InteractionCreate,
    db: Session = Depends(get_db)
):
    return interaction_service.update_interaction(db, interaction_id, data)