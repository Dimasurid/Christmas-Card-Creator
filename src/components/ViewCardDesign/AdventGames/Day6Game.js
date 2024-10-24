import React, { useState } from 'react';
import { Coffee, Save } from 'lucide-react';

const Day6Game = ({ onSave, initialState }) => {
  const [ingredients, setIngredients] = useState(initialState?.ingredients || []);

  const availableIngredients = [
    'Cocoa Powder', 'Milk', 'Sugar', 'Marshmallows', 'Whipped Cream', 'Cinnamon', 'Vanilla Extract'
  ];

  const toggleIngredient = (ingredient) => {
    setIngredients(prev => 
      prev.includes(ingredient) 
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleSave = () => {
    onSave({ ingredients });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Make Your Hot Cocoa</h3>
      <div className="grid grid-cols-2 gap-2">
        {availableIngredients.map(ingredient => (
          <button
            key={ingredient}
            onClick={() => toggleIngredient(ingredient)}
            className={`p-2 rounded ${ingredients.includes(ingredient) ? 'bg-brown-500 text-white' : 'bg-gray-200'}`}
          >
            {ingredient}
          </button>
        ))}
      </div>
      <button 
        onClick={handleSave} 
        className="bg-brown-600 text-white px-4 py-2 rounded w-full flex items-center justify-center"
      >
        <Coffee className="mr-2" size={20} />
        Save Hot Cocoa Recipe
      </button>
    </div>
  );
};

export default Day6Game;