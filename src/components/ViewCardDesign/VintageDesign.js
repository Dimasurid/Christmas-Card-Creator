import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Gift, Star, Mail } from 'lucide-react';

// Vintage Ornament component
const VintageOrnament = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="text-red-700">
    <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
  </svg>
);

// Vintage Bell component
const VintageBell = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="text-yellow-700">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
  </svg>
);

const VintageChristmasCardLoading = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentIcon, setCurrentIcon] = useState(0);

  const icons = [
    { icon: Bell, color: 'text-yellow-700', label: 'Đang chuẩn bị...' },
    { icon: Gift, color: 'text-red-700', label: 'Đang gói thiệp...' },
    { icon: Star, color: 'text-yellow-600', label: 'Thêm phong cách cổ điển...' },
    { icon: Mail, color: 'text-green-700', label: 'Đang gửi...' }
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
    <div className="fixed inset-0 bg-amber-50 flex items-center justify-center z-50">
      <div className="w-80 text-center">
        <motion.div
          className="w-64 h-64 mx-auto bg-amber-100 border-4 border-amber-200 overflow-hidden shadow-lg relative"
          initial={{ rotateY: 180 }}
          animate={{ rotateY: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <motion.div
            key={currentIcon}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            {React.createElement(icons[currentIcon]?.icon, { 
              size: 80, 
              className: `${icons[currentIcon]?.color}`
            })}
          </motion.div>

          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: Math.random() * 200 - 100,
                y: Math.random() * 200 - 100,
                opacity: 0
              }}
              animate={{
                opacity: [0, 1, 0],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5
                }
              }}
            >
              <VintageOrnament size={24} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="w-20 h-24 bg-amber-200 absolute top-4 right-4 rounded-sm overflow-hidden"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 15 }}
        >
          <div className="border-4 border-dashed border-amber-300 h-full flex items-center justify-center">
            <VintageBell size={32} />
          </div>
        </motion.div>

        <motion.div 
          className="mt-8 w-full h-4 bg-amber-200 rounded-full overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
        >
          <motion.div
            className="h-full bg-amber-500"
            style={{ width: `${progress}%` }}
          />
        </motion.div>

        <motion.p
          className="mt-4 text-amber-800 font-['Be Vietnam Pro', system-ui, sans-serif]"
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

        <p className="mt-2 text-amber-700 text-sm font-['Be Vietnam Pro', system-ui, sans-serif]">{progress}% Hoàn thành</p>
      </div>
    </div>
  );
};

const VintageDesign = ({ card, onClose }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Thêm font Be Vietnam Pro vào head của document
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleCardInteraction = () => {
    setIsRevealed(true);
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-cover bg-center p-4" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=2069&auto=format&fit=crop')" }}>
      {isLoading ? (
        <VintageChristmasCardLoading onComplete={handleLoadingComplete} />
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
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-red-700"
                    initial={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      rotate: 0
                    }}
                    animate={{
                      rotate: 360,
                      transition: {
                        repeat: Infinity,
                        duration: 10 + Math.random() * 5,
                        ease: "linear"
                      }
                    }}
                  >
                    <VintageOrnament size={24} />
                  </motion.div>
                ))}

                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-yellow-700"
                    initial={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      scale: 0
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      transition: {
                        repeat: Infinity,
                        duration: 5 + Math.random() * 3,
                        delay: Math.random() * 2
                      }
                    }}
                  >
                    <VintageBell size={32} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            className="absolute cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110"
            initial={{ rotateY: 180 }}
            animate={{
              rotateY: isRevealed ? 0 : 180,
              scale: isRevealed ? 1.2 : 1
            }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
            onClick={handleCardInteraction}
          >
            <svg width="200" height="150" viewBox="0 0 200 150" className="fill-amber-100 stroke-amber-700">
              <path d="M0,0 L200,0 L200,150 L0,150 Z" strokeWidth="4" />
              <path d="M0,0 L100,75 L200,0" strokeWidth="4" fill="none" />
            </svg>
            {!isRevealed && (
              <motion.span 
                className="absolute -bottom-8 left-1/2 whitespace-nowrap text-amber-800 text-lg font-['Be Vietnam Pro', system-ui, sans-serif]"
                style={{
                  transform: 'translate(-50%, 0) rotateY(180deg)',
                }}
              >
                Nhấn để mở
              </motion.span>
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
                  className="bg-amber-50 rounded-lg p-8 max-w-md w-full shadow-2xl relative overflow-hidden border-4 border-amber-200"
                  initial={{ scale: 0.8, y: 50 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ type: 'spring', damping: 15 }}
                >
                  <div className="absolute top-0 left-0 w-full h-16 bg-amber-100 opacity-50" />
                  <div className="absolute bottom-0 right-0 w-full h-16 bg-amber-100 opacity-50" />
                  <div className="absolute top-4 left-4 text-amber-700">
                    <VintageOrnament size={32} />
                  </div>
                  <div className="absolute bottom-4 right-4 text-amber-700">
                    <VintageBell size={32} />
                  </div>

                  <h1 className="text-4xl font-bold text-red-800 mb-6 font-['Be Vietnam Pro', system-ui, sans-serif]">Chúc Mừng Giáng Sinh!</h1>
                  <div className="space-y-4 mb-6">
                    <p className="text-xl text-amber-900 font-['Be Vietnam Pro', system-ui, sans-serif]">Gửi: {card.recipientName}</p>
                    <p className="text-xl text-amber-900 font-['Be Vietnam Pro', system-ui, sans-serif]">Từ: {card.senderName}</p>
                  </div>
                  <p className="text-amber-800 whitespace-pre-wrap font-['Be Vietnam Pro', system-ui, sans-serif]">{card.message}</p>
                  <div className="mt-8 flex justify-between items-end">
                    <VintageOrnament size={40} />
                    <VintageBell size={50} />
                    <VintageOrnament size={40} />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-amber-100 rounded-full p-2 shadow-md"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default VintageDesign;