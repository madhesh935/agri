from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    phone_number = Column(String)
    is_active = Column(Boolean, default=True)
    
    sos_requests = relationship("SOSRequest", back_populates="user")
    emergency_contacts = relationship("EmergencyContact", back_populates="user")

class EmergencyContact(Base):
    __tablename__ = "emergency_contacts"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String)
    phone_number = Column(String)
    relationship = Column(String) # e.g., Family, Friend, Spouse
    
    user = relationship("User", back_populates="emergency_contacts")

class SOSRequest(Base):
    __tablename__ = "sos_requests"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    latitude = Column(Float)
    longitude = Column(Float)
    timestamp = Column(DateTime, default=datetime.utcnow)
    status = Column(String, default="pending") # pending, resolved, cancelled
    
    user = relationship("User", back_populates="sos_requests")
