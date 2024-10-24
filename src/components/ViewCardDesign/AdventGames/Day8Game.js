import React, { useState } from 'react';
import { Home, Save } from 'lucide-react';

const Day8Game = ({ onSave, initialState }) => {
  const [decorations, setDecorations] = useState(initialState?.decorations || []);

  const decorationTypes = ['Candy Cane', 'Gumdrop', 'Frosting', 'Chocolate Chip', 'Sprinkles'];

  const addDecoration = (type) => {
    setDecorations([...decorations, { type, x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 }]);
  };

  const handleSave = () => {
    onSave({ decorations });
  };

  return (
    <div className="space-y-4">
      <div className="relative w-64 h-64 bg-yellow-200 mx-auto border-4 border-brown-600">
        {decorations.map((decoration, index) => (
          <div
            key={index}
            className="absolute w-4 h-4 rounded-full"
            style={{
              left: `${decoration.x}%`,
              top: `${decoration.y}%`,
              backgroundColor: decoration.type === 'Candy Cane' ? 'red' :
                               decoration.type === 'Gumdrop' ? 'green' :
                               decoration.type === 'Frosting' ? 'white' :
                               decoration.type === 'Chocolate Chip' ? 'brown' : 'pink'
            }}
          />
        ))}
      </div>
      <div className="flex justify-center space-x-2">
        {decorationTypes.map(type => (
          <button
            key={type}
            onClick={() => addDecoration(type)}
            className="bg-green-500 text-white px-2 py-1 rounded text-sm"
          >
            {type}
          </button>
        ))}
      </div>
      <button 
        onClick={handleSave} 
        className="bg-brown-600 text-white px-4 py-2 rounded w-full flex items-center justify-center"
      >
        <Home className="mr-2" size={20} />
        Save Gingerbread House
      </button>
    </div>
  );
};

export default Day8Game;