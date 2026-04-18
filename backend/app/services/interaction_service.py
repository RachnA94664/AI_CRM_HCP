from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.interaction import Interaction
from app.schemas.interaction import InteractionCreate


# ✅ CREATE Interaction
def create_interaction(db: Session, data: InteractionCreate):
    new_interaction = Interaction(
        hcp_name=data.hcp_name,
        interaction_type=data.interaction_type,
        notes=data.notes,
        sentiment=data.sentiment
    )

    db.add(new_interaction)
    db.commit()
    db.refresh(new_interaction)

    return new_interaction


# ✅ GET ALL Interactions
def get_interactions(db: Session):
    return db.query(Interaction).all()


# ✅ UPDATE Interaction
def update_interaction(db: Session, interaction_id: int, data: InteractionCreate):
    interaction = db.query(Interaction).filter(Interaction.id == interaction_id).first()

    if not interaction:
        raise HTTPException(status_code=404, detail="Interaction not found")

    interaction.hcp_name = data.hcp_name
    interaction.interaction_type = data.interaction_type
    interaction.notes = data.notes
    interaction.sentiment = data.sentiment

    db.commit()
    db.refresh(interaction)

    return interaction

# from app.models.interaction import Interaction
# from fastapi import HTTPException

# def update_interaction(db, interaction_id, data):
#     interaction = db.query(Interaction).filter(Interaction.id == interaction_id).first()

#     if not interaction:
#         raise HTTPException(status_code=404, detail="Interaction not found")

#     interaction.hcp_name = data.hcp_name
#     interaction.interaction_type = data.interaction_type
#     interaction.notes = data.notes
#     interaction.sentiment = data.sentiment

#     db.commit()
#     db.refresh(interaction)

#     return interaction