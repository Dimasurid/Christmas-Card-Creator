import React, { useState, useEffect } from 'react';
import { Film, Check, X, Save } from 'lucide-react';

const Day22Game = ({ onSave, initialState }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(initialState?.score || 0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const questions = [
    {
      question: "In 'Home Alone', what do the burglars call themselves?",
      options: ["The Wet Bandits", "The Sticky Bandits", "The Christmas Crooks", "The Holiday Hustlers"],
      correctAnswer: 0
    },
    {
      question: "Which actor played Buddy in the movie 'Elf'?",
      options: ["Will Ferrell", "Jim Carrey", "Adam Sandler", "Steve Carell"],
      correctAnswer: 0
    },
    {
      question: "What is the name of the magical train in 'The Polar Express'?",
      options: ["The North Pole Express", "The Christmas Choo-Choo", "The Polar Express", "The Arctic Flyer"],
      correctAnswer: 2
    },
    {
      question: "In 'A Christmas Story', what does Ralphie want for Christmas?",
      options: ["A football", "A Red Ryder BB gun", "A bicycle", "A toy train"],
      correctAnswer: 1
    },
    {
      question: "Which country is considered to have started the tradition of putting up a Christmas tree?",
      options: ["USA", "England", "France", "Germany"],
      correctAnswer: 3
    }
  ];

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    setShowAnswer(true);
    if (index === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowAnswer(false);
      setSelectedAnswer(null);
    }
  };

  const handleSave = () => {
    onSave({ score });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center">Christmas Movie Trivia</h3>
      <div className="text-center">
        <p className="font-bold">Score: {score}/{questions.length}</p>
        <p>Question {currentQuestion + 1} of {questions.length}</p>
      </div>
      <div className="bg-red-100 p-4 rounded">
        <p className="font-semibold">{questions[currentQuestion].question}</p>
        <div className="space-y-2 mt-2">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={showAnswer}
              className={`w-full p-2 rounded ${
                showAnswer
                  ? index === questions[currentQuestion].correctAnswer
                    ? 'bg-green-500 text-white'
                    : index === selectedAnswer
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-200'
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      {showAnswer && (
        <div className="flex justify-center">
          <button
            onClick={nextQuestion}
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={currentQuestion === questions.length - 1}
          >
            Next Question
          </button>
        </div>
      )}
      <button 
        onClick={handleSave} 
        className="bg-green-500 text-white px-4 py-2 rounded w-full flex items-center justify-center"
      >
        <Save className="mr-2" size={20} />
        Save Score
      </button>
    </div>
  );
};

export default Day22Game;