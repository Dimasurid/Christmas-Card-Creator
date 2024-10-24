import React, { useState } from 'react';
import { Cookie, Save } from 'lucide-react';

const Day15Game = ({ onSave, initialState }) => {
  const [cookieShape, setCookieShape] = useState(initialState?.cookieShape || 'circle');
  const [frosting, setFrosting] = useState(initialState?.frosting || 'white');
  const [sprinkles, setSprinkles] = useState(initialState?.sprinkles || []);

  const shapes = ['circle', 'star', 'tree', 'gingerbread'];
  const frostingColors = ['white', 'red', 'green', 'blue', 'yellow'];
  const sprinkleColors = ['red', 'green', 'gold', 'silver', 'blue'];

  const addSprinkle = (color) => {
    setSprinkles([...sprinkles, { color, x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 }]);
  };

  const handleSave = () => {
    onSave({ cookieShape, frosting, sprinkles });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center">Christmas Cookie Decorator</h3>
      <div>
        <h4 className="font-semibold">Cookie Shape</h4>
        <div className="flex space-x-2">
          {shapes.map(shape => (
            <button
              key={shape}
              onClick={() => setCookieShape(shape)}
              className={`px-2 py-1 rounded ${cookieShape === shape ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
            >
              {shape}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-semibold">Frosting Color</h4>
        <div className="flex space-x-2">
          {frostingColors.map(color => (
            <button
              key={color}
              onClick={() => setFrosting(color)}
              className={`w-8 h-8 rounded-full bg-${color === 'white' ? 'gray-100' : color}-500 ${frosting === color ? 'ring-2 ring-black' : ''}`}
            />
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-semibold">Add Sprinkles</h4>
        <div className="flex space-x-2">
          {sprinkleColors.map(color => (
            <button
              key={color}
              onClick={() => addSprinkle(color)}
              className={`w-8 h-8 rounded-full bg-${color}-500`}
            />
          ))}
        </div>
      </div>
      <div className="relative w-64 h-64 mx-auto bg-yellow-200 rounded-full">
        <div className={`absolute inset-4 bg-${frosting === 'white' ? 'gray-100' : frosting}-500 rounded-full`} />
        {sprinkles.map((sprinkle, index) => (
          <div
            key={index}
            className={`absolute w-2 h-2 rounded-full bg-${sprinkle.color}-500`}
            style={{ left: `${sprinkle.x}%`, top: `${sprinkle.y}%` }}
          />
        ))}
      </div>
      <button 
        onClick={handleSave} 
        className="bg-red-500 text-white px-4 py-2 rounded w-full flex items-center justify-center"
      >
        <Cookie className="mr-2" size={20} />
        Save Cookie Design
      </button>
    </div>
  );
};

export default Day15Game;