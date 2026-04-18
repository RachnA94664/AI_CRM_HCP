from fastapi import FastAPI
from app.db.database import engine
from app.models import HCP, Interaction

# ✅ Import routers
from app.api.interaction_routes import router as interaction_router
from app.api.hcp_routes import router as hcp_router
from fastapi.middleware.cors import CORSMiddleware

# ✅ Step 1: Create app FIRST
app = FastAPI(
    title="AI CRM HCP API",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for now (later restrict)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Step 2: Create DB Tables
HCP.metadata.create_all(bind=engine)
Interaction.metadata.create_all(bind=engine)


# ✅ Step 3: Register routes
app.include_router(interaction_router)
app.include_router(hcp_router)


# ✅ Step 4: Root endpoint
@app.get("/")
def root():
    return {"message": "🚀 AI CRM HCP Backend Running"}