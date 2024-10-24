import React, { useState } from 'react';
import { Shirt, Save } from 'lucide-react';

const Day13Game = ({ onSave, initialState }) => {
  const [outfit, setOutfit] = useState(initialState?.outfit || {
    top: 'Christmas Sweater',
    bottom: 'Jeans',
    accessory: 'Santa Hat'
  });

  const options = {
    top: ['Christmas Sweater', 'Elf Shirt', 'Reindeer Turtleneck', 'Snowflake Blouse'],
    bottom: ['Jeans', 'Red Pants', 'Green Skirt', 'Plaid Trousers'],
    accessory: ['Santa Hat', 'Reindeer Antlers', 'Elf Ears', 'Candy Cane Scarf']
  };

  const handleChange = (category, item) => {
    setOutfit({ ...outfit, [category]: item });
  };

  const handleSave = () => {
    onSave({ outfit });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center">Festive Outfit Creator</h3>
      {Object.entries(options).map(([category, items]) => (
        <div key={category}>
          <h4 className="font-semibold capitalize">{category}</h4>
          <select 
            value={outfit[category]} 
            onChange={(e) => handleChange(category, e.target.value)}
            className="w-full p-2 border rounded"
          >
            {items.map(item => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
      ))}
      <button 
        onClick={handleSave} 
        className="bg-red-500 text-white px-4 py-2 rounded w-full flex items-center justify-center"
      >
        <Shirt className="mr-2" size={20} />
        Save Festive Outfit
      </button>
    </div>
  );
};

export default Day13Game;