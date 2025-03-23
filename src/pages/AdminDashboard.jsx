import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaCog, FaBell, FaSignOutAlt } from 'react-icons/fa';
import ActivityMonitor from '@/components/admin/ActivityMonitor';
import EmployeeManagement from '@/components/admin/EmployeeManagement';
import AdminSettings from '@/components/admin/AdminSettings';
import NotificationList from '@/components/notifications/NotificationList';
import { useNotifications } from '@/context/NotificationContext';

export default function AdminDashboard() {
  const { currentUser, isAdmin, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const [activeTab, setActiveTab] = useState('activity');
  const navigate = useNavigate();
  
  // Redirect if not admin
  if (!currentUser || !isAdmin) {
    navigate('/login');
    return null;
  }
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <FaTachometerAlt className="text-cyan-600 text-2xl" />
              <h1 className="ml-2 text-xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            
            <div className="flex items-center">
              <span className="mr-4 text-gray-700">
                Welcome, {currentUser.name || currentUser.username}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center text-red-600 hover:text-red-800 cursor-pointer"
              >
                <FaSignOutAlt className="mr-1" /> Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
          <div className="bg-white rounded-lg shadow-md p-4 h-fit">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('activity')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer ${
                  activeTab === 'activity'
                    ? 'bg-cyan-100 text-cyan-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FaTachometerAlt className="mr-3 text-lg" />
                <span>Activity Monitor</span>
              </button>
              
              <button
                onClick={() => setActiveTab('employees')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer ${
                  activeTab === 'employees'
                    ? 'bg-cyan-100 text-cyan-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FaUsers className="mr-3 text-lg" />
                <span>Employee Management</span>
              </button>
              
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer ${
                  activeTab === 'settings'
                    ? 'bg-cyan-100 text-cyan-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FaCog className="mr-3 text-lg" />
                <span>App Settings</span>
              </button>
              
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer ${
                  activeTab === 'notifications'
                    ? 'bg-cyan-100 text-cyan-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="relative mr-3">
                  <FaBell className="text-lg" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </div>
                <span>Notifications</span>
              </button>
            </nav>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center">
                  {currentUser.name ? currentUser.name[0].toUpperCase() : 'A'}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">{currentUser.name || currentUser.username}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            {activeTab === 'activity' && <ActivityMonitor />}
            {activeTab === 'employees' && <EmployeeManagement />}
            {activeTab === 'settings' && <AdminSettings />}
            {activeTab === 'notifications' && <NotificationList />}
          </div>
        </div>
      </div>
    </div>
  );
}