import React from 'react';

const GingerbreadDesign = ({ card, onClose }) => {
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gray-100">
      <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-2xl text-center">
        <h2 className="text-2xl font-bold mb-4">Gingerbread Design</h2>
        <p className="text-lg">Coming Soon!</p>
        <p className="mt-4">We're working on bringing this exciting design to life.</p>
        <div className="mt-8">
          <p className="text-xl">To: {card.recipientName}</p>
          <p className="text-xl">From: {card.senderName}</p>
          <p className="mt-4">{card.message}</p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default GingerbreadDesign;