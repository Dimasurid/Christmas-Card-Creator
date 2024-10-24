import React, { useState } from 'react';
import { Gift, Save } from 'lucide-react';

const Day9Game = ({ onSave, initialState }) => {
  const [wrapperColor, setWrapperColor] = useState(initialState?.wrapperColor || 'red');
  const [ribbonColor, setRibbonColor] = useState(initialState?.ribbonColor || 'gold');
  const [bowStyle, setBowStyle] = useState(initialState?.bowStyle || 'classic');

  const colors = ['red', 'green', 'blue', 'gold', 'silver', 'purple'];
  const bowStyles = ['classic', 'fancy', 'minimalist'];

  const handleSave = () => {
    onSave({ wrapperColor, ribbonColor, bowStyle });
  };

  return (
    <div className="space-y-4">
      <div className="relative w-64 h-64 mx-auto">
        <div className={`w-full h-full bg-${wrapperColor}-500`} />
        <div className={`absolute top-1/2 left-0 right-0 h-4 bg-${ribbonColor}-500`} />
        <div className={`absolute top-0 bottom-0 left-1/2 w-4 bg-${ribbonColor}-500`} />
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-${ribbonColor}-600 rounded-full ${bowStyle === 'classic' ? 'rounded-full' : bowStyle === 'fancy' ? 'star-shape' : 'square'}`} />
      </div>
      <div>
        <h4 className="font-semibold">Wrapper Color</h4>
        <div className="flex space-x-2">
          {colors.map(color => (
            <button
              key={color}
              onClick={() => setWrapperColor(color)}
              className={`w-8 h-8 rounded-full bg-${color}-500 ${wrapperColor === color ? 'ring-2 ring-black' : ''}`}
            />
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-semibold">Ribbon Color</h4>
        <div className="flex space-x-2">
          {colors.map(color => (
            <button
              key={color}
              onClick={() => setRibbonColor(color)}
              className={`w-8 h-8 rounded-full bg-${color}-500 ${ribbonColor === color ? 'ring-2 ring-black' : ''}`}
            />
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-semibold">Bow Style</h4>
        <div className="flex space-x-2">
          {bowStyles.map(style => (
            <button
              key={style}
              onClick={() => setBowStyle(style)}
              className={`px-2 py-1 rounded ${bowStyle === style ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>
      <button 
        onClick={handleSave} 
        className="bg-green-500 text-white px-4 py-2 rounded w-full flex items-center justify-center"
      >
        <Gift className="mr-2" size={20} />
        Save Wrapped Gift
      </button>
    </div>
  );
};

export default Day9Game;