from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.database import get_db

router = APIRouter()


class SignInRequest(BaseModel):
    email: str


class UserResponse(BaseModel):
    id: int
    email: str


@router.post("/signin", response_model=UserResponse)
def signin(req: SignInRequest):
    if not req.email or "@" not in req.email:
        raise HTTPException(status_code=400, detail="Valid email required")
    db = get_db()
    try:
        db.execute("INSERT OR IGNORE INTO users (email) VALUES (?)", (req.email.lower().strip(),))
        db.commit()
        row = db.execute(
            "SELECT id, email FROM users WHERE email = ?", (req.email.lower().strip(),)
        ).fetchone()
        if row is None:
            raise HTTPException(status_code=500, detail="Failed to retrieve user")
        return UserResponse(id=row["id"], email=row["email"])
    finally:
        db.close()
