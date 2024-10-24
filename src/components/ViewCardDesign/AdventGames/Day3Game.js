import React, { useState } from 'react';
import { Save, Music } from 'lucide-react';

const Day3Game = ({ onSave, initialState }) => {
  const [selectedCarol, setSelectedCarol] = useState(initialState || '');
  const carols = [
    "Jingle Bells",
    "Silent Night",
    "Deck the Halls",
    "Rudolph the Red-Nosed Reindeer",
    "We Wish You a Merry Christmas"
  ];

  const handleCarolSelect = (carol) => {
    setSelectedCarol(carol);
  };

  return (
    <div className="w-64 mx-auto">
      <h3 className="text-xl font-bold mb-4">Choose a Carol to Sing</h3>
      <ul className="space-y-2">
        {carols.map((carol, index) => (
          <li 
            key={index}
            className={`p-2 rounded cursor-pointer ${
              selectedCarol === carol ? 'bg-green-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => handleCarolSelect(carol)}
          >
            <Music className="inline-block mr-2" size={16} />
            {carol}
          </li>
        ))}
      </ul>
      <button 
        onClick={() => onSave(selectedCarol)} 
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded w-full"
        disabled={!selectedCarol}
      >
        <Save className="inline-block mr-2" size={20} />
        Save Carol Choice
      </button>
    </div>
  );
};

export default Day3Game;