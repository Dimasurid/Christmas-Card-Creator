import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { LanguageContext } from '../contexts/LanguageContext'; // You'll need to create this context

function Navbar() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const { language, setLanguage } = useContext(LanguageContext);

  const signOut = () => {
    auth.signOut().then(() => {
      navigate('/login');
    });
  };

  const handleAccountClick = () => {
    if (user) {
      setShowDropdown(!showDropdown);
    } else {
      navigate('/login');
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'vi' : 'en');
  };

  const navItems = {
    en: {
      home: "Home",
      myCards: "My Cards",
      help: "Help",
      signOut: "Sign Out",
    },
    vi: {
      home: "Trang chủ",
      myCards: "Thiệp của tôi",
      help: "Trợ giúp",
      signOut: "Đăng xuất",
    }
  };

  return (
    <header className="bg-gradient-to-r from-red-700 to-green-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-yellow-300">Christmas Card Creator</Link>
        <nav className="flex space-x-6">
          <Link to="/home" className="hover:text-yellow-300 transition duration-300">{navItems[language].home}</Link>
          <Link to="/mycards" className="hover:text-yellow-300 transition duration-300">{navItems[language].myCards}</Link>
          <Link to="/help" className="hover:text-yellow-300 transition duration-300">{navItems[language].help}</Link>
        </nav>
        <div className="flex items-center space-x-4 relative">
          <button className="hover:text-yellow-300 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <button onClick={handleAccountClick} className="hover:text-yellow-300 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
          <button onClick={toggleLanguage} className="hover:text-yellow-300 transition duration-300">
            {language === 'en' ? 'VI' : 'EN'}
          </button>
          {user && showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10 top-full">
              <button
                onClick={signOut}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                {navItems[language].signOut}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;