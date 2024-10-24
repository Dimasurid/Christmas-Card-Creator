import React, { useState, useEffect } from 'react';
import { Save, Trash2, RefreshCw } from 'lucide-react';

const TOPPING_TYPES = ['sprinkles', 'chocolate', 'icing', 'candy'];
const COLORS = ['red', 'green', 'white', 'brown'];

const Day2Game = ({ onSave, initialState }) => {
  const [toppings, setToppings] = useState(initialState || []);
  const [selectedTopping, setSelectedTopping] = useState(TOPPING_TYPES[0]);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [cookieShape, setCookieShape] = useState('circle');

  useEffect(() => {
    const shapes = ['circle', 'star', 'tree', 'bell'];
    const interval = setInterval(() => {
      setCookieShape(shapes[Math.floor(Math.random() * shapes.length)]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const addTopping = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setToppings([...toppings, { x, y, type: selectedTopping, color: selectedColor }]);
  };

  const removeTopping = (index) => {
    setToppings(toppings.filter((_, i) => i !== index));
  };

  const resetToppings = () => {
    setToppings([]);
  };

  return (
    <div className="relative w-64 h-64 mx-auto bg-red-100 p-4 rounded-lg shadow-lg">
      <div className="relative w-full h-full">
        <img 
          src={`/api/placeholder/256/256`}
          alt="Cookie" 
          className={`w-full h-full bg-yellow-200 ${
            cookieShape === 'circle' ? 'rounded-full' :
            cookieShape === 'star' ? 'clip-path-star' :
            cookieShape === 'tree' ? 'clip-path-tree' :
            'clip-path-bell'
          }`}
          onClick={addTopping}
        />
        {toppings.map((topping, index) => (
          <div
            key={index}
            className={`absolute cursor-pointer transition-transform hover:scale-110`}
            style={{ 
              left: topping.x - 8, 
              top: topping.y - 8,
              width: topping.type === 'sprinkles' ? '4px' : '16px',
              height: topping.type === 'sprinkles' ? '4px' : '16px',
              backgroundColor: topping.color,
              borderRadius: topping.type === 'chocolate' ? '0' : '50%',
              clipPath: topping.type === 'candy' ? 'polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)' : 'none',
            }}
            onClick={() => removeTopping(index)}
          />
        ))}
      </div>
      <div className="mt-4 flex flex-wrap justify-between items-center">
        <div className="w-full mb-2">
          {TOPPING_TYPES.map(type => (
            <button
              key={type}
              onClick={() => setSelectedTopping(type)}
              className={`mr-2 mb-2 px-2 py-1 rounded ${selectedTopping === type ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="w-full mb-2">
          {COLORS.map(color => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`mr-2 mb-2 w-6 h-6 rounded-full ${color === 'white' ? 'border border-gray-300' : ''}`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <div className="w-full flex justify-between">
          <button onClick={resetToppings} className="bg-red-500 text-white px-2 py-1 rounded">
            <RefreshCw className="inline-block mr-1" size={16} />
            Reset
          </button>
          <button onClick={() => onSave(toppings)} className="bg-green-500 text-white px-2 py-1 rounded">
            <Save className="inline-block mr-1" size={16} />
            Save Cookie
          </button>
        </div>
      </div>
    </div>
  );
};

export default Day2Game;