import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { generateMessage } from './AIHelpers';
import { FaSpinner } from 'react-icons/fa';

function Regenerate() {
  const [card, setCard] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCard = async () => {
      const docRef = doc(db, 'cards', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCard(docSnap.data());
      } else {
        console.log('No such document!');
      }
      setIsLoading(false);
    };

    fetchCard();
  }, [id]);

  const handleRegenerateMessage = async () => {
    setIsRegenerating(true);
    try {
      const prompt = `
        You are an AI assistant specializing in writing personalized Christmas card messages.
        Your task is to improve the following message based on the user's feedback:

        Original message: "${card.message}"

        User feedback: "${feedback}"

        Please rewrite the message, addressing the user's feedback and maintaining the original tone and sentiment.
        The new message should be concise, heartfelt, and tailored to the recipient (${card.to}).
        
        Additional context:
        - Sender: ${card.from}
        - Occasion: ${card.occasion}
        - Relationship: ${card.relationship}
        - Tone: ${card.tone}

        Provide only the improved message without any additional explanations.
      `;
      
      const newMessage = await generateMessage(prompt);
      await updateDoc(doc(db, 'cards', id), { message: newMessage });
      alert('Your card has been regenerated successfully!');
      navigate(`/card/${id}`);
    } catch (error) {
      console.error('Error regenerating card:', error);
      alert('Failed to regenerate card. Please try again.');
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleRegenerateAll = () => {
    navigate('/create', { state: { initialData: card } });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
        <span className="ml-2 text-xl font-semibold">Loading your magical card...</span>
      </div>
    );
  }

  if (!card) {
    return <div className="text-center mt-10">No card found. Please try again.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Regenerate Card</h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Current Message:</h3>
        <p className="bg-gray-100 p-4 rounded">{card.message}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Regenerate Options:</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">1. Edit Message</h4>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Describe what you'd like to change about the message..."
              className="w-full p-2 border border-gray-300 rounded"
              rows="4"
            />
            <button
              onClick={handleRegenerateMessage}
              disabled={isRegenerating}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {isRegenerating ? 'Regenerating...' : 'Regenerate Message'}
            </button>
          </div>
          <div>
            <h4 className="font-medium mb-2">2. Regenerate Entire Card</h4>
            <p className="mb-2">This will take you back to the card creation form with your current settings.</p>
            <button
              onClick={handleRegenerateAll}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Regenerate Entire Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Regenerate;