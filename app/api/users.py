from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import models
from ..schemas import schemas

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/register", response_model=schemas.User)
async def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    # In a real app, hash the password here
    new_user = models.User(
        username=user.username,
        email=user.email,
        phone_number=user.phone_number,
        hashed_password=user.password 
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.get("/me", response_model=schemas.User)
async def get_current_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/contacts", response_model=schemas.EmergencyContact)
async def add_emergency_contact(contact: schemas.EmergencyContactCreate, user_id: int, db: Session = Depends(get_db)):
    new_contact = models.EmergencyContact(**contact.model_dump(), user_id=user_id)
    db.add(new_contact)
    db.commit()
    db.refresh(new_contact)
    return new_contact

@router.get("/contacts", response_model=list[schemas.EmergencyContact])
async def get_emergency_contacts(user_id: int, db: Session = Depends(get_db)):
    contacts = db.query(models.EmergencyContact).filter(models.EmergencyContact.user_id == user_id).all()
    return contacts

@router.delete("/contacts/{contact_id}")
async def delete_emergency_contact(contact_id: int, user_id: int, db: Session = Depends(get_db)):
    contact = db.query(models.EmergencyContact).filter(
        models.EmergencyContact.id == contact_id, 
        models.EmergencyContact.user_id == user_id
    ).first()
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    db.delete(contact)
    db.commit()
    return {"message": "Contact deleted successfully"}
