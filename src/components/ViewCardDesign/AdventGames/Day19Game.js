import React, { useState } from 'react';
import { Snowflake, Save } from 'lucide-react';

const Day19Game = ({ onSave, initialState }) => {
  const [snowman, setSnowman] = useState(initialState?.snowman || {
    hat: 'none',
    eyes: 'coal',
    nose: 'carrot',
    arms: 'stick'
  });

  const options = {
    hat: ['none', 'top hat', 'beanie', 'santa hat'],
    eyes: ['coal', 'buttons', 'pebbles'],
    nose: ['carrot', 'cone', 'button'],
    arms: ['stick', 'branch', 'candy cane']
  };

  const handleChange = (part, value) => {
    setSnowman({ ...snowman, [part]: value });
  };

  const handleSave = () => {
    onSave({ snowman });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center">Snowman Builder</h3>
      {Object.entries(options).map(([part, choices]) => (
        <div key={part}>
          <h4 className="font-semibold capitalize">{part}</h4>
          <select 
            value={snowman[part]} 
            onChange={(e) => handleChange(part, e.target.value)}
            className="w-full p-2 border rounded"
          >
            {choices.map(choice => (
              <option key={choice} value={choice}>{choice}</option>
            ))}
          </select>
        </div>
      ))}
      <div className="text-center">
        <div className="inline-block bg-white rounded-full w-32 h-32 relative">
          {snowman.hat !== 'none' && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {snowman.hat === 'top hat' && <div className="w-16 h-16 bg-black rounded-t-lg"></div>}
              {snowman.hat === 'beanie' && <div className="w-16 h-8 bg-red-500 rounded-full"></div>}
              {snowman.hat === 'santa hat' && <div className="w-16 h-16 bg-red-500 rounded-t-full"></div>}
            </div>
          )}
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-black rounded-full"></div>
          <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-black rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {snowman.nose === 'carrot' && <div className="w-8 h-2 bg-orange-500 rounded-full"></div>}
            {snowman.nose === 'cone' && <div className="w-4 h-4 bg-orange-500 rounded-full"></div>}
            {snowman.nose === 'button' && <div className="w-4 h-4 bg-red-500 rounded-full"></div>}
          </div>
        </div>
      </div>
      <button 
        onClick={handleSave} 
        className="bg-blue-500 text-white px-4 py-2 rounded w-full flex items-center justify-center"
      >
        <Snowflake className="mr-2" size={20} />
        Save Snowman
      </button>
    </div>
  );
};

export default Day19Game;