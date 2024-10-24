import React, { useState, useEffect } from 'react';
import { Clock, Gift, Save } from 'lucide-react';

const Day24Game = ({ onSave, initialState }) => {
  const [timeLeft, setTimeLeft] = useState(initialState?.timeLeft || {});
  const [message, setMessage] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const currentYear = now.getFullYear();
      const christmas = new Date(currentYear, 11, 25);
      
      if (now > christmas) {
        christmas.setFullYear(currentYear + 1);
      }
      
      const difference = christmas - now;
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        
        setTimeLeft({ days, hours, minutes, seconds });
        setMessage("Time until Christmas:");
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setMessage("Merry Christmas!");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSave = () => {
    onSave({ timeLeft });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center">Christmas Day Countdown</h3>
      <div className="text-center">
        <p className="font-bold">{message}</p>
        <div className="flex justify-center space-x-4 mt-2">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="text-center">
              <div className="text-3xl font-bold">{value}</div>
              <div className="text-sm">{unit}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center space-x-2">
        <Clock size={24} className="text-red-500" />
        <Gift size={24} className="text-green-500" />
      </div>
      <button 
        onClick={handleSave} 
        className="bg-blue-500 text-white px-4 py-2 rounded w-full flex items-center justify-center"
      >
        <Save className="mr-2" size={20} />
        Save Countdown
      </button>
    </div>
  );
};

export default Day24Game;