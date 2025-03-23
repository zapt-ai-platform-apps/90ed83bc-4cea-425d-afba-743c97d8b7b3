import React, { useState } from 'react';
import { useSettings } from '@/context/SettingsContext';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { FaToggleOn, FaToggleOff, FaBell, FaMapMarked, FaTag } from 'react-icons/fa';

export default function PermissionsSettings() {
  const { appSettings, updateAppSettings } = useSettings();
  const { currentUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const notifications = appSettings.notifications || {
    orderConfirmation: true,
    deliveryUpdates: true,
    promotions: false
  };
  
  const handleToggle = (key) => {
    if (!currentUser) return;
    
    setIsSubmitting(true);
    
    // Create a new notifications object with the toggled setting
    const updatedNotifications = {
      ...notifications,
      [key]: !notifications[key]
    };
    
    // Simulate API delay
    setTimeout(() => {
      const success = updateAppSettings({
        notifications: updatedNotifications
      });
      
      if (success) {
        toast.success('Settings updated');
      }
      
      setIsSubmitting(false);
    }, 500);
  };

  if (!currentUser) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-600">Please sign in to view permissions settings</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">App Permissions</h2>
      
      <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-medium mb-1">Notifications</h3>
          <p className="text-sm text-gray-600">
            Control what notifications you receive from the app
          </p>
        </div>
        
        <div className="divide-y divide-gray-100">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-start">
              <div className="mt-0.5 mr-3 text-cyan-600">
                <FaBell />
              </div>
              <div>
                <p className="font-medium">Order Confirmations</p>
                <p className="text-sm text-gray-600">
                  Receive notifications when your order is confirmed
                </p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('orderConfirmation')}
              className="text-2xl cursor-pointer"
              disabled={isSubmitting}
            >
              {notifications.orderConfirmation ? (
                <FaToggleOn className="text-cyan-600" />
              ) : (
                <FaToggleOff className="text-gray-400" />
              )}
            </button>
          </div>
          
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-start">
              <div className="mt-0.5 mr-3 text-cyan-600">
                <FaMapMarked />
              </div>
              <div>
                <p className="font-medium">Delivery Updates</p>
                <p className="text-sm text-gray-600">
                  Receive notifications about your delivery status
                </p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('deliveryUpdates')}
              className="text-2xl cursor-pointer"
              disabled={isSubmitting}
            >
              {notifications.deliveryUpdates ? (
                <FaToggleOn className="text-cyan-600" />
              ) : (
                <FaToggleOff className="text-gray-400" />
              )}
            </button>
          </div>
          
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-start">
              <div className="mt-0.5 mr-3 text-cyan-600">
                <FaTag />
              </div>
              <div>
                <p className="font-medium">Promotions & Offers</p>
                <p className="text-sm text-gray-600">
                  Receive notifications about deals and special offers
                </p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('promotions')}
              className="text-2xl cursor-pointer"
              disabled={isSubmitting}
            >
              {notifications.promotions ? (
                <FaToggleOn className="text-cyan-600" />
              ) : (
                <FaToggleOff className="text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-gray-500">
        You can change your notification preferences at any time
      </p>
    </div>
  );
}