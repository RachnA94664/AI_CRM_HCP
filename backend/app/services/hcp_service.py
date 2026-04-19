# from app.models.hcp import HCP
# from fastapi import HTTPException

# def get_hcp_by_id(db, hcp_id):
#     hcp = db.query(HCP).filter(HCP.id == hcp_id).first()

#     if not hcp:
#         raise HTTPException(status_code=404, detail="HCP not found")

#     return hcp