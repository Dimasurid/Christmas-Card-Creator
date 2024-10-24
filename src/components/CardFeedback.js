import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { ThumbsUp, ThumbsDown, Star, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

const FeedbackButton = ({ onClick, disabled, children, variant }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded-full shadow-lg transition-all duration-300 ${
      disabled
        ? 'bg-gray-300 cursor-not-allowed'
        : variant === 'like'
        ? 'bg-green-500 hover:bg-green-600'
        : variant === 'dislike'
        ? 'bg-red-500 hover:bg-red-600'
        : variant === 'favorite'
        ? 'bg-yellow-500 hover:bg-yellow-600'
        : 'bg-blue-500 hover:bg-blue-600'
    } text-white font-bold flex items-center justify-center`}
  >
    {children}
  </motion.button>
);

const CardFeedback = ({ cardId, cardData, isPublicView }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [likeCount, setLikeCount] = useState(cardData.likeCount || 0);
  const [dislikeCount, setDislikeCount] = useState(cardData.dislikeCount || 0);
  const [showDislikeDialog, setShowDislikeDialog] = useState(false);
  const [dislikeReason, setDislikeReason] = useState('');
  const [showRegenerateDialog, setShowRegenerateDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLiked(cardData.liked || false);
    setIsDisliked(cardData.disliked || false);
    setIsFavorite(cardData.favorite || false);
  }, [cardData]);

  const handleLike = async () => {
    if (isDisliked) {
      setIsDisliked(false);
      setDislikeCount(prevCount => prevCount - 1);
    }
    setIsLiked(true);
    setLikeCount(prevCount => prevCount + 1);
    await updateDoc(doc(db, 'cards', cardId), { 
      liked: true,
      disliked: false,
      likeCount: increment(1),
      dislikeCount: isDisliked ? increment(-1) : increment(0)
    });
    toast.success('Thank you for your feedback!', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  const handleDislike = () => {
    setShowDislikeDialog(true);
  };

  const confirmDislike = async () => {
    if (isLiked) {
      setIsLiked(false);
      setLikeCount(prevCount => prevCount - 1);
    }
    setIsDisliked(true);
    setDislikeCount(prevCount => prevCount + 1);
    await updateDoc(doc(db, 'cards', cardId), { 
      liked: false,
      disliked: true,
      likeCount: isLiked ? increment(-1) : increment(0),
      dislikeCount: increment(1),
      dislikeReason: dislikeReason
    });
    setShowDislikeDialog(false);
    if (!isPublicView) {
      setShowRegenerateDialog(true);
    } else {
      toast.info('Thank you for your feedback!', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const handleRegenerate = () => {
    navigate(`/regenerate/${cardId}`);
  };

  const handleFavorite = async () => {
    setIsFavorite(!isFavorite);
    await updateDoc(doc(db, 'cards', cardId), { favorite: !isFavorite });
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/card/${cardId}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Share link copied to clipboard!', {
        position: 'top-right',
        autoClose: 3000,
      });
    } catch (err) {
      console.error('Failed to copy: ', err);
      toast.error('Failed to copy share link', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-4 right-4 flex flex-col gap-2 bg-transparent p-4 rounded-lg"
        >
          <FeedbackButton onClick={handleLike} disabled={isLiked} variant="like">
            <ThumbsUp className="mr-2 h-4 w-4" /> {likeCount}
          </FeedbackButton>
          <FeedbackButton onClick={handleDislike} disabled={isDisliked} variant="dislike">
            <ThumbsDown className="mr-2 h-4 w-4" /> {dislikeCount}
          </FeedbackButton>
          <FeedbackButton onClick={handleFavorite} variant="favorite">
            <Star className={`mr-2 h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
          </FeedbackButton>
          <FeedbackButton onClick={handleShare} variant="share">
            <Share2 className="mr-2 h-4 w-4" />
          </FeedbackButton>
        </motion.div>
      </AnimatePresence>

      {showDislikeDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">We're sorry you didn't like the card</h2>
            <p className="mb-4">Please let us know why you disliked it. Your feedback helps us improve.</p>
            <textarea
              value={dislikeReason}
              onChange={(e) => setDislikeReason(e.target.value)}
              placeholder="Tell us why you disliked the card..."
              className="w-full p-2 border rounded mb-4"
              rows="4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDislikeDialog(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDislike}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}

      {showRegenerateDialog && !isPublicView && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Thank you for your feedback</h2>
            <p className="mb-4">Do you want to regenerate the card?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowRegenerateDialog(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                No, thanks
              </button>
              <button
                onClick={handleRegenerate}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Yes, regenerate
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardFeedback;
