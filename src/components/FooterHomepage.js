import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaEnvelope, FaPhone, FaRegIdCard } from 'react-icons/fa';
import { LanguageContext } from '../contexts/LanguageContext';

function FooterHomepage() {
  const { language } = useContext(LanguageContext);

  const translations = {
    en: {
      title: "Christmas Card Creator",
      description: "Create unique and meaningful Christmas cards.",
      quickLinks: "Quick Links",
      home: "Home",
      myCards: "My Cards",
      help: "Help",
      contact: "Contact",
      email: "Email",
      phone: "Phone",
      copyright: "All rights reserved."
    },
    vi: {
      title: "Tạo Thiệp Giáng Sinh",
      description: "Tạo thiệp Giáng sinh độc đáo và ý nghĩa.",
      quickLinks: "Liên kết nhanh",
      home: "Trang chủ",
      myCards: "Thiệp của tôi",
      help: "Trợ giúp",
      contact: "Liên hệ",
      email: "Email",
      phone: "Điện thoại",
      copyright: "Bảo lưu mọi quyền."
    }
  };

  const t = translations[language];

  return (
    <footer className="relative bg-gradient-to-r from-red-700 to-green-700 text-white p-8 mt-auto animate-gradient-slide">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="fade-in-left">
            <h3 className="text-xl font-bold mb-4 text-yellow-300">{t.title}</h3>
            <p className="hover:scale-105 transform transition-transform duration-500">
              {t.description}
            </p>
          </div>
          <div className="fade-in-left">
            <h3 className="text-xl font-bold mb-4 text-yellow-300">{t.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/home" className="flex items-center hover:text-yellow-300 transition duration-300">
                  <FaHome className="mr-2 hover:animate-bounce" />
                  {t.home}
                </Link>
              </li>
              <li>
                <Link to="/mycards" className="flex items-center hover:text-yellow-300 transition duration-300">
                  <FaRegIdCard className="mr-2 hover:animate-bounce" />
                  {t.myCards}
                </Link>
              </li>
              <li>
                <Link to="/help" className="flex items-center hover:text-yellow-300 transition duration-300">
                  {t.help}
                </Link>
              </li>
            </ul>
          </div>
          <div className="fade-in-left">
            <h3 className="text-xl font-bold mb-4 text-yellow-300">{t.contact}</h3>
            <p className="hover:text-yellow-300 transition duration-300">{t.email}: info@christmascardcreator.com</p>
            <p className="hover:text-yellow-300 transition duration-300">{t.phone}: (123) 456-7890</p>
          </div>
        </div>
        <div className="mt-8 text-center animate-fade-in">
          <p>&copy; 2024 Christmas Card Creator. {t.copyright}</p>
        </div>
      </div>
    </footer>
  );
}

export default FooterHomepage;