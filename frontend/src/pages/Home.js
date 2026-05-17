import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SOSButton from './components/SOSButton';
import MapView from './components/MapView';
import ContactManager from './components/ContactManager';
import { User, Phone, MapPin } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8000';

const Home = () => {
  const [location, setLocation] = useState(null);
  const [sosStatus, setSosStatus] = useState('idle'); // idle, pending, resolved
  const [userId] = useState(1); // Mock user ID

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation([position.coords.latitude, position.coords.longitude]);
      });
    }
  }, []);

  const triggerSOS = async () => {
    if (!location) {
      alert("Please enable location services");
      return;
    }

    try {
      setSosStatus('pending');
      await axios.post(`${API_BASE_URL}/sos/trigger`, {
        latitude: location[0],
        longitude: location[1]
      }, {
        params: { user_id: userId }
      });
    } catch (error) {
      console.error("SOS Trigger failed", error);
      setSosStatus('idle');
      alert("Failed to send SOS");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 font-sans">
      <header className="w-full max-w-md flex justify-between items-center py-4 mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Road SOS</h1>
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
          <User size={20} />
        </div>
      </header>

      <main className="w-full max-w-md space-y-8">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <MapPin size={20} className="text-red-500" /> Your Location
          </h2>
          <MapView location={location} />
        </div>

        <SOSButton onTrigger={triggerSOS} status={sosStatus} />

        <ContactManager userId={userId} />
      </main>
    </div>
  );
};

export default Home;
