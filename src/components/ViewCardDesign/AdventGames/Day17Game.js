import React, { useState, useEffect } from 'react';
import { Utensils, Save } from 'lucide-react';

const Day17Game = ({ onSave, initialState }) => {
  const [recipe, setRecipe] = useState(initialState?.recipe || '');
  const [scrambledIngredients, setScrambledIngredients] = useState([]);
  const [unscrambledIngredients, setUnscrambledIngredients] = useState([]);

  const recipes = {
    'Gingerbread Cookies': ['flour', 'ginger', 'cinnamon', 'butter', 'sugar', 'molasses', 'egg'],
    'Eggnog': ['milk', 'cream', 'sugar', 'eggs', 'nutmeg', 'vanilla', 'rum'],
    'Roast Turkey': ['turkey', 'butter', 'sage', 'thyme', 'salt', 'pepper', 'onion']
  };

  useEffect(() => {
    if (recipe) {
      const ingredients = recipes[recipe];
      setScrambledIngredients(shuffleArray([...ingredients]));
      setUnscrambledIngredients([]);
    }
  }, [recipe]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleIngredientClick = (ingredient, isScrambled) => {
    if (isScrambled) {
      setScrambledIngredients(scrambledIngredients.filter(item => item !== ingredient));
      setUnscrambledIngredients([...unscrambledIngredients, ingredient]);
    } else {
      setUnscrambledIngredients(unscrambledIngredients.filter(item => item !== ingredient));
      setScrambledIngredients([...scrambledIngredients, ingredient]);
    }
  };

  const handleSave = () => {
    onSave({ recipe, unscrambledIngredients });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center">Holiday Recipe Scramble</h3>
      <select 
        value={recipe} 
        onChange={(e) => setRecipe(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="">Select a recipe</option>
        {Object.keys(recipes).map(r => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>
      {recipe && (
        <>
          <div>
            <h4 className="font-semibold">Scrambled Ingredients</h4>
            <div className="flex flex-wrap gap-2">
              {scrambledIngredients.map(ingredient => (
                <button
                  key={ingredient}
                  onClick={() => handleIngredientClick(ingredient, true)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  {ingredient}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold">Unscrambled Ingredients</h4>
            <div className="flex flex-wrap gap-2">
              {unscrambledIngredients.map(ingredient => (
                <button
                  key={ingredient}
                  onClick={() => handleIngredientClick(ingredient, false)}
                  className="px-2 py-1 bg-green-500 text-white rounded"
                >
                  {ingredient}
                </button>
              ))}
            </div>
          </div>
          <button 
            onClick={handleSave} 
            className="bg-blue-500 text-white px-4 py-2 rounded w-full flex items-center justify-center"
          >
            <Utensils className="mr-2" size={20} />
            Save Recipe Progress
          </button>
        </>
      )}
    </div>
  );
};

export default Day17Game;