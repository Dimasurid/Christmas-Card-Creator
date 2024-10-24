import React, { useState } from 'react';
import { Mail, Save } from 'lucide-react';

const Day16Game = ({ onSave, initialState }) => {
  const [cardDesign, setCardDesign] = useState(initialState?.cardDesign || {
    background: 'snow',
    greeting: 'Happy Holidays!',
    fontColor: 'red',
    fontSize: 'medium'
  });

  const backgrounds = ['snow', 'trees', 'ornaments', 'fireplace'];
  const fontColors = ['red', 'green', 'gold', 'blue', 'white'];
  const fontSizes = ['small', 'medium', 'large'];

  const handleChange = (key, value) => {
    setCardDesign({ ...cardDesign, [key]: value });
  };

  const handleSave = () => {
    onSave({ cardDesign });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center">Holiday Greeting Card Maker</h3>
      <div>
        <h4 className="font-semibold">Background</h4>
        <select 
          value={cardDesign.background} 
          onChange={(e) => handleChange('background', e.target.value)}
          className="w-full p-2 border rounded"
        >
          {backgrounds.map(bg => (
            <option key={bg} value={bg}>{bg}</option>
          ))}
        </select>
      </div>
      <div>
        <h4 className="font-semibold">Greeting</h4>
        <input 
          type="text" 
          value={cardDesign.greeting} 
          onChange={(e) => handleChange('greeting', e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <h4 className="font-semibold">Font Color</h4>
        <div className="flex space-x-2">
          {fontColors.map(color => (
            <button
              key={color}
              onClick={() => handleChange('fontColor', color)}
              className={`w-8 h-8 rounded-full bg-${color === 'white' ? 'gray-100' : color}-500 ${cardDesign.fontColor === color ? 'ring-2 ring-black' : ''}`}
            />
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-semibold">Font Size</h4>
        <div className="flex space-x-2">
          {fontSizes.map(size => (
            <button
              key={size}
              onClick={() => handleChange('fontSize', size)}
              className={`px-2 py-1 rounded ${cardDesign.fontSize === size ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      <div className={`w-64 h-40 mx-auto bg-${cardDesign.background} bg-cover bg-center flex items-center justify-center p-4`}>
        <p className={`text-${cardDesign.fontColor} text-${cardDesign.fontSize} text-center font-bold`}>
          {cardDesign.greeting}
        </p>
      </div>
      <button 
        onClick={handleSave} 
        className="bg-green-500 text-white px-4 py-2 rounded w-full flex items-center justify-center"
      >
        <Mail className="mr-2" size={20} />
        Save Greeting Card
      </button>
    </div>
  );
};

export default Day16Game;