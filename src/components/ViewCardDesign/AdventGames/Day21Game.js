import React, { useState, useEffect } from 'react';
import { PuzzleIcon, Save } from 'lucide-react';

const Day21Game = ({ onSave, initialState }) => {
  const [pieces, setPieces] = useState(initialState?.pieces || []);
  const [completed, setCompleted] = useState(false);

  const images = [
    'Christmas Tree',
    'Santa Claus',
    'Snowman',
    'Reindeer'
  ];

  const [selectedImage, setSelectedImage] = useState(initialState?.selectedImage || '');

  useEffect(() => {
    if (selectedImage && pieces.length === 0) {
      const newPieces = Array(9).fill().map((_, index) => ({
        id: index,
        position: index,
        correct: false
      }));
      setPieces(shuffleArray(newPieces));
    }
  }, [selectedImage]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handlePieceClick = (clickedPiece) => {
    const updatedPieces = pieces.map(piece => {
      if (piece.id === clickedPiece.id) {
        return { ...piece, correct: piece.position === piece.id };
      }
      return piece;
    });
    setPieces(updatedPieces);
    setCompleted(updatedPieces.every(piece => piece.correct));
  };

  const handleSave = () => {
    onSave({ pieces, selectedImage });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center">Holiday Jigsaw Puzzle</h3>
      {!selectedImage ? (
        <div>
          <h4 className="font-semibold">Select an image:</h4>
          <div className="grid grid-cols-2 gap-2">
            {images.map(image => (
              <button
                key={image}
                onClick={() => setSelectedImage(image)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                {image}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-1 w-64 h-64 mx-auto">
            {pieces.map(piece => (
              <div
                key={piece.id}
                onClick={() => handlePieceClick(piece)}
                className={`w-20 h-20 border-2 ${
                  piece.correct ? 'border-green-500' : 'border-red-500'
                } cursor-pointer`}
              >
                Piece {piece.id + 1}
              </div>
            ))}
          </div>
          {completed && <p className="text-center text-green-500 font-bold">Puzzle Completed!</p>}
          <button 
            onClick={handleSave} 
            className="bg-yellow-500 text-white px-4 py-2 rounded w-full flex items-center justify-center"
          >
            <PuzzleIcon className="mr-2" size={20} />
            Save Puzzle Progress
          </button>
        </>
      )}
    </div>
  );
};

export default Day21Game;