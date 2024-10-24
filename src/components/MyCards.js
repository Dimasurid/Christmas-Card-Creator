import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs, deleteDoc, doc, writeBatch } from 'firebase/firestore';
import { FaSearch, FaPlus, FaSnowflake, FaTrashAlt, FaChevronLeft, FaChevronRight, FaSpinner } from "react-icons/fa";
import { LanguageContext } from '../contexts/LanguageContext';
import { toast } from 'react-toastify';
import Card from './Card';

// Translations object
const translations = {
  en: {
    title: "My Card Collection",
    greeting: "Hello, {name}! Manage and create cards for your loved ones!",
    searchPlaceholder: "Search cards...",
    sortByDate: "Sort by date",
    sortByName: "Sort by name",
    allCategories: "All categories",
    birthday: "Birthday",
    wedding: "Wedding",
    holiday: "Holiday",
    createNewCard: "Create new card",
    to: "To:",
    card: "Card",
    view: "View",
    edit: "Regenerate",
    share: "Share",
    delete: "Delete",
    deleteAll: "Delete All Cards",
    deleteAllConfirm: "Are you sure you want to delete all cards? This action cannot be undone.",
    noCardsFound: "No cards found matching your search.",
    design: "Design:",
    shareLinkCopied: "Share link copied to clipboard!",
    errorDeletingCards: "An error occurred while deleting cards. Please try again.",
    cardDeleted: "Card deleted successfully.",
    allCardsDeleted: "All cards deleted successfully.",
    shareLink: "Share Link:",
    page: "Page",
    previous: "Previous",
    next: "Next",
    loading: "Loading your magical cards..."
  },
  vi: {
    title: "Kho Thiệp Của Tôi",
    greeting: "Xin chào, {name}! Quản lý và tạo thiệp cho những người thân yêu của bạn!",
    searchPlaceholder: "Tìm kiếm thiệp...",
    sortByDate: "Sắp xếp theo ngày",
    sortByName: "Sắp xếp theo tên",
    allCategories: "Tất cả thể loại",
    birthday: "Sinh nhật",
    wedding: "Đám cưới",
    holiday: "Ngày lễ",
    createNewCard: "Tạo thiệp mới",
    to: "Gửi:",
    card: "Thiệp",
    view: "Xem",
    edit: "Sửa",
    share: "Chia sẻ",
    delete: "Xóa",
    deleteAll: "Xóa Tất Cả Thiệp",
    deleteAllConfirm: "Bạn có chắc chắn muốn xóa tất cả thiệp? Hành động này không thể hoàn tác.",
    noCardsFound: "Không tìm thấy thiệp nào phù hợp.",
    design: "Thiết kế:",
    shareLinkCopied: "Đã sao chép liên kết chia sẻ vào bộ nhớ tạm!",
    errorDeletingCards: "Đã xảy ra lỗi khi xóa thiệp. Vui lòng thử lại.",
    cardDeleted: "Đã xóa thiệp thành công.",
    allCardsDeleted: "Đã xóa tất cả thiệp thành công.",
    shareLink: "Liên kết chia sẻ:",
    page: "Trang",
    previous: "Trước",
    next: "Tiếp",
    loading: "Đang tải những tấm thiệp kỳ diệu của bạn..."
  }
};

function MyCards() {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filterBy, setFilterBy] = useState('all');
  const [isSnowing, setIsSnowing] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [shareLink, setShareLink] = useState('');
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(6);
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);

  const t = translations[language];

  const fetchCards = useCallback(async () => {
    if (!auth.currentUser) return;
    setIsLoading(true);
    try {
      const q = query(collection(db, "cards"), where("userId", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      const fetchedCards = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCards(fetchedCards);
    } catch (error) {
      console.error("Error fetching cards: ", error);
      toast.error("Error fetching cards. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const handleDelete = async (id) => {
    if (window.confirm(t.deleteAllConfirm)) {
      try {
        await deleteDoc(doc(db, "cards", id));
        setCards(cards.filter(card => card.id !== id));
        toast.success(t.cardDeleted);
      } catch (error) {
        console.error("Error deleting card: ", error);
        toast.error(t.errorDeletingCards);
      }
    }
  };

  const handleDeleteAll = async () => {
    if (window.confirm(t.deleteAllConfirm)) {
      try {
        const batch = writeBatch(db);
        cards.forEach((card) => {
          const cardRef = doc(db, "cards", card.id);
          batch.delete(cardRef);
        });
        await batch.commit();
        setCards([]);
        toast.success(t.allCardsDeleted);
      } catch (error) {
        console.error("Error deleting all cards: ", error);
        toast.error(t.errorDeletingCards);
      }
    }
  };

  const handleRegenerate = (id) => {
    navigate(`/regenerate/${id}`);
  };

  const handleView = (id) => {
    navigate(`/card/${id}`);
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

  const filteredCards = cards
    .filter(card => card.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) || card.message.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(card => filterBy === 'all' || card.category === filterBy)
    .sort((a, b) => {
      if (sortBy === 'date') {
        return b.createdAt.toDate() - a.createdAt.toDate();
      } else {
        return a.recipientName.localeCompare(b.recipientName);
      }
    });

  // Pagination logic
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-800 to-green-900 text-white overflow-hidden">
      <div className="container mx-auto px-4 py-8 relative z-10">
        <header className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 text-yellow-300 animate-pulse">
            {t.title}
          </h1>
          <p className="text-2xl text-green-200">
            {t.greeting.replace("{name}", auth.currentUser?.displayName)}
          </p>
        </header>

        <div className="bg-white bg-opacity-10 rounded-lg p-6 mb-8 backdrop-filter backdrop-blur-sm">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
            <form onSubmit={(e) => e.preventDefault()} className="w-full md:w-1/3 mb-6 md:mb-0">
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
              <select
                className="bg-white bg-opacity-20 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort cards"
              >
                <option value="date">{t.sortByDate}</option>
                <option value="name">{t.sortByName}</option>
              </select>
              <select
                className="bg-white bg-opacity-20 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                aria-label="Filter cards"
              >
                <option value="all">{t.allCategories}</option>
                <option value="birthday">{t.birthday}</option>
                <option value="wedding">{t.wedding}</option>
                <option value="holiday">{t.holiday}</option>
              </select>
              <button
                onClick={() => navigate('/create')}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
                aria-label="Create new card"
              >
                <FaPlus className="inline-block mr-2" /> {t.createNewCard}
              </button>
              <button
                onClick={handleDeleteAll}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
                aria-label="Delete all cards"
              >
                <FaTrashAlt className="inline-block mr-2" /> {t.deleteAll}
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <FaSpinner className="inline-block text-6xl text-yellow-300 animate-spin mb-4" />
            <p className="text-2xl text-green-200">{t.loading}</p>
          </div>
        ) : currentCards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentCards.map(card => (
              <Card
                key={card.id}
                card={card}
                onView={handleView}
                onEdit={handleRegenerate}
                onShare={handleShare}
                onDelete={handleDelete}
                t={t}
                selectedCardId={selectedCardId}
                shareLink={shareLink}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-2xl mt-12">{t.noCardsFound}</div>
        )}

        {/* Pagination */}
        {filteredCards.length > cardsPerPage && (
          <div className="mt-8 flex justify-center items-center space-x-4">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-yellow-500 hover:bg-yellow-600 text-red-800 font-bold py-2 px-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaChevronLeft />
            </button>
            <span className="text-lg font-semibold">
              {t.page} {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-yellow-500 hover:bg-yellow-600 text-red-800 font-bold py-2 px-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>

      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
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

export default MyCards;