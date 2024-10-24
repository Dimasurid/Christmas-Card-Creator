import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { TreePine, Gift, Sparkles, Mail } from 'lucide-react';

// Snowflake component
const Snowflake = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11 2.05V12h2V2.05c5.053.501 9 4.765 9 9.95 0 5.523-4.477 10-10 10S2 17.523 2 12c0-5.185 3.947-9.449 9-9.95z" />
  </svg>
);

const SnowglobeLoadingAnimation = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentIcon, setCurrentIcon] = useState(0);

  const icons = [
    { icon: TreePine, color: 'text-green-500', label: 'Creating a winter wonderland...' },
    { icon: Gift, color: 'text-red-500', label: 'Wrapping your surprise...' },
    { icon: Sparkles, color: 'text-yellow-500', label: 'Adding holiday magic...' },
    { icon: Mail, color: 'text-blue-500', label: 'Preparing your special message...' }
  ];

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

  useEffect(() => {
    const iconIndex = Math.floor(progress / 25);
    setCurrentIcon(iconIndex < icons.length ? iconIndex : icons.length - 1);
  }, [progress]);

  return (
    <div className="fixed inset-0 bg-gray-100 flex items-center justify-center z-50">
      <div className="w-80 text-center">
        <motion.div
          className="w-64 h-64 mx-auto bg-gradient-to-b from-blue-100 to-white rounded-full border-4 border-blue-300 overflow-hidden shadow-lg relative"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <motion.div
            key={currentIcon}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            {React.createElement(icons[currentIcon]?.icon, { 
              size: 80, 
              className: `${icons[currentIcon]?.color}`
            })}
          </motion.div>

          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-white"
              initial={{
                x: Math.random() * 200 - 100,
                y: 200,
                opacity: 0,
              }}
              animate={{
                y: -50,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeOut",
                delay: Math.random() * 2,
              }}
            >
              <Snowflake size={8} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-8 w-full h-4 bg-gray-200 rounded-full overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
        >
          <motion.div
            className="h-full bg-blue-400"
            style={{ width: `${progress}%` }}
          />
        </motion.div>

        <motion.p
          className="mt-4 text-gray-700 font-semibold"
          animate={{
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {icons[currentIcon]?.label}
        </motion.p>

        <p className="mt-2 text-gray-600 text-sm">{progress}% Complete</p>
      </div>
    </div>
  );
};

const SnowglobeDesign = ({ card, onClose }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [shakeCount, setShakeCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const controls = useAnimation();

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleShake = () => {
    controls.start({
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.5 }
    });
    setShakeCount(prevCount => prevCount + 1);
    
    if (shakeCount === 2) {
      setTimeout(() => setIsRevealed(true), 1000);
    } else {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000);
    }
  };

  const snowflakes = [...Array(50)].map((_, i) => (
    <motion.div
      key={i}
      className="absolute text-white"
      initial={{
        x: Math.random() * 300 - 150,
        y: Math.random() * 300 - 150,
        scale: 0,
        opacity: 0
      }}
      animate={{
        y: 300,
        scale: [0, 1, 0],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        delay: Math.random() * 3
      }}
    >
      <Snowflake size={8} />
    </motion.div>
  ));

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-cover bg-center p-4" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1607262807149-dfd4c39320a6?q=80&w=2070&auto=format&fit=crop')" }}>
      {isLoading ? (
        <SnowglobeLoadingAnimation onComplete={handleLoadingComplete} />
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
                <motion.div
                  animate={controls}
                  className="w-80 h-80 bg-gradient-to-b from-blue-100 to-white rounded-full border-8 border-blue-300 overflow-hidden shadow-2xl relative cursor-pointer"
                  onClick={handleShake}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <TreePine size={100} className="text-green-700" />
                  </div>
                  {snowflakes}
                </motion.div>

                {showMessage && (
                  <motion.div
                    className="absolute top-20 bg-white p-4 rounded-lg shadow-lg"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                  >
                    <p className="text-lg font-semibold text-blue-600">
                      {shakeCount === 0 ? "Shake the snowglobe!" : "Shake it once more!"}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isRevealed && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-white rounded-lg p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
                  initial={{ scale: 0.8, y: 50 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ type: 'spring', damping: 15 }}
                >
                  {snowflakes}
                  <h1 className="text-4xl font-bold text-blue-600 mb-6">Happy Holidays!</h1>
                  <div className="space-y-4 mb-6">
                    <p className="text-xl text-gray-800">To: {card.recipientName}</p>
                    <p className="text-xl text-gray-800">From: {card.senderName}</p>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">{card.message}</p>
                  <div className="mt-8 flex justify-between items-end">
                    <TreePine size={30} className="text-green-500" />
                    <Gift size={30} className="text-red-500" />
                    <Sparkles size={30} className="text-yellow-500" />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
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

export default SnowglobeDesign;