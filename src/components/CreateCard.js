import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { db, auth } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import CardForm from './CardForm';
import { generateMessage, generateSuggestedInfo } from './AIHelpers';
import { motion } from 'framer-motion';
import { FaGift, FaSnowflake } from 'react-icons/fa';
import { LanguageContext } from '../contexts/LanguageContext';

function CreateCard() {
  const [cardData, setCardData] = useState({
    senderName: '',
    recipientName: '',
    relationship: '',
    theme: 'classic',
    design: 'snowglobe',
    occasion: 'Christmas',
    tone: 'warm',
    additionalInfo: '',
    language: 'Vietnamese'
  });
  const [isCreating, setIsCreating] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const [suggestedInfo, setSuggestedInfo] = useState('');
  const [previewMessage, setPreviewMessage] = useState('');
  const [cardId, setCardId] = useState(null);
  const [shareLink, setShareLink] = useState('');
  const { language } = useContext(LanguageContext);

  const translations = {
    en: {
      createCard: 'Create Your Perfect Card',
      regenerateCard: 'Regenerate Your Card',
      step: 'Step',
      of: 'of',
      shareLinkCopied: 'Share link copied to clipboard!',
      errorCreating: 'Failed to create card. Please try again.',
      errorPreview: 'Failed to generate preview message. Please try again.',
    },
    vi: {
      createCard: 'Tạo Thiệp Hoàn Hảo Của Bạn',
      regenerateCard: 'Tạo Lại Thiệp Của Bạn',
      step: 'Bước',
      of: 'trên',
      shareLinkCopied: 'Đã sao chép liên kết chia sẻ vào bộ nhớ tạm!',
      errorCreating: 'Không thể tạo thiệp. Vui lòng thử lại.',
      errorPreview: 'Không thể tạo tin nhắn xem trước. Vui lòng thử lại.',
    }
  };

  const t = translations[language];

  useEffect(() => {
    if (location.state && location.state.initialData) {
      setCardData(location.state.initialData);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      const generatedMessage = await generateMessage(cardData);
      const docRef = await addDoc(collection(db, 'cards'), {
        ...cardData,
        message: generatedMessage,
        createdAt: new Date(),
        userId: auth.currentUser.uid
      });
      const newCardId = docRef.id;
      setCardId(newCardId);
      const newShareLink = `${window.location.origin}/view/${newCardId}`;
      setShareLink(newShareLink);
      setStep(4);
    } catch (error) {
      console.error('Error creating card:', error);
      alert(t.errorCreating);
    } finally {
      setIsCreating(false);
    }
  };

  const handleCancel = () => {
    navigate('/home');
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handlePreviewMessage = async () => {
    setIsCreating(true);
    try {
      const message = await generateMessage(cardData);
      setPreviewMessage(message);
    } catch (error) {
      console.error('Error generating preview message:', error);
      alert(t.errorPreview);
    } finally {
      setIsCreating(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(shareLink)
      .then(() => alert(t.shareLinkCopied))
      .catch(err => console.error('Failed to copy: ', err));
  };

  const handleContinue = () => {
    navigate(`/card/${cardId}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-800 to-green-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-3xl mx-auto bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-lg shadow-2xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h2 
          className="text-4xl font-bold mb-8 text-center text-yellow-300"
          variants={itemVariants}
        >
          {location.state && location.state.initialData ? t.regenerateCard : t.createCard}
        </motion.h2>
        <motion.div 
          className="mb-8 bg-gray-700 rounded-full overflow-hidden"
          variants={itemVariants}
        >
          <div 
            className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-1 leading-none rounded-full flex items-center justify-center"
            style={{width: `${(step / 4) * 100}%`}}
          >
            <FaGift className="mr-2" /> {t.step} {step} {t.of} 4
          </div>
        </motion.div>
        <CardForm
          cardData={cardData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          handlePreviewMessage={handlePreviewMessage}
          handleShare={handleShare}
          handleContinue={handleContinue}
          isCreating={isCreating}
          step={step}
          nextStep={nextStep}
          prevStep={prevStep}
          suggestedInfo={suggestedInfo}
          previewMessage={previewMessage}
          shareLink={shareLink}
        />
      </motion.div>

      {/* Snow effect */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        {[...Array(50)].map((_, index) => (
          <FaSnowflake
            key={index}
            className="text-white text-opacity-50 absolute animate-fall"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 5}s`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${Math.random() * 20 + 10}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default CreateCard;