import React, { useContext } from 'react';
import { FaQuestion, FaPencilAlt, FaEnvelope, FaLightbulb, FaUserFriends } from 'react-icons/fa';
import { LanguageContext } from '../contexts/LanguageContext';

function Help() {
  const { language } = useContext(LanguageContext);

  const translations = {
    en: {
      title: 'Help',
      sections: [
        {
          title: 'How to create a new card',
          content: 'Click on the "Create new card" button on the homepage. Fill in the recipient\'s information, choose a theme, and create content. You can customize the card as you wish.'
        },
        {
          title: 'Sending cards',
          content: 'After creating a card, you can send it directly via email or download it for printing. We provide various sharing options.'
        },
        {
          title: 'Content ideas',
          content: 'Don\'t know what to write? Don\'t worry! We have many ready-made templates and content suggestions suitable for each card recipient.'
        },
        {
          title: 'Contact management',
          content: 'You can save and manage your list of card recipients. This makes it easy to send cards annually without re-entering information.'
        },
      ],
      needHelp: 'Still need help?',
      contactUs: 'Don\'t hesitate to contact us at:'
    },
    vi: {
      title: 'Trợ giúp',
      sections: [
        {
          title: 'Cách tạo thiệp mới',
          content: 'Nhấn vào nút "Tạo thiệp mới" trên trang chủ. Điền thông tin người nhận, chọn chủ đề và tạo nội dung. Bạn có thể tùy chỉnh thiệp theo ý muốn.'
        },
        {
          title: 'Gửi thiệp',
          content: 'Sau khi tạo thiệp, bạn có thể gửi trực tiếp qua email hoặc tải về để in. Chúng tôi cung cấp nhiều tùy chọn chia sẻ khác nhau.'
        },
        {
          title: 'Ý tưởng nội dung',
          content: 'Không biết viết gì? Đừng lo! Chúng tôi có nhiều mẫu có sẵn và gợi ý nội dung phù hợp với từng đối tượng nhận thiệp.'
        },
        {
          title: 'Quản lý danh bạ',
          content: 'Bạn có thể lưu và quản lý danh sách người nhận thiệp. Điều này giúp bạn dễ dàng gửi thiệp hàng năm mà không cần nhập lại thông tin.'
        },
      ],
      needHelp: 'Vẫn cần trợ giúp?',
      contactUs: 'Đừng ngại liên hệ với chúng tôi qua:'
    }
  };

  const t = translations[language];
  const icons = [<FaPencilAlt />, <FaEnvelope />, <FaLightbulb />, <FaUserFriends />];

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-800 to-green-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-yellow-300 mb-12">
          <FaQuestion className="inline-block mr-2" />
          {t.title}
        </h1>
        
        <div className="space-y-8">
          {t.sections.map((section, index) => (
            <div key={index} className="bg-white bg-opacity-10 rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 backdrop-filter backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-4 text-yellow-300 flex items-center">
                {React.cloneElement(icons[index], { className: "mr-2" })}
                {section.title}
              </h2>
              <p className="text-green-200">{section.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-yellow-300">{t.needHelp}</h2>
          <p className="text-green-200 mb-4">{t.contactUs}</p>
          <a href="mailto:support@christmascardcreator.com" className="bg-yellow-500 hover:bg-yellow-600 text-red-800 font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow-lg inline-block">
            support@christmascardcreator.com
          </a>
        </div>
      </div>
    </div>
  );
}

export default Help;