from fastapi import FastAPI
from app.db.database import engine
from app.models import HCP, Interaction

# ✅ Import routers
from app.api.interaction_routes import router as interaction_router
from app.api.hcp_routes import router as hcp_router
from app.api.ai_routes import router as ai_router   # 👈 your new AI route

from fastapi.middleware.cors import CORSMiddleware

# ✅ STEP 1: Create app FIRST
app = FastAPI(
    title="AI CRM HCP API",
    version="1.0.0"
)

# ✅ STEP 2: Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ STEP 3: DB Tables
HCP.metadata.create_all(bind=engine)
Interaction.metadata.create_all(bind=engine)

# ✅ STEP 4: Include routers (AFTER app creation)
app.include_router(interaction_router)
app.include_router(hcp_router)
app.include_router(ai_router)   # 👈 FIXED POSITION

# ✅ STEP 5: Root endpoint
@app.get("/")
def root():
    return {"message": "🚀 AI CRM HCP Backend Running"}