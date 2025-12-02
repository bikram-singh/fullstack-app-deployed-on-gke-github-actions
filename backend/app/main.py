from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .db import get_db_connection

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔥 NEW — Root path for GCE health check
@app.get("/")
def root():
    return {"status": "ok"}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/db-check")
def db_check():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT 1 AS alive;")
        row = cur.fetchone()
        cur.close()
        conn.close()
        return {"db": "connected", "result": row}
    except Exception as e:
        return {"db": "error", "error": str(e)}

@app.get("/items")
def get_items():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT id, name FROM items LIMIT 10;")
        rows = cur.fetchall()
        cur.close()
        conn.close()
        return {"items": rows}
    except Exception as e:
        return {"error": str(e)}
