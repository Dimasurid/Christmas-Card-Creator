import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarIcon, SendIcon } from 'lucide-react';

// Aurora component
const Aurora = ({ color, delay }) => (
  <motion.div
    className={`absolute inset-0 ${color} opacity-30`}
    initial={{ scaleY: 0, originY: 1 }}
    animate={{
      scaleY: [0, 1, 0.5, 1],
      opacity: [0.3, 0.7, 0.4, 0.6],
    }}
    transition={{
      duration: 8,
      delay: delay,
      repeat: Infinity,
      repeatType: 'reverse',
    }}
  />
);

// Star component
const Star = ({ size, top, left, twinkleDelay }) => (
  <motion.div
    className="absolute bg-white rounded-full"
    style={{
      width: size,
      height: size,
      top: `${top}%`,
      left: `${left}%`,
    }}
    animate={{
      scale: [1, 1.5, 1],
      opacity: [0.7, 1, 0.7],
    }}
    transition={{
      duration: 3,
      delay: twinkleDelay,
      repeat: Infinity,
    }}
  />
);

// Shooting Star component
const ShootingStar = () => (
  <motion.div
    className="absolute w-1 h-1 bg-white rounded-full"
    initial={{ top: "-5%", left: "100%" }}
    animate={{
      top: "105%",
      left: "-5%",
      opacity: [0, 1, 1, 0],
    }}
    transition={{
      duration: 2,
      delay: Math.random() * 10,
      repeat: Infinity,
      repeatDelay: Math.random() * 20 + 10,
    }}
  />
);

const NorthernLightsCardLoading = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          onComplete();
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-indigo-900 flex items-center justify-center z-50">
      <div className="w-80 text-center">
        <motion.div
          className="w-64 h-64 mx-auto relative overflow-hidden rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Aurora color="bg-green-400" delay={0} />
          <Aurora color="bg-blue-400" delay={2} />
          <Aurora color="bg-purple-400" delay={4} />
          {[...Array(20)].map((_, i) => (
            <Star
              key={i}
              size={Math.random() * 3 + 1}
              top={Math.random() * 100}
              left={Math.random() * 100}
              twinkleDelay={Math.random() * 3}
            />
          ))}
          <ShootingStar />
        </motion.div>
        <motion.div 
          className="mt-8 w-full h-4 bg-indigo-200 rounded-full overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
        >
          <motion.div
            className="h-full bg-indigo-500"
            style={{ width: `${progress}%` }}
          />
        </motion.div>
        <motion.p
          className="mt-4 text-indigo-200 font-semibold"
          animate={{
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Capturing the Northern Lights...
        </motion.p>
        <p className="mt-2 text-indigo-300 text-sm">{progress}% Complete</p>
      </div>
    </div>
  );
};

const NorthernLightsDesign = ({ card, onClose }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleCardInteraction = () => {
    setIsRevealed(true);
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-cover bg-center p-4" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=2070&auto=format&fit=crop')" }}>
      {isLoading ? (
        <NorthernLightsCardLoading onComplete={handleLoadingComplete} />
      ) : (
        <div className="relative w-full h-full flex justify-center items-center">
          <AnimatePresence>
            {!isRevealed && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <Aurora color="bg-green-400" delay={0} />
                <Aurora color="bg-blue-400" delay={2} />
                <Aurora color="bg-purple-400" delay={4} />
                {[...Array(50)].map((_, i) => (
                  <Star
                    key={i}
                    size={Math.random() * 3 + 1}
                    top={Math.random() * 100}
                    left={Math.random() * 100}
                    twinkleDelay={Math.random() * 3}
                  />
                ))}
                {[...Array(5)].map((_, i) => (
                  <ShootingStar key={i} />
                ))}
                <motion.div
                  className="absolute bottom-0 w-full h-1/4 bg-gradient-to-t from-black to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 2 }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            className="absolute cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110"
            initial={{ bottom: '20%' }}
            animate={{
              bottom: isRevealed ? '10%' : '20%',
              scale: isRevealed ? 1.5 : 1
            }}
            transition={{ duration: 0.5 }}
            onClick={handleCardInteraction}
          >
            <motion.div
              className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <StarIcon size={40} className="text-yellow-300" />
            </motion.div>
            {!isRevealed && (
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-white text-lg font-semibold">
                Reveal Message
              </span>
            )}
          </motion.button>

          <AnimatePresence>
            {isRevealed && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-indigo-900 bg-opacity-80 rounded-lg p-8 max-w-md w-full shadow-2xl relative overflow-hidden text-white"
                  initial={{ scale: 0.8, y: 50 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ type: 'spring', damping: 15 }}
                >
                  <Aurora color="bg-green-400" delay={0} />
                  <Aurora color="bg-blue-400" delay={2} />
                  <h1 className="text-4xl font-bold text-yellow-300 mb-6">Northern Lights Greetings</h1>
                  <div className="space-y-4 mb-6">
                    <motion.p 
                      className="text-xl"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      To: {card.recipientName}
                    </motion.p>
                    <motion.p 
                      className="text-xl"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      From: {card.senderName}
                    </motion.p>
                  </div>
                  <motion.p 
                    className="text-indigo-100 whitespace-pre-wrap relative z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 1 }}
                  >
                    {card.message}
                  </motion.p>
                  <motion.div 
                    className="mt-8 flex justify-between items-end"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <StarIcon size={30} className="text-yellow-300" />
                    <SendIcon size={25} className="text-blue-400" />
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-indigo-600 text-white rounded-full p-2 shadow-md"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default NorthernLightsDesign;