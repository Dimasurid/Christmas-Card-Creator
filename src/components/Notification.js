import React from 'react';
import { Link } from 'react-router-dom';

function Notification({ notification }) {
  return (
    <div className="p-4 border-t border-gray-200">
      <p className="text-sm text-gray-700">{notification.message}</p>
      <Link to={`/card/${notification.cardId}`} className="text-xs text-blue-500 hover:underline">
        View Card
      </Link>
    </div>
  );
}

export default Notification;