import React, { useState } from 'react';
import { Film, Check } from 'lucide-react';

const Day7Game = ({ onSave, initialState }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(initialState?.score || 0);

  const questions = [
    {
      question: "In 'Home Alone', where are the McCallisters going on vacation when they leave Kevin behind?",
      options: ["London", "Paris", "New York", "Rome"],
      answer: 1
    },
    {
      question: "What is the name of the main character in 'The Polar Express'?",
      options: ["Billy", "Tommy", "Jimmy", "Hero Boy"],
      answer: 3
    },
    {
      question: "In 'Elf', what is Buddy's favorite food group?",
      options: ["Candy", "Spaghetti", "Syrup", "Sugar"],
      answer: 0
    }
  ];

  const handleAnswer = (selectedIndex) => {
    if (selectedIndex === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onSave({ score: score + (selectedIndex === questions[currentQuestion].answer ? 1 : 0) });
    }
  };

  return (
    <div className="space-y-4">
      {currentQuestion < questions.length ? (
        <>
          <h3 className="text-lg font-semibold">{questions[currentQuestion].question}</h3>
          <div className="space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="bg-red-500 text-white px-4 py-2 rounded w-full"
              >
                {option}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center">
          <h3 className="text-xl font-bold">Quiz Complete!</h3>
          <p className="text-lg">Your score: {score} / {questions.length}</p>
          <Film className="mx-auto mt-4" size={48} />
        </div>
      )}
    </div>
  );
};

export default Day7Game;