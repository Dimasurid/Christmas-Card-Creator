import React, { useState } from 'react';
import { Flower, Save } from 'lucide-react';

const Day10Game = ({ onSave, initialState }) => {
  const [baseColor, setBaseColor] = useState(initialState?.baseColor || 'green');
  const [decorations, setDecorations] = useState(initialState?.decorations || []);

  const colors = ['green', 'blue', 'red', 'gold', 'silver'];
  const decorationTypes = ['Holly', 'Pinecone', 'Ribbon', 'Ornament', 'Bells'];

  const addDecoration = (type) => {
    const angle = Math.random() * 360;
    const radius = 80 + Math.random() * 20;
    const x = 100 + radius * Math.cos(angle * Math.PI / 180);
    const y = 100 + radius * Math.sin(angle * Math.PI / 180);
    setDecorations([...decorations, { type, x, y }]);
  };

  const handleSave = () => {
    onSave({ baseColor, decorations });
  };

  return (
    <div className="space-y-4">
      <div className="relative w-64 h-64 mx-auto">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="80" fill={baseColor} />
          <circle cx="100" cy="100" r="60" fill="white" />
        </svg>
        {decorations.map((decoration, index) => (
          <div
            key={index}
            className="absolute w-6 h-6 flex items-center justify-center"
            style={{ left: `${decoration.x - 12}px`, top: `${decoration.y - 12}px` }}
          >
            {decoration.type === 'Holly' && '🍃'}
            {decoration.type === 'Pinecone' && '🌰'}
            {decoration.type === 'Ribbon' && '🎀'}
            {decoration.type === 'Ornament' && '🎄'}
            {decoration.type === 'Bells' && '🔔'}
          </div>
        ))}
      </div>
      <div>
        <h4 className="font-semibold">Base Color</h4>
        <div className="flex space-x-2">
          {colors.map(color => (
            <button
              key={color}
              onClick={() => setBaseColor(color)}
              className={`w-8 h-8 rounded-full bg-${color}-500 ${baseColor === color ? 'ring-2 ring-black' : ''}`}
            />
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-semibold">Add Decorations</h4>
        <div className="flex flex-wrap gap-2">
          {decorationTypes.map(type => (
            <button
              key={type}
              onClick={() => addDecoration(type)}
              className="bg-red-500 text-white px-2 py-1 rounded text-sm"
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      <button 
        onClick={handleSave} 
        className="bg-green-500 text-white px-4 py-2 rounded w-full flex items-center justify-center"
      >
        <Flower className="mr-2" size={20} />
        Save Wreath Design
      </button>
    </div>
  );
};

export default Day10Game;