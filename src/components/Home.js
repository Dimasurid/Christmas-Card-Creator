import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { FaSearch, FaPlus, FaSnowflake, FaBell, FaGift, FaTree, FaList } from "react-icons/fa";
import { LanguageContext } from '../contexts/LanguageContext';
import { toast } from 'react-toastify';
import Card from './Card';
import { motion } from 'framer-motion';

// Using the provided Pixabay API key
const PIXABAY_API_KEY = '46476069-0c2b6df6a63e50067493dd9b7';

function Home() {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSnowing, setIsSnowing] = useState(true);
  const [loading, setLoading] = useState(true);
  const [shareLink, setShareLink] = useState('');
  const [selectedCardId, setSelectedCardId] = useState(null);
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);

  const translations = {
    en: {
      title: "Christmas Card Creator",
      greeting: "Hello",
      subtitle: "Spread joy this holiday season with personalized Christmas cards!",
      searchPlaceholder: "Search cards...",
      createNewCard: "Create new card",
      myCards: "My Cards",
      to: "To:",
      card: "Card",
      view: "View",
      edit: "Regenerate",
      share: "Share",
      delete: "Delete",
      loading: "Loading your festive creations...",
      shareLink: "Share Link:",
      shareLinkCopied: "Share link copied to clipboard!",
      seeMore: "See More"
    },
    vi: {
      title: "Tạo Thiệp Giáng Sinh",
      greeting: "Xin chào",
      subtitle: "Lan tỏa niềm vui trong mùa lễ hội với những tấm thiệp Giáng sinh cá nhân hóa!",
      searchPlaceholder: "Tìm kiếm thiệp...",
      createNewCard: "Tạo thiệp mới",
      myCards: "Thiệp của tôi",
      to: "Gửi:",
      card: "Thiệp",
      view: "Xem",
      edit: "Tái tạo",
      share: "Chia sẻ",
      delete: "Xóa",
      loading: "Đang tải những sáng tạo lễ hội của bạn...",
      shareLink: "Liên kết chia sẻ:",
      shareLinkCopied: "Đã sao chép liên kết chia sẻ vào bộ nhớ tạm!",
      seeMore: "Xem thêm"
    }
  };

  const t = translations[language];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchCards();
      } else {
        setCards([]);
        setLoading(false);
      }
    });

    const snowTimer = setTimeout(() => setIsSnowing(false), 10000);

    return () => {
      unsubscribe();
      clearTimeout(snowTimer);
    };
  }, []);

  // Fetching an image from Pixabay API
  const fetchPixabayImage = async () => {
    try {
      const response = await fetch(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=christmas&image_type=photo&orientation=horizontal`);
      const data = await response.json();
      if (data.hits && data.hits.length > 0) {
        return data.hits[0].webformatURL; // Use webformatURL or any preferred image size
      }
      return null;
    } catch (error) {
      console.error("Error fetching Pixabay image:", error);
      return null;
    }
  };

  const fetchCards = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'cards'), where('userId', '==', auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      const cardData = await Promise.all(querySnapshot.docs.map(async (doc) => {
        const card = { id: doc.id, ...doc.data() };
        if (!card.imageUrl) {
          const imageUrl = await fetchPixabayImage();
          if (imageUrl) {
            await updateDoc(doc.ref, { imageUrl });
            card.imageUrl = imageUrl;
          }
        }
        return card;
      }));
      setCards(cardData);
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = (id) => {
    navigate(`/regenerate/${id}`);
  };

  const handleShare = (id) => {
    const newShareLink = `${window.location.origin}/view/${id}`;
    setShareLink(newShareLink);
    setSelectedCardId(id);
    navigator.clipboard.writeText(newShareLink)
      .then(() => toast.success(t.shareLinkCopied))
      .catch(err => {
        console.error('Error copying link: ', err);
        toast.error("Error copying link. Please try again.");
      });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'cards', id));
    fetchCards();
  };

  const handleView = (id) => {
    navigate(`/card/${id}`);
  };

  const filteredCards = cards.filter(card =>
    card.recipientName.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 3); // Only take the first 3 cards

  const textVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-800 to-green-900 text-white flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FaSnowflake className="text-6xl mb-4 animate-spin text-yellow-300" />
          <h2 className="text-3xl font-bold mb-2">{t.loading}</h2>
          <p className="text-xl text-green-200">{t.subtitle}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-800 to-green-900 text-white overflow-hidden">
      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.header 
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 
            className="text-6xl font-bold mb-4 text-yellow-300 animate-pulse"
            variants={textVariants}
          >
            {t.title}
          </motion.h1>
          <motion.p 
            className="text-2xl text-green-200"
            variants={textVariants}
          >
            {t.greeting}, {auth.currentUser?.displayName}! {t.subtitle}
          </motion.p>
        </motion.header>

        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <form onSubmit={(e) => e.preventDefault()} className="w-full md:w-1/2 mb-6 md:mb-0">
            <div className="relative">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                className="w-full py-3 px-4 pr-12 rounded-full bg-white bg-opacity-20 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search cards"
              />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-300 text-2xl" />
            </div>
          </form>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/create')}
              className="bg-yellow-500 hover:bg-yellow-600 text-red-800 font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow-lg"
              aria-label="Create new card"
            >
              <FaPlus className="inline-block mr-2" /> {t.createNewCard}
            </button>
            <button
              onClick={() => navigate('/mycards')}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300 shadow-lg"
              aria-label="View my cards"
            >
              <FaList className="inline-block mr-2" /> {t.myCards}
            </button>
          </div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {filteredCards.map(card => (
            <motion.div key={card.id} variants={textVariants}>
              <Card
                card={card}
                onView={handleView}
                onEdit={handleRegenerate}
                onShare={handleShare}
                onDelete={handleDelete}
                t={t}
                selectedCardId={selectedCardId}
                shareLink={shareLink}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* See More button */}
        {cards.length > 3 && (
          <motion.div 
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={() => navigate('/mycards')}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-lg"
            >
              {t.seeMore}
            </button>
          </motion.div>
        )}
      </div>

      <div className="fixed bottom-4 right-4 flex space-x-4">
        <button className="bg-green-600 p-3 rounded-full shadow-lg hover:bg-green-700 transition duration-300" aria-label="Notifications">
          <FaBell className="text-2xl" />
        </button>
        <button className="bg-red-600 p-3 rounded-full shadow-lg hover:bg-red-700 transition duration-300" aria-label="Gift ideas">
          <FaGift className="text-2xl" />
        </button>
      </div>

      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <FaTree className="text-green-800 opacity-10 absolute top-1/4 left-1/4 text-9xl transform -rotate-12" />
        <FaTree className="text-green-800 opacity-10 absolute bottom-1/4 right-1/4 text-9xl transform rotate-12" />
        {isSnowing && [
          ...Array(50).keys()
        ].map((index) => (
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

export default Home;