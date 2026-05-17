from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import models
from ..schemas import schemas

router = APIRouter(prefix="/sos", tags=["SOS"])

@router.post("/trigger", response_model=schemas.SOSRequest)
async def trigger_sos(request: schemas.SOSRequestCreate, user_id: int, db: Session = Depends(get_db)):
    # In a real app, user_id would come from a JWT token
    db_sos = models.SOSRequest(
        latitude=request.latitude,
        longitude=request.longitude,
        user_id=user_id,
        status="pending"
    )
    db.add(db_sos)
    db.commit()
    db.refresh(db_sos)
    
    # Here you would trigger notifications to emergency contacts and services
    return db_sos

@router.get("/{sos_id}", response_model=schemas.SOSRequest)
async def get_sos_status(sos_id: int, db: Session = Depends(get_db)):
    db_sos = db.query(models.SOSRequest).filter(models.SOSRequest.id == sos_id).first()
    if not db_sos:
        raise HTTPException(status_code=404, detail="SOS request not found")
    return db_sos

@router.patch("/{sos_id}/status")
async def update_sos_status(sos_id: int, status: str, db: Session = Depends(get_db)):
    db_sos = db.query(models.SOSRequest).filter(models.SOSRequest.id == sos_id).first()
    if not db_sos:
        raise HTTPException(status_code=404, detail="SOS request not found")
    db_sos.status = status
    db.commit()
    return {"message": f"SOS status updated to {status}"}
