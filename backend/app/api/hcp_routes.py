from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.services import hcp_service
from app.models.hcp import HCP

router = APIRouter(prefix="/hcp", tags=["HCP"])


@router.get("/{hcp_id}")
def get_hcp(hcp_id: int, db: Session = Depends(get_db)):
    return hcp_service.get_hcp_by_id(db, hcp_id)