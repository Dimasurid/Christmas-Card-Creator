import React, { useState } from 'react';
import { Send } from 'lucide-react';

const Day5Game = ({ onSave, initialState }) => {
  const [letter, setLetter] = useState(initialState?.letter || '');

  const handleSave = () => {
    onSave({ letter });
  };

  return (
    <div className="space-y-4">
      <textarea
        className="w-full h-40 p-2 border rounded"
        value={letter}
        onChange={(e) => setLetter(e.target.value)}
        placeholder="Dear Santa..."
      />
      <button 
        onClick={handleSave} 
        className="bg-red-500 text-white px-4 py-2 rounded w-full flex items-center justify-center"
      >
        <Send className="mr-2" size={20} />
        Send to Santa
      </button>
    </div>
  );
};

export default Day5Game;