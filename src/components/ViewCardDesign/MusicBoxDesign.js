import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Disc, Music2, Pause, Play, Key, Lock } from 'lucide-react';

// Note component
const Note = ({ size, rotation }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ transform: `rotate(${rotation}deg)` }}>
    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
  </svg>
);

const MusicBoxLoadingAnimation = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentIcon, setCurrentIcon] = useState(0);

  const icons = [
    { icon: Music, color: 'text-purple-500', label: 'Tuning the music box...' },
    { icon: Disc, color: 'text-blue-500', label: 'Winding up the mechanism...' },
    { icon: Music2, color: 'text-pink-500', label: 'Composing your melody...' },
    { icon: Play, color: 'text-green-500', label: 'Preparing to play...' }
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
          className="w-64 h-64 mx-auto bg-gradient-to-r from-amber-200 to-amber-100 rounded-lg border-4 border-amber-300 overflow-hidden shadow-lg relative"
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

          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-amber-500"
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
              <Note size={16} rotation={Math.random() * 360} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="w-72 h-8 bg-amber-300 mx-auto -mt-4 rounded-b-lg shadow-md"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3 }}
        />

        <motion.div 
          className="mt-8 w-full h-4 bg-gray-200 rounded-full overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
        >
          <motion.div
            className="h-full bg-amber-400"
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

const MusicBoxDesign = ({ card, onClose }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isKeyClicked, setIsKeyClicked] = useState(false);
  const [showFunMessage, setShowFunMessage] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleKeyClick = () => {
    setIsKeyClicked(true);
    setTimeout(() => {
      setIsRevealed(true);
      setIsPlaying(true);
    }, 1500);
  };

  const handleBoxClick = () => {
    if (!isKeyClicked) {
      setShowFunMessage(true);
      setTimeout(() => setShowFunMessage(false), 3000);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-cover bg-center p-4" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1606023941307-c6ac60c40198?q=80&w=2070&auto=format&fit=crop')" }}>
      {isLoading ? (
        <MusicBoxLoadingAnimation onComplete={handleLoadingComplete} />
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
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-amber-300"
                    initial={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      scale: 0,
                      rotate: Math.random() * 360
                    }}
                    animate={{
                      top: '100%',
                      scale: [0, 1, 0],
                      rotate: Math.random() * 360 + 360,
                      transition: {
                        repeat: Infinity,
                        duration: 5 + Math.random() * 5,
                        delay: Math.random() * 5
                      }
                    }}
                  >
                    <Note size={16} rotation={0} />
                  </motion.div>
                ))}

                {/* Enhanced Music Box */}
                <motion.div
                  className="w-80 h-60 bg-gradient-to-r from-amber-700 to-amber-600 rounded-lg shadow-2xl relative overflow-hidden cursor-pointer"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  onClick={handleBoxClick}
                >
                  {/* Box Lid */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-500 rounded-t-lg origin-bottom"
                    initial={{ rotateX: 0 }}
                    animate={{ rotateX: isKeyClicked ? -100 : 0 }}
                    transition={{ duration: 1, type: 'spring', stiffness: 120, damping: 20 }}
                  >
                    {/* Lock */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      animate={{ opacity: isKeyClicked ? 0 : 1 }}
                    >
                      <Lock size={40} className="text-amber-800" />
                    </motion.div>
                  </motion.div>

                  {/* Box Interior */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ opacity: isKeyClicked ? 1 : 0 }}
                  >
                    <Disc size={100} className="text-amber-300" />
                  </motion.div>

                  {/* Box Details */}
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-amber-800 rounded-b-lg" />
                  <div className="absolute top-0 left-0 right-0 h-4 bg-amber-800 rounded-t-lg" />
                </motion.div>

                {/* Key */}
                <motion.div
                  className="absolute cursor-pointer"
                  initial={{ x: 200, y: 0, rotate: 0 }}
                  animate={isKeyClicked ? { x: 0, y: -30, rotate: 90 } : { x: 200, y: 0, rotate: 0 }}
                  transition={{ duration: 1, type: 'spring', stiffness: 60, damping: 10 }}
                  onClick={handleKeyClick}
                >
                  <Key size={60} className="text-amber-400" />
                </motion.div>

                {/* Fun Message */}
                <AnimatePresence>
                  {showFunMessage && (
                    <motion.div
                      className="absolute top-20 bg-white p-4 rounded-lg shadow-lg"
                      initial={{ opacity: 0, y: -50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                    >
                      <p className="text-lg font-semibold text-amber-600">Oops! The box is locked. Try using the key!</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Card content */}
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
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-amber-300"
                      initial={{
                        x: Math.random() * 300 - 150,
                        y: 300,
                        opacity: 0,
                      }}
                      animate={{
                        y: -50,
                        opacity: isPlaying ? [0, 1, 0] : 0,
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: Math.random() * 2,
                      }}
                    >
                      <Note size={12} rotation={Math.random() * 360} />
                    </motion.div>
                  ))}

                  <h1 className="text-4xl font-bold text-amber-600 mb-6">Musical Greetings!</h1>
                  <div className="space-y-4 mb-6">
                    <p className="text-xl text-gray-800">To: {card.recipientName}</p>
                    <p className="text-xl text-gray-800">From: {card.senderName}</p>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">{card.message}</p>
                  <div className="mt-8 flex justify-between items-end">
                    <Music size={30} className="text-amber-500" />
                    <button
                      onClick={togglePlay}
                      className="bg-amber-500 text-white p-2 rounded-full shadow-md"
                    >
                      {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                    </button>
                    <Music2 size={30} className="text-amber-500" />
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

export default MusicBoxDesign;