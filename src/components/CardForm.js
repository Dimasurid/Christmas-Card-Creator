import React, { useEffect, useContext } from 'react';
import { FaUser, FaUsers, FaHandshake, FaGift, FaPalette, FaComments, FaGlobe, FaPaintBrush, FaInfoCircle, FaSnowflake } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { LanguageContext } from '../contexts/LanguageContext';
import { generateSuggestedInfo } from './AIHelpers';

function CardForm({
  cardData,
  handleChange,
  handleSubmit,
  handleCancel,
  handlePreviewMessage,
  handleShare,
  handleContinue,
  isCreating,
  step,
  nextStep,
  prevStep,
  suggestedInfo,
  previewMessage,
  shareLink
}) {
  const { language } = useContext(LanguageContext);

  const translations = {
    en: {
      yourName: "Your Name",
      recipientName: "Recipient's Name",
      relationship: "Relationship",
      occasion: "Occasion",
      theme: "Theme",
      tone: "Tone",
      language: "Language",
      design: "Design",
      additionalInfo: "Additional Information",
      suggestedInfo: "Suggested Additional Information:",
      generatePreview: "Generate Preview Message",
      generatingPreview: "Generating Preview...",
      previewMessage: "Preview Message:",
      cardCreated: "Your card has been created!",
      shareCard: "Share Card",
      continueToCard: "Continue to Card",
      shareLink: "Share Link:",
      previous: "Previous",
      next: "Next",
      cancel: "Cancel",
      createCard: "Create Card",
      creating: "Creating...",
    },
    vi: {
      yourName: "Tên của bạn",
      recipientName: "Tên người nhận",
      relationship: "Mối quan hệ",
      occasion: "Dịp",
      theme: "Chủ đề",
      tone: "Giọng điệu",
      language: "Ngôn ngữ",
      design: "Thiết kế",
      additionalInfo: "Thông tin bổ sung",
      suggestedInfo: "Thông tin bổ sung được đề xuất:",
      generatePreview: "Tạo tin nhắn xem trước",
      generatingPreview: "Đang tạo xem trước...",
      previewMessage: "Tin nhắn xem trước:",
      cardCreated: "Thiệp của bạn đã được tạo!",
      shareCard: "Chia sẻ thiệp",
      continueToCard: "Tiếp tục đến thiệp",
      shareLink: "Liên kết chia sẻ:",
      previous: "Trước",
      next: "Tiếp theo",
      cancel: "Hủy",
      createCard: "Tạo thiệp",
      creating: "Đang tạo...",
    }
  };

  const t = translations[language];

  useEffect(() => {
    if (cardData.relationship && cardData.occasion) {
      generateSuggestedInfo(cardData);
    }
  }, [cardData.relationship, cardData.occasion]);

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
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6 bg-gradient-to-b from-red-800 to-green-900 p-8 rounded-lg shadow-xl"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {step === 1 && (
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={containerVariants}>
          <motion.div className="space-y-2" variants={itemVariants}>
            <label className="block text-sm font-medium text-yellow-300">{t.yourName}</label>
            <div className="relative">
              <FaUser className="absolute top-3 left-3 text-green-200" />
              <input
                name="senderName"
                value={cardData.senderName}
                onChange={handleChange}
                className="w-full pl-10 p-3 bg-white bg-opacity-20 rounded-full text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
                placeholder={t.yourName}
                required
              />
            </div>
          </motion.div>
          <motion.div className="space-y-2" variants={itemVariants}>
            <label className="block text-sm font-medium text-yellow-300">{t.recipientName}</label>
            <div className="relative">
              <FaUsers className="absolute top-3 left-3 text-green-200" />
              <input
                name="recipientName"
                value={cardData.recipientName}
                onChange={handleChange}
                className="w-full pl-10 p-3 bg-white bg-opacity-20 rounded-full text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
                placeholder={t.recipientName}
                required
              />
            </div>
          </motion.div>
          <motion.div className="space-y-2" variants={itemVariants}>
            <label className="block text-sm font-medium text-yellow-300">{t.relationship}</label>
            <div className="relative">
              <FaHandshake className="absolute top-3 left-3 text-green-200" />
              <select
                name="relationship"
                value={cardData.relationship}
                onChange={handleChange}
                className="w-full pl-10 p-3 bg-white bg-opacity-20 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
                required
              >
                <option value="">{t.relationship}</option>
                <option value="Family">Family</option>
                <option value="Friend">Friend</option>
                <option value="Teacher">Teacher</option>
                <option value="Colleague">Colleague</option>
                <option value="Neighbor">Neighbor</option>
              </select>
            </div>
          </motion.div>
          <motion.div className="space-y-2" variants={itemVariants}>
            <label className="block text-sm font-medium text-yellow-300">{t.occasion}</label>
            <div className="relative">
              <FaGift className="absolute top-3 left-3 text-green-200" />
              <select
                name="occasion"
                value={cardData.occasion}
                onChange={handleChange}
                className="w-full pl-10 p-3 bg-white bg-opacity-20 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
                required
              >
                <option value="Christmas">Christmas</option>
                <option value="Christmas Eve">Christmas Eve</option>
                <option value="Secret Santa">Secret Santa</option>
                <option value="Christmas Party">Christmas Party</option>
                <option value="Christmas Dinner">Christmas Dinner</option>
              </select>
            </div>
          </motion.div>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={containerVariants}>
          <motion.div className="space-y-2" variants={itemVariants}>
            <label className="block text-sm font-medium text-yellow-300">{t.theme}</label>
            <div className="relative">
              <FaPalette className="absolute top-3 left-3 text-green-200" />
              <select
                name="theme"
                value={cardData.theme}
                onChange={handleChange}
                className="w-full pl-10 p-3 bg-white bg-opacity-20 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
                required
              >
                <option value="classic">Classic Christmas</option>
                <option value="modern">Modern Christmas</option>
                <option value="cute">Cute Christmas</option>
                <option value="religious">Religious Christmas</option>
                <option value="funny">Funny Christmas</option>
              </select>
            </div>
          </motion.div>
          <motion.div className="space-y-2" variants={itemVariants}>
            <label className="block text-sm font-medium text-yellow-300">{t.tone}</label>
            <div className="relative">
              <FaComments className="absolute top-3 left-3 text-green-200" />
              <select
                name="tone"
                value={cardData.tone}
                onChange={handleChange}
                className="w-full pl-10 p-3 bg-white bg-opacity-20 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
                required
              >
                <option value="warm">Warm and Cozy</option>
                <option value="formal">Formal and Traditional</option>
                <option value="humorous">Humorous and Jolly</option>
                <option value="inspirational">Inspirational and Uplifting</option>
                <option value="nostalgic">Nostalgic and Sentimental</option>
              </select>
            </div>
          </motion.div>
          <motion.div className="space-y-2" variants={itemVariants}>
            <label className="block text-sm font-medium text-yellow-300">{t.language}</label>
            <div className="relative">
              <FaGlobe className="absolute top-3 left-3 text-green-200" />
              <select
                name="language"
                value={cardData.language}
                onChange={handleChange}
                className="w-full pl-10 p-3 bg-white bg-opacity-20 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
                required
              >
                <option value="Vietnamese">Vietnamese</option>
                <option value="English">English</option>
              </select>
            </div>
          </motion.div>
          <motion.div className="space-y-2" variants={itemVariants}>
            <label className="block text-sm font-medium text-yellow-300">{t.design}</label>
            <div className="relative">
              <FaPaintBrush className="absolute top-3 left-3 text-green-200" />
              <select
                name="design"
                value={cardData.design}
                onChange={handleChange}
                className="w-full pl-10 p-3 bg-white bg-opacity-20 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
                required
              >
                <option value="snowglobe">Snowglobe Wonder</option>
                <option value="origami">Origami Christmas Tree</option>
                <option value="vintage">Vintage Christmas Postcard</option>
                <option value="advent">Interactive Advent Calendar</option>
                <option value="northern-lights">Northern Lights Christmas</option>
                <option value="gingerbread">Gingerbread House Pop-up</option>
                <option value="music-box">Christmas Music Box</option>
              </select>
            </div>
          </motion.div>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div className="space-y-6" variants={containerVariants}>
          <motion.div className="space-y-2" variants={itemVariants}>
            <label className="block text-sm font-medium text-yellow-300">{t.additionalInfo}</label>
            <div className="relative">
              <FaInfoCircle className="absolute top-3 left-3 text-green-200" />
              <textarea
                name="additionalInfo"
                value={cardData.additionalInfo}
                onChange={handleChange}
                className="w-full pl-10 p-3 bg-white bg-opacity-20 rounded-lg text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300 h-32"
                placeholder={t.additionalInfo}
              />
            </div>
          </motion.div>
          {suggestedInfo && (
            <motion.div className="bg-blue-900 bg-opacity-50 p-4 rounded-lg" variants={itemVariants}>
              <h4 className="font-bold mb-2 text-yellow-300">{t.suggestedInfo}</h4>
              <p className="text-green-200">{suggestedInfo}</p>
            </motion.div>
          )}
          <motion.button
            type="button"
            onClick={handlePreviewMessage}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-lg"
            disabled={isCreating}
            variants={itemVariants}
          >
            {isCreating ? t.generatingPreview : t.generatePreview}
          </motion.button>
          {previewMessage && (
            <motion.div className="bg-green-900 bg-opacity-50 p-4 rounded-lg" variants={itemVariants}>
              <h4 className="font-bold mb-2 text-yellow-300">{t.previewMessage}</h4>
              <p className="text-green-200">{previewMessage}</p>
            </motion.div>
          )}
        </motion.div>
      )}

      {step === 4 && (
        <motion.div className="space-y-6" variants={containerVariants}>
          <motion.h3 className="text-2xl font-bold text-yellow-300" variants={itemVariants}>{t.cardCreated}</motion.h3>
          <motion.div className="flex space-x-4" variants={itemVariants}>
            <button
              type="button"
              onClick={handleShare}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-lg"
            >
              {t.shareCard}
            </button>
            <button
              type="button"
              onClick={handleContinue}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-300 shadow-lg"
            >
              {t.continueToCard}
            </button>
          </motion.div>
          {shareLink && (
            <motion.div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg" variants={itemVariants}>
              <p className="font-bold text-yellow-300">{t.shareLink}</p>
              <p className="break-all text-green-200">{shareLink}</p>
            </motion.div>
          )}
        </motion.div>
      )}

      <motion.div className="flex justify-between mt-8" variants={containerVariants}>
        {step > 1 && step < 4 && (
          <motion.button
            type="button"
            onClick={prevStep}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-300 shadow-lg"
            variants={itemVariants}
          >
            {t.previous}
          </motion.button>
        )}
        {step < 3 ? (
          <motion.button
            type="button"
            onClick={nextStep}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-lg"
            variants={itemVariants}
          >
            {t.next}
          </motion.button>
        ) : step === 3 ? (
          <motion.div variants={itemVariants}>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-300 shadow-lg mr-4"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              disabled={isCreating}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300 shadow-lg"
            >
              {isCreating ? t.creating : t.createCard}
            </button>
          </motion.div>
        ) : null}
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
    </motion.form>
  );
}

export default CardForm;