import React, { useState, useEffect } from 'react';
import { Save, Trash2, RefreshCw } from 'lucide-react';

const DECORATION_TYPES = ['ornament', 'star', 'candy', 'light'];
const COLORS = ['red', 'gold', 'blue', 'green', 'purple'];

const Day1Game = ({ onSave, initialState }) => {
  const [decorations, setDecorations] = useState(initialState || []);
  const [selectedDecoration, setSelectedDecoration] = useState(DECORATION_TYPES[0]);
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSnowflakes(prevSnowflakes => [
        ...prevSnowflakes.filter(s => s.top < 384),
        { left: Math.random() * 256, top: -10 }
      ]);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const addDecoration = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    setDecorations([...decorations, { x, y, type: selectedDecoration, color }]);
  };

  const removeDecoration = (index) => {
    setDecorations(decorations.filter((_, i) => i !== index));
  };

  const resetDecorations = () => {
    setDecorations([]);
  };

  return (
    <div className="relative w-64 h-96 mx-auto bg-blue-100 p-4 rounded-lg shadow-lg">
      <div className="absolute inset-0 overflow-hidden">
        {snowflakes.map((snowflake, index) => (
          <div
            key={index}
            className="absolute w-2 h-2 bg-white rounded-full opacity-70"
            style={{ 
              left: `${snowflake.left}px`, 
              top: `${snowflake.top}px`,
              animation: 'fall 5s linear'
            }}
          />
        ))}
      </div>
      <div className="relative w-full h-full">
        <img 
          src="/api/placeholder/256/384" 
          alt="Christmas Tree" 
          className="w-full h-full object-contain"
          onClick={addDecoration}
        />
        {decorations.map((decoration, index) => (
          <div
            key={index}
            className={`absolute w-6 h-6 ${decoration.color} cursor-pointer transition-transform hover:scale-110`}
            style={{ 
              left: decoration.x - 12, 
              top: decoration.y - 12,
              backgroundColor: decoration.type === 'light' ? decoration.color : 'transparent',
              borderRadius: decoration.type === 'ornament' ? '50%' : '0',
              clipPath: decoration.type === 'star' ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' : 'none',
              border: decoration.type !== 'light' ? `2px solid ${decoration.color}` : 'none',
            }}
            onClick={() => removeDecoration(index)}
          />
        ))}
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div>
          {DECORATION_TYPES.map(type => (
            <button
              key={type}
              onClick={() => setSelectedDecoration(type)}
              className={`mr-2 px-2 py-1 rounded ${selectedDecoration === type ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
            >
              {type}
            </button>
          ))}
        </div>
        <div>
          <button onClick={resetDecorations} className="mr-2 bg-red-500 text-white px-2 py-1 rounded">
            <RefreshCw className="inline-block mr-1" size={16} />
            Reset
          </button>
          <button onClick={() => onSave(decorations)} className="bg-green-500 text-white px-2 py-1 rounded">
            <Save className="inline-block mr-1" size={16} />
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Day1Game;