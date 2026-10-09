import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers import meta, creators, briefs, auth, dashboard
from backend.database import ensure_db

app = FastAPI(
    title="AI Content Creator Marketplace API",
    description="API connecting AI creators with brands and creative agencies.",
    version="1.0.0"
)

frontend_url = os.environ.get("FRONTEND_URL", "http://localhost:3000").rstrip("/")

allowed_origins = [
    frontend_url,
    "https://vyntrav.vercel.app",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_origin_regex=r"https://.*\.vercel\.app|https://.*\.onrender\.com",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    ensure_db()

# Mount routers at root level
app.include_router(auth.router)
app.include_router(meta.router)
app.include_router(creators.router)
app.include_router(briefs.router)
app.include_router(dashboard.router)

# Mount routers with /api prefix for dual compatibility
app.include_router(auth.router, prefix="/api")
app.include_router(meta.router, prefix="/api")
app.include_router(creators.router, prefix="/api")
app.include_router(briefs.router, prefix="/api")
app.include_router(dashboard.router, prefix="/api")

@app.get("/health", tags=["health"])
@app.get("/api/health", tags=["health"])
def health_check():
    return {"status": "ok", "database": "connected"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
