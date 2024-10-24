import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import CardFeedback from './CardFeedback';
import { FaSpinner } from 'react-icons/fa';

// Import all design components
import SnowglobeDesign from './ViewCardDesign/SnowglobeDesign';
import OrigamiDesign from './ViewCardDesign/OrigamiDesign';
import VintageDesign from './ViewCardDesign/VintageDesign';
import AdventDesign from './ViewCardDesign/AdventDesign';
import NorthernLightsDesign from './ViewCardDesign/NorthernLightsDesign';
import GingerbreadDesign from './ViewCardDesign/GingerbreadDesign';
import MusicBoxDesign from './ViewCardDesign/MusicBoxDesign';

function ViewCard({ isPublicView = false }) {
  const [card, setCard] = useState(null);
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

  const handleClose = () => {
    if (isPublicView) {
      window.location.href = '/';
    } else {
      navigate('/home');
    }
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

  const renderDesign = () => {
    const DesignComponent = {
      snowglobe: SnowglobeDesign,
      origami: OrigamiDesign,
      vintage: VintageDesign,
      advent: AdventDesign,
      'northern-lights': NorthernLightsDesign,
      gingerbread: GingerbreadDesign,
      'music-box': MusicBoxDesign,
    }[card.design];

    return DesignComponent ? (
      <DesignComponent card={card} onClose={handleClose} />
    ) : (
      <div className="text-center mt-10">
        Unknown design type. Please try again.
      </div>
    );
  };

  return (
    <div className="relative">
      {renderDesign()}
      <CardFeedback cardId={id} cardData={card} isPublicView={isPublicView} />
      {isPublicView && (
        <div className="fixed bottom-4 left-4">
          <a
            href="/"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Your Own Card
          </a>
        </div>
      )}
    </div>
  );
}

export default ViewCard;