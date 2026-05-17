from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

class EmergencyContactBase(BaseModel):
    name: str
    phone_number: str
    relationship: str

class EmergencyContactCreate(EmergencyContactBase):
    pass

class EmergencyContact(EmergencyContactBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True

class UserBase(BaseModel):
    username: str
    email: EmailStr
    phone_number: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool = True

    class Config:
        from_attributes = True

class SOSRequestBase(BaseModel):
    latitude: float
    longitude: float

class SOSRequestCreate(SOSRequestBase):
    pass

class SOSRequest(SOSRequestBase):
    id: int
    user_id: int
    timestamp: datetime
    status: str

    class Config:
        from_attributes = True
