import React, { useState } from 'react';
import { Film, Save } from 'lucide-react';

const Day18Game = ({ onSave, initialState }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(initialState?.score || 0);
  const [showAnswer, setShowAnswer] = useState(false);

  const questions = [
    {
      question: "In 'Home Alone', what do the burglars call themselves?",
      options: ["The Wet Bandits", "The Sticky Bandits", "The Christmas Crooks", "The Holiday Heist"],
      answer: 0
    },
    {
      question: "What is the name of the main character in 'Elf'?",
      options: ["Buddy", "Holly", "Jolly", "Merry"],
      answer: 0
    },
    {
      question: "In 'A Christmas Story', what does Ralphie want for Christmas?",
      options: ["A football", "A Red Ryder BB gun", "A bicycle", "A new sled"],
      answer: 1
    }
  ];

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setShowAnswer(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowAnswer(false);
    }
  };

  const handleSave = () => {
    onSave({ score });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center">Holiday Movie Trivia</h3>
      <p className="text-center">Score: {score}/{questions.length}</p>
      <div className="space-y-2">
        <p className="font-semibold">{questions[currentQuestion].question}</p>
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            className={`w-full p-2 rounded ${
              showAnswer
                ? index === questions[currentQuestion].answer
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
                : 'bg-blue-500 text-white'
            }`}
            disabled={showAnswer}
          >
            {option}
          </button>
        ))}
      </div>
      {showAnswer && currentQuestion < questions.length - 1 && (
        <button 
          onClick={nextQuestion}
          className="bg-purple-500 text-white px-4 py-2 rounded w-full"
        >
          Next Question
        </button>
      )}
      <button 
        onClick={handleSave} 
        className="bg-green-500 text-white px-4 py-2 rounded w-full flex items-center justify-center"
      >
        <Film className="mr-2" size={20} />
        Save Trivia Score
      </button>
    </div>
  );
};

export default Day18Game;