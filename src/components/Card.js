import React, { useState, useRef, useEffect } from 'react';
import { FaShare, FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import { motion } from 'framer-motion';

function Card({ card, onView, onEdit, onShare, onDelete, t, selectedCardId, shareLink }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (card) {
        card.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <motion.div 
      ref={cardRef}
      className="relative bg-white bg-opacity-10 rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300 ease-in-out backdrop-filter backdrop-blur-sm overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <div 
        className="absolute inset-0 bg-gradient-radial from-white to-transparent opacity-0 hover:opacity-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 100px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.2), transparent 40%)`,
        }}
      />
      <motion.img 
        src={card.image} 
        alt={card.recipientName} 
        className="w-full h-48 object-cover rounded-lg mb-4"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      />
      <motion.h3 
        className="text-xl font-semibold mb-2 text-yellow-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {t.to} {card.recipientName}
      </motion.h3>
      <motion.p 
        className="text-green-200 mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {t.card} #{card.id.slice(0, 4)} {card.category && `| ${card.category}`}
      </motion.p>
      {card.design && (
        <motion.p 
          className="text-green-200 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {t.design} {card.design}
        </motion.p>
      )}
      <motion.p 
        className="text-sm text-white mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {card.message.substring(0, 100)}...
      </motion.p>
      <motion.div 
        className="flex justify-between text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <ActionButton icon={<FaEye />} text={t.view} onClick={() => onView(card.id)} bgColor="blue" />
        <ActionButton icon={<FaEdit />} text={t.edit} onClick={() => onEdit(card.id)} bgColor="green" />
        <ActionButton icon={<FaShare />} text={t.share} onClick={() => onShare(card.id)} bgColor="yellow" />
        <ActionButton icon={<FaTrashAlt />} text={t.delete} onClick={() => onDelete(card.id)} bgColor="red" />
      </motion.div>
      {selectedCardId === card.id && shareLink && (
        <motion.div 
          className="mt-4 bg-white bg-opacity-20 p-4 rounded-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <p className="font-bold text-yellow-300 mb-2">{t.shareLink}</p>
          <p className="break-all text-green-200">{shareLink}</p>
        </motion.div>
      )}
    </motion.div>
  );
}

function ActionButton({ icon, text, onClick, bgColor }) {
  return (
    <motion.button 
      onClick={onClick} 
      className={`bg-${bgColor}-500 hover:bg-${bgColor}-600 text-white font-bold py-2 px-4 rounded-full transition duration-300`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {React.cloneElement(icon, { className: "inline-block mr-2" })} {text}
    </motion.button>
  );
}

export default Card;