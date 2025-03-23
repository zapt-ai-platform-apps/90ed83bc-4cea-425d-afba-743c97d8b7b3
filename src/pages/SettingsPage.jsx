import React, { useState } from 'react';
import BottleTypeList from '@/components/settings/BottleTypeList';
import ProfileSettings from '@/components/settings/ProfileSettings';
import AccountSettings from '@/components/settings/AccountSettings';
import PermissionsSettings from '@/components/settings/PermissionsSettings';
import { FaCog, FaUser, FaIdCard, FaBell } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

export default function SettingsPage() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  
  const tabs = [
    { id: 'profile', label: 'Profile', icon: <FaUser /> },
    { id: 'account', label: 'Account', icon: <FaIdCard /> },
    { id: 'permissions', label: 'Permissions', icon: <FaBell /> },
  ];
  
  // Only add the 'Products' tab for sellers/admins
  if (currentUser?.role === 'admin' || currentUser?.role === 'deliverer') {
    tabs.push({ id: 'products', label: 'Products', icon: <FaCog /> });
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <FaCog className="text-2xl text-cyan-600 mr-3" />
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>
        
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`mr-1 py-4 px-6 border-b-2 font-medium text-sm cursor-pointer ${
                    activeTab === tab.id
                      ? 'border-cyan-500 text-cyan-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>
        
        <div className="card">
          {activeTab === 'profile' && <ProfileSettings />}
          {activeTab === 'account' && <AccountSettings />}
          {activeTab === 'permissions' && <PermissionsSettings />}
          {activeTab === 'products' && <BottleTypeList />}
        </div>
      </div>
    </div>
  );
}