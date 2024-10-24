import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, Music, Snowflake, X, Check, Save, Lock } from 'lucide-react';

// Import all game components
import Day1Game from './AdventGames/Day1Game';
import Day2Game from './AdventGames/Day2Game';
import Day3Game from './AdventGames/Day3Game';
import Day4Game from './AdventGames/Day4Game';
import Day5Game from './AdventGames/Day5Game';
import Day6Game from './AdventGames/Day6Game';
import Day7Game from './AdventGames/Day7Game';
import Day8Game from './AdventGames/Day8Game';
import Day9Game from './AdventGames/Day9Game';
import Day10Game from './AdventGames/Day10Game';
import Day11Game from './AdventGames/Day11Game';
import Day12Game from './AdventGames/Day12Game';
import Day13Game from './AdventGames/Day13Game';
import Day14Game from './AdventGames/Day14Game';
import Day15Game from './AdventGames/Day15Game';
import Day16Game from './AdventGames/Day16Game';
import Day17Game from './AdventGames/Day17Game';
import Day18Game from './AdventGames/Day18Game';
import Day19Game from './AdventGames/Day19Game';
import Day20Game from './AdventGames/Day20Game';
import Day21Game from './AdventGames/Day21Game';
import Day22Game from './AdventGames/Day22Game';
import Day23Game from './AdventGames/Day23Game';
import Day24Game from './AdventGames/Day24Game';

// Simulated storage functions (in a real app, these would be API calls)
const saveGameProgress = (day, progress) => {
  localStorage.setItem(`adventDay${day}`, JSON.stringify(progress));
};

const loadGameProgress = (day) => {
  const saved = localStorage.getItem(`adventDay${day}`);
  return saved ? JSON.parse(saved) : null;
};

const Snowfall = () => {
  const snowflakes = Array.from({ length: 50 }).map((_, i) => (
    <motion.div
      key={i}
      className="absolute text-white"
      initial={{ top: -20, left: `${Math.random() * 100}%` }}
      animate={{
        top: '100%',
        left: `${Math.random() * 100}%`,
        rotate: 360,
      }}
      transition={{
        duration: Math.random() * 10 + 5,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <Snowflake size={Math.random() * 15 + 5} />
    </motion.div>
  ));

  return <div className="absolute inset-0 overflow-hidden pointer-events-none">{snowflakes}</div>;
};

const GameWrapper = ({ day, content, onClose, onSave }) => {
  const [gameState, setGameState] = useState(loadGameProgress(day) || null);

  const handleSave = (progress) => {
    setGameState(progress);
    saveGameProgress(day, progress);
    onSave(day);
  };

  const renderGame = () => {
    switch (day) {
      case 1:
        return <Day1Game onSave={handleSave} initialState={gameState} />;
      case 2:
        return <Day2Game onSave={handleSave} initialState={gameState} />;
      case 3:
        return <Day3Game onSave={handleSave} initialState={gameState} />;
      case 4:
        return <Day4Game onSave={handleSave} initialState={gameState} />;
      case 5:
        return <Day5Game onSave={handleSave} initialState={gameState} />;
      case 6:
        return <Day6Game onSave={handleSave} initialState={gameState} />;
      case 7:
        return <Day7Game onSave={handleSave} initialState={gameState} />;
      case 8:
        return <Day8Game onSave={handleSave} initialState={gameState} />;
      case 9:
        return <Day9Game onSave={handleSave} initialState={gameState} />;
      case 10:
        return <Day10Game onSave={handleSave} initialState={gameState} />;
      case 11:
        return <Day11Game onSave={handleSave} initialState={gameState} />;
      case 12:
        return <Day12Game onSave={handleSave} initialState={gameState} />;
      case 13:
        return <Day13Game onSave={handleSave} initialState={gameState} />;
      case 14:
        return <Day14Game onSave={handleSave} initialState={gameState} />;
      case 15:
        return <Day15Game onSave={handleSave} initialState={gameState} />;
      case 16:
        return <Day16Game onSave={handleSave} initialState={gameState} />;
      case 17:
        return <Day17Game onSave={handleSave} initialState={gameState} />;
      case 18:
        return <Day18Game onSave={handleSave} initialState={gameState} />;
      case 19:
        return <Day19Game onSave={handleSave} initialState={gameState} />;
      case 20:
        return <Day20Game onSave={handleSave} initialState={gameState} />;
      case 21:
        return <Day21Game onSave={handleSave} initialState={gameState} />;
      case 22:
        return <Day22Game onSave={handleSave} initialState={gameState} />;
      case 23:
        return <Day23Game onSave={handleSave} initialState={gameState} />;
      case 24:
        return <Day24Game onSave={handleSave} initialState={gameState} />;
      default:
        return <p>Game for this day is not yet implemented.</p>;
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl flex flex-col"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
      >
        <div className="flex justify-between items-center p-4 bg-red-600 text-white rounded-t-lg">
          <h3 className="text-2xl font-bold">Day {day}: {content}</h3>
          <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
            <X size={24} />
          </button>
        </div>
        <div className="flex-grow p-4 overflow-auto">
          {renderGame()}
        </div>
        <div className="p-4 bg-gray-100 rounded-b-lg flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Close Game
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const AdventWindow = ({ day, content, onClick, isCompleted, isLocked }) => (
  <motion.div
    className={`w-full aspect-square ${
      isLocked 
        ? 'bg-gray-400' 
        : isCompleted 
          ? 'bg-gradient-to-br from-green-600 to-green-800' 
          : 'bg-gradient-to-br from-red-600 to-red-800'
    } rounded-lg shadow-lg flex items-center justify-center cursor-pointer overflow-hidden`}
    whileHover={{ scale: isLocked ? 1 : 1.05 }}
    onClick={isLocked ? null : onClick}
  >
    <span className="font-bold text-2xl text-white">{day}</span>
    {isCompleted && <Check className="absolute top-2 right-2 text-white" size={16} />}
    {isLocked && <Lock className="absolute top-2 right-2 text-white" size={16} />}
  </motion.div>
);

const AdventDesign = ({ card, onClose }) => {
  const [openGame, setOpenGame] = useState(null);
  const [completedDays, setCompletedDays] = useState(() => {
    const saved = localStorage.getItem('completedDays');
    return saved ? JSON.parse(saved) : [];
  });
  const [isRevealed, setIsRevealed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 1000 * 60); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const isDecember = currentDate.getMonth() === 11;
  const currentDay = currentDate.getDate();

  const adventContent = [
    "Decorate your Christmas tree! 🎄",
    "Bake some Christmas cookies! 🍪",
    "Sing a Christmas carol! 🎵",
    "Make a paper snowflake! ❄️",
    "Write a letter to Santa! ✉️",
    "Drink some hot cocoa! ☕",
    "Watch a Christmas movie! 🎬",
    "Make a gingerbread house! 🏠",
    "Wrap a present! 🎁",
    "Hang a wreath on your door! 🚪",
    "Light a festive candle! 🕯️",
    "Make a Christmas card! 💌",
    "Hang up your stockings! 🧦",
    "Go ice skating! ⛸️",
    "Make some mulled wine! 🍷",
    "Build a snowman! ☃️",
    "Read a Christmas story! 📚",
    "Donate to a charity! 💖",
    "Make a Christmas playlist! 🎶",
    "Wear a Christmas sweater! 👚",
    "Kiss under the mistletoe! 💋",
    "Attend a Christmas service! 🕯️",
    "Leave cookies for Santa! 🍪",
    "Open your presents! 🎉"
  ];

  const handleWindowClick = (day) => {
    if (isDecember && day <= currentDay) {
      setOpenGame(day);
      if (day === 24 && !isRevealed) {
        setIsRevealed(true);
      }
    }
  };

  const handleGameSave = (day) => {
    if (!completedDays.includes(day)) {
      const newCompletedDays = [...completedDays, day];
      setCompletedDays(newCompletedDays);
      localStorage.setItem('completedDays', JSON.stringify(newCompletedDays));
    }
  };

  const handleGameClose = () => {
    setOpenGame(null);
  };

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
    // Here you would implement playing/pausing the music
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-cover bg-center p-4 relative" 
         style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=2069&auto=format&fit=crop')" }}>
      <Snowfall />
      <div className="relative w-full max-w-4xl z-10">
        <div className="bg-green-800 p-8 rounded-xl shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-6 text-center">Advent Calendar</h2>
          {isDecember ? (
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
              {Array.from({ length: 24 }, (_, i) => i + 1).map(day => (
                <AdventWindow
                  key={day}
                  day={day}
                  content={adventContent[day - 1]}
                  onClick={() => handleWindowClick(day)}
                  isCompleted={completedDays.includes(day)}
                  isLocked={day > currentDay}
                />
              ))}
            </div>
          ) : (
            <div className="text-white text-center text-xl">
              The Advent Calendar is only available in December. Please come back then!
            </div>
          )}
          <div className="mt-4 flex justify-center">
            <button onClick={toggleMusic} className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center">
              <Music size={20} className="mr-2" />
              {isPlaying ? 'Pause Music' : 'Play Music'}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {openGame !== null && (
            <GameWrapper
              day={openGame}
              content={adventContent[openGame - 1]}
              onClose={handleGameClose}
              onSave={handleGameSave}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isRevealed && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-lg p-8 max-w-md w-full shadow-2xl relative overflow-hidden border-4 border-red-500"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: 'spring', damping: 15 }}
              >
                <div className="absolute top-4 right-4 text-red-500">
                  <Gift size={32} />
                </div>
                <h1 className="text-4xl font-bold text-red-800 mb-6">Merry Christmas!</h1>
                <div className="space-y-4 mb-6">
                  <p className="text-xl text-green-900">To: {card.recipientName}</p>
                  <p className="text-xl text-green-900">From: {card.senderName}</p>
                </div>
                <p className="text-green-800 whitespace-pre-wrap">{card.message}</p>
                <motion.div 
                  className="absolute -bottom-4 -right-4 text-yellow-500"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles size={64} />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-red-100 rounded-full p-2 shadow-md z-20"
      >
        <X className="h-6 w-6 text-red-800" />
      </button>
    </div>
  );
};

export default AdventDesign;