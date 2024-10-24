import React, { useState } from 'react';
import { Sparkles, Save } from 'lucide-react';

const Day11Game = ({ onSave, initialState }) => {
  const [reindeerName, setReindeerName] = useState(initialState?.reindeerName || '');

  const prefixes = ['Dash', 'Glimmer', 'Frost', 'Sparkle', 'Star', 'Jingle', 'Twinkle'];
  const suffixes = ['hooves', 'antler', 'light', 'nose', 'bell', 'flake', 'whisper'];

  const generateName = () => {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    setReindeerName(`${prefix}${suffix}`);
  };

  const handleSave = () => {
    onSave({ reindeerName });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center">Reindeer Name Generator</h3>
      <div className="text-center text-2xl font-bold text-red-600">{reindeerName}</div>
      <button 
        onClick={generateName} 
        className="bg-green-500 text-white px-4 py-2 rounded w-full flex items-center justify-center"
      >
        <Sparkles className="mr-2" size={20} />
        Generate Name
      </button>
      <button 
        onClick={handleSave} 
        className="bg-blue-500 text-white px-4 py-2 rounded w-full flex items-center justify-center"
      >
        <Save className="mr-2" size={20} />
        Save Reindeer Name
      </button>
    </div>
  );
};

export default Day11Game;