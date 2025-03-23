import React from 'react';
import { useNotifications } from '@/context/NotificationContext';
import { FaBell, FaCheckCircle, FaTrash, FaEnvelope, FaInfoCircle } from 'react-icons/fa';
import { format, formatDistanceToNow } from 'date-fns';

export default function NotificationList() {
  const { notifications, markAsRead, markAllAsRead, deleteNotification, unreadCount } = useNotifications();
  
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    
    // For today's notifications, show relative time
    if (date.toDateString() === today.toDateString()) {
      return formatDistanceToNow(date, { addSuffix: true });
    }
    
    // For older notifications, show the date
    return format(date, 'MMM d, yyyy h:mm a');
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <FaBell className="text-cyan-600 mr-2" />
          <h2 className="text-xl font-semibold">Notifications</h2>
          {unreadCount > 0 && (
            <span className="ml-2 bg-cyan-600 text-white text-xs rounded-full px-2 py-1">
              {unreadCount} new
            </span>
          )}
        </div>
        
        {notifications.length > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-sm text-cyan-600 hover:text-cyan-800 cursor-pointer"
          >
            <span className="flex items-center">
              <FaCheckCircle className="mr-1" /> Mark all as read
            </span>
          </button>
        )}
      </div>
      
      {notifications.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-md">
          <FaEnvelope className="text-gray-400 text-3xl mx-auto mb-2" />
          <p className="text-gray-500">No notifications yet</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100 bg-white rounded-md border border-gray-200 overflow-hidden">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`p-4 flex justify-between ${notification.read ? 'bg-white' : 'bg-cyan-50'}`}
            >
              <div className="flex items-start space-x-3">
                <div className="mt-0.5 text-cyan-600">
                  <FaInfoCircle />
                </div>
                <div>
                  <p className={`${notification.read ? 'text-gray-800' : 'font-medium'}`}>
                    {notification.message}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatTimestamp(notification.timestamp)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="text-cyan-600 hover:bg-cyan-100 p-1 rounded cursor-pointer"
                    title="Mark as read"
                  >
                    <FaCheckCircle />
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(notification.id)}
                  className="text-red-600 hover:bg-red-100 p-1 rounded cursor-pointer"
                  title="Delete notification"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}