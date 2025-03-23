import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const NotificationContext = createContext();

export function useNotifications() {
  return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState(() => {
    const savedNotifications = localStorage.getItem('notifications');
    return savedNotifications ? JSON.parse(savedNotifications) : [];
  });

  // Save notifications to localStorage
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Add a new notification
  const addNotification = (notification) => {
    const newNotification = {
      id: `notification-${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false,
      ...notification
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Show toast notification based on recipient role and distance
    if (currentUser) {
      const isAdmin = currentUser.role === 'admin';
      const isTargetedDeliverer = currentUser.role === 'deliverer' && 
        (notification.distance <= 10 || isAdmin);
      
      if (isAdmin || isTargetedDeliverer) {
        toast.success(notification.message, {
          duration: 5000,
          icon: '🔔'
        });
      }
    }
    
    return newNotification.id;
  };

  // Mark notification as read
  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, read: true } 
          : notif
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  // Delete a notification
  const deleteNotification = (notificationId) => {
    setNotifications(prev => 
      prev.filter(notif => notif.id !== notificationId)
    );
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Get unread notifications count
  const getUnreadCount = () => {
    if (!currentUser) return 0;
    
    return notifications.filter(notif => {
      // Admin gets all notifications
      if (currentUser.role === 'admin') {
        return !notif.read;
      }
      
      // Deliverers get notifications based on distance
      if (currentUser.role === 'deliverer') {
        return !notif.read && (notif.distance <= 10);
      }
      
      // Customers only get notifications addressed to them
      return !notif.read && notif.userId === currentUser.id;
    }).length;
  };

  // Get notifications for current user based on role
  const getUserNotifications = () => {
    if (!currentUser) return [];
    
    return notifications.filter(notif => {
      // Admin gets all notifications
      if (currentUser.role === 'admin') {
        return true;
      }
      
      // Deliverers get notifications based on distance
      if (currentUser.role === 'deliverer') {
        return notif.distance <= 10;
      }
      
      // Customers only get notifications addressed to them
      return notif.userId === currentUser.id;
    }).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  };

  const value = {
    notifications: getUserNotifications(),
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    unreadCount: getUnreadCount()
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}