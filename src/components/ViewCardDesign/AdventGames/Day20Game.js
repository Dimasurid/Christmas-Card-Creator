import React, { useState } from 'react';
import { Gift, Save } from 'lucide-react';

const Day20Game = ({ onSave, initialState }) => {
  const [gift, setGift] = useState(initialState?.gift || {
    shape: 'box',
    paper: 'red',
    ribbon: 'gold',
    bow: true
  });

  const options = {
    shape: ['box', 'cylinder', 'bag'],
    paper: ['red', 'green', 'blue', 'gold', 'silver'],
    ribbon: ['red', 'green', 'gold', 'silver', 'none']
  };

  const handleChange = (part, value) => {
    setGift({ ...gift, [part]: value });
  };

  const toggleBow = () => {
    setGift({ ...gift, bow: !gift.bow });
  };

  const handleSave = () => {
    onSave({ gift });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center">Gift Wrapping Simulator</h3>
      {Object.entries(options).map(([part, choices]) => (
        <div key={part}>
          <h4 className="font-semibold capitalize">{part}</h4>
          <select 
            value={gift[part]} 
            onChange={(e) => handleChange(part, e.target.value)}
            className="w-full p-2 border rounded"
          >
            {choices.map(choice => (
              <option key={choice} value={choice}>{choice}</option>
            ))}
          </select>
        </div>
      ))}
      <div>
        <h4 className="font-semibold">Bow</h4>
        <button 
          onClick={toggleBow}
          className={`px-4 py-2 rounded ${gift.bow ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
        >
          {gift.bow ? 'Remove Bow' : 'Add Bow'}
        </button>
      </div>
      <div className="text-center">
        <div className={`inline-block w-32 h-32 bg-${gift.paper}-500 relative ${
          gift.shape === 'box' ? 'rounded' : gift.shape === 'cylinder' ? 'rounded-full' : 'rounded-t-lg'
        }`}>
          {gift.ribbon !== 'none' && (
            <>
              <div className={`absolute top-1/2 left-0 right-0 h-4 bg-${gift.ribbon}-500`}></div>
              <div className={`absolute top-0 bottom-0 left-1/2 w-4 bg-${gift.ribbon}-500`}></div>
            </>
          )}
          {gift.bow && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-8 h-8 bg-yellow-500 rounded-full"></div>
            </div>
          )}
        </div>
      </div>
      <button 
        onClick={handleSave} 
        className="bg-purple-500 text-white px-4 py-2 rounded w-full flex items-center justify-center"
      >
        <Gift className="mr-2" size={20} />
        Save Wrapped Gift
      </button>
    </div>
  );
};

export default Day20Game;