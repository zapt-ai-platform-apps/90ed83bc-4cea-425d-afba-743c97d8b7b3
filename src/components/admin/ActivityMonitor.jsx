import React, { useState, useEffect } from 'react';
import { useNotifications } from '@/context/NotificationContext';
import { FaCheckCircle, FaInfoCircle, FaExclamationCircle, FaTruck, FaUser, FaCalendarAlt, FaMapMarkedAlt } from 'react-icons/fa';

export default function ActivityMonitor() {
  const { notifications } = useNotifications();
  const [filter, setFilter] = useState('all');
  const [activities, setActivities] = useState([]);
  
  useEffect(() => {
    // Convert notifications to activities
    const notificationActivities = notifications.map(notification => ({
      id: notification.id,
      type: notification.type || 'order',
      title: notification.title || 'Order Activity',
      message: notification.message,
      timestamp: notification.timestamp,
      status: notification.status || 'info',
      location: notification.location,
      userInfo: notification.userInfo,
      read: notification.read
    }));
    
    setActivities(notificationActivities);
  }, [notifications]);
  
  const filteredActivities = activities.filter(activity => {
    if (filter === 'all') return true;
    return activity.type === filter;
  });
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <FaCheckCircle className="text-green-500" />;
      case 'warning':
        return <FaExclamationCircle className="text-yellow-500" />;
      case 'error':
        return <FaExclamationCircle className="text-red-500" />;
      default:
        return <FaInfoCircle className="text-blue-500" />;
    }
  };
  
  const getTypeIcon = (type) => {
    switch (type) {
      case 'delivery':
        return <FaTruck className="text-cyan-600" />;
      case 'user':
        return <FaUser className="text-purple-600" />;
      default:
        return <FaCalendarAlt className="text-cyan-600" />;
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Activity Monitor</h2>
        <div className="flex space-x-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="text-sm border border-gray-300 rounded-md px-3 py-1.5 box-border"
          >
            <option value="all">All Activities</option>
            <option value="order">Orders</option>
            <option value="delivery">Deliveries</option>
            <option value="user">User Activities</option>
          </select>
        </div>
      </div>
      
      {activities.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-md">
          <FaInfoCircle className="text-gray-400 text-3xl mx-auto mb-3" />
          <p className="text-gray-500">No activities to display</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredActivities.map((activity) => (
            <div 
              key={activity.id} 
              className={`bg-white p-4 rounded-lg border ${activity.read ? 'border-gray-200' : 'border-cyan-300'}`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
                  {getTypeIcon(activity.type)}
                </div>
                
                <div className="ml-4 flex-1">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium">{activity.title}</h3>
                    <span className="text-gray-500 text-sm">{formatDate(activity.timestamp)}</span>
                  </div>
                  
                  <p className="text-gray-600 mt-1">{activity.message}</p>
                  
                  {activity.location && (
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <FaMapMarkedAlt className="mr-1" />
                      <span>{activity.location}</span>
                    </div>
                  )}
                  
                  {activity.userInfo && (
                    <div className="mt-2 text-sm">
                      <span className="font-medium">Customer: </span>
                      <span>{activity.userInfo.name} ({activity.userInfo.phone})</span>
                    </div>
                  )}
                </div>
                
                <div className="ml-4 flex-shrink-0">
                  {getStatusIcon(activity.status)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}