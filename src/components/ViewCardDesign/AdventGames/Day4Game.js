import React, { useState } from 'react';
import { Save } from 'lucide-react';

const Day4Game = ({ onSave, initialState }) => {
  const [points, setPoints] = useState(initialState || []);

  const addPoint = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPoints([...points, { x, y }]);
  };

  const renderSnowflake = () => {
    if (points.length === 0) return null;

    const paths = points.map((point, index) => (
      <React.Fragment key={index}>
        <line x1="128" y1="128" x2={point.x} y2={point.y} stroke="white" strokeWidth="2" />
        <line x1="128" y1="128" x2={256 - point.x} y2={point.y} stroke="white" strokeWidth="2" />
        <line x1="128" y1="128" x2={point.x} y2={256 - point.y} stroke="white" strokeWidth="2" />
        <line x1="128" y1="128" x2={256 - point.x} y2={256 - point.y} stroke="white" strokeWidth="2" />
      </React.Fragment>
    ));

    return (
      <svg className="absolute top-0 left-0 w-full h-full">
        {paths}
      </svg>
    );
  };

  return (
    <div className="relative w-64 h-64 mx-auto">
      <div 
        className="w-full h-full bg-blue-500 rounded-full"
        onClick={addPoint}
      />
      {renderSnowflake()}
      <button 
        onClick={() => onSave(points)} 
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded w-full"
      >
        <Save className="inline-block mr-2" size={20} />
        Save Snowflake
      </button>
    </div>
  );
};

export default Day4Game;