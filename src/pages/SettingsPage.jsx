import React from 'react';
import BottleTypeList from '@/components/settings/BottleTypeList';
import { FaCog } from 'react-icons/fa';

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <FaCog className="text-2xl text-cyan-600 mr-3" />
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>
        
        <div className="card mb-8">
          <h2 className="text-xl font-semibold mb-4">Water Products Configuration</h2>
          <p className="text-gray-600 mb-6">
            Manage your water bottle types and set prices. These settings will be used for customer orders.
          </p>
          
          <BottleTypeList />
        </div>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                These settings are saved locally in your browser. Clear browser data will reset to default values.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}