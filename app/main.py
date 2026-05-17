from fastapi import FastAPI
from .api import sos, users
from .database import init_db

app = FastAPI(title="Road SOS API")

# Initialize database
init_db()

# Include routers
app.include_router(sos.router)
app.include_router(users.router)

@app.get("/")
async def root():
    return {"message": "Welcome to Road SOS API"}
