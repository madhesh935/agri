import React from 'react';
import { AlertCircle } from 'lucide-react';

const SOSButton = ({ onTrigger, status }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <button 
        onClick={onTrigger}
        disabled={status === 'pending'}
        className={`w-48 h-48 rounded-full flex flex-col items-center justify-center text-white font-bold text-2xl transition-all duration-300 shadow-2xl ${
          status === 'pending' 
          ? 'bg-gray-500 cursor-not-allowed animate-pulse' 
          : 'bg-red-600 hover:bg-red-700 active:scale-95'
        }`}
      >
        <AlertCircle size={64} className="mb-2" />
        {status === 'pending' ? 'SOS ACTIVE' : 'SEND SOS'}
      </button>
      <p className="mt-6 text-gray-600 text-center">
        {status === 'pending' 
          ? 'Emergency services have been notified.' 
          : 'Press the button in case of emergency.'}
      </p>
    </div>
  );
};

export default SOSButton;
