import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import CardFeedback from './CardFeedback';

// Import all design components
import SnowglobeDesign from './ViewCardDesign/SnowglobeDesign';
import OrigamiDesign from './ViewCardDesign/OrigamiDesign';
import VintageDesign from './ViewCardDesign/VintageDesign';
import AdventDesign from './ViewCardDesign/AdventDesign';
import NorthernLightsDesign from './ViewCardDesign/NorthernLightsDesign';
import GingerbreadDesign from './ViewCardDesign/GingerbreadDesign';
import MusicBoxDesign from './ViewCardDesign/MusicBoxDesign';

function PublicViewCard() {
  const [card, setCard] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCard = async () => {
      const docRef = doc(db, 'cards', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCard(docSnap.data());
      } else {
        console.log('No such document!');
      }
    };

    fetchCard();
  }, [id]);

  const handleRegenerateSuccess = (newMessage) => {
    setCard({ ...card, message: newMessage });
  };

  if (!card) {
    return <div className="text-center mt-10">Loading...</div>;
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
      <DesignComponent card={card} onClose={() => {}} />
    ) : (
      <div className="text-center mt-10">
        Unknown design type. Please try again.
      </div>
    );
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {renderDesign()}
      <CardFeedback cardId={id} cardData={card} isPublicView={true} />
      <div className="fixed bottom-4 left-4">
        <a
          href="/"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Your Own Card
        </a>
      </div>
    </div>
  );
}

export default PublicViewCard;