import React, { useState, useEffect } from 'react';
import { Gift, Save } from 'lucide-react';

const Day14Game = ({ onSave, initialState }) => {
  const [decorations, setDecorations] = useState(initialState?.decorations || []);
  const [currentDecoration, setCurrentDecoration] = useState('red');

  const colors = ['red', 'blue', 'yellow', 'green', 'purple', 'orange'];

  const addDecoration = (x, y) => {
    const newDecoration = { x, y, color: currentDecoration };
    setDecorations([...decorations, newDecoration]);
  };

  const handleSave = () => {
    onSave({ decorations });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center">Decorate the Christmas Tree</h3>
      <div className="flex justify-center space-x-2 mb-4">
        {colors.map(color => (
          <button
            key={color}
            className={`w-8 h-8 rounded-full ${
              currentDecoration === color ? 'ring-2 ring-offset-2 ring-black' : ''
            }`}
            style={{ backgroundColor: color }}
            onClick={() => setCurrentDecoration(color)}
          />
        ))}
      </div>
      <div 
        className="relative w-64 h-96 mx-auto bg-green-700"
        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
        onClick={(e) => {
          const rect = e.target.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          addDecoration(x, y);
        }}
      >
        {decorations.map((decoration, index) => (
          <div
            key={index}
            className="absolute w-4 h-4 rounded-full"
            style={{
              backgroundColor: decoration.color,
              left: decoration.x - 8,
              top: decoration.y - 8,
            }}
          />
        ))}
      </div>
      <button 
        onClick={handleSave} 
        className="bg-red-500 text-white px-4 py-2 rounded w-full flex items-center justify-center"
      >
        <Gift className="mr-2" size={20} />
        Save Decorations
      </button>
    </div>
  );
};

export default Day14Game;