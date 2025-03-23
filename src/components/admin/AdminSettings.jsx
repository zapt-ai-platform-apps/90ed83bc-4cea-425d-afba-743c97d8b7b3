import React, { useState } from 'react';
import { useSettings } from '@/context/SettingsContext';
import toast from 'react-hot-toast';
import { FaMapMarkedAlt, FaMoneyBillWave, FaCreditCard, FaToggleOn, FaToggleOff } from 'react-icons/fa';

export default function AdminSettings() {
  const { appSettings, updateAppSettings, allPaymentOptions, updatePaymentOption } = useSettings();
  const [deliveryRadius, setDeliveryRadius] = useState(appSettings.deliveryRadius);
  const [minOrderAmount, setMinOrderAmount] = useState(appSettings.minOrderAmount);
  const [deliveryFee, setDeliveryFee] = useState(appSettings.deliveryFee);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate inputs
    const radius = Number(deliveryRadius);
    const minAmount = Number(minOrderAmount);
    const fee = Number(deliveryFee);
    
    if (isNaN(radius) || radius <= 0) {
      toast.error('Delivery radius must be a positive number');
      setIsSubmitting(false);
      return;
    }
    
    if (isNaN(minAmount) || minAmount < 0) {
      toast.error('Minimum order amount must be a non-negative number');
      setIsSubmitting(false);
      return;
    }
    
    if (isNaN(fee) || fee < 0) {
      toast.error('Delivery fee must be a non-negative number');
      setIsSubmitting(false);
      return;
    }
    
    // Simulate API delay
    setTimeout(() => {
      const success = updateAppSettings({
        deliveryRadius: radius,
        minOrderAmount: minAmount,
        deliveryFee: fee
      });
      
      if (success) {
        toast.success('Settings updated successfully');
      } else {
        toast.error('Failed to update settings');
      }
      
      setIsSubmitting(false);
    }, 800);
  };
  
  const handleTogglePayment = (id) => {
    const option = allPaymentOptions.find(opt => opt.id === id);
    if (!option) return;
    
    const success = updatePaymentOption(id, {
      enabled: !option.enabled
    });
    
    if (success) {
      toast.success(`${option.name} ${option.enabled ? 'disabled' : 'enabled'}`);
    } else {
      toast.error('Failed to update payment option');
    }
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">App Configuration</h2>
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md border border-gray-200 space-y-4">
          <div>
            <label htmlFor="deliveryRadius" className="block text-sm font-medium text-gray-700 mb-1">
              Delivery Radius (km)
            </label>
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-3 text-gray-500">
                <FaMapMarkedAlt />
              </div>
              <input
                id="deliveryRadius"
                type="number"
                min="1"
                step="1"
                value={deliveryRadius}
                onChange={(e) => setDeliveryRadius(e.target.value)}
                className="input-field box-border"
                disabled={isSubmitting}
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Maximum distance for deliverers to receive order notifications
            </p>
          </div>
          
          <div>
            <label htmlFor="minOrderAmount" className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Order Amount (K)
            </label>
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-3 text-gray-500">
                <FaMoneyBillWave />
              </div>
              <input
                id="minOrderAmount"
                type="number"
                min="0"
                step="5"
                value={minOrderAmount}
                onChange={(e) => setMinOrderAmount(e.target.value)}
                className="input-field box-border"
                disabled={isSubmitting}
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Minimum amount for an order to be accepted
            </p>
          </div>
          
          <div>
            <label htmlFor="deliveryFee" className="block text-sm font-medium text-gray-700 mb-1">
              Delivery Fee (K)
            </label>
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-3 text-gray-500">
                <FaMoneyBillWave />
              </div>
              <input
                id="deliveryFee"
                type="number"
                min="0"
                step="5"
                value={deliveryFee}
                onChange={(e) => setDeliveryFee(e.target.value)}
                className="input-field box-border"
                disabled={isSubmitting}
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Base fee charged for delivery service
            </p>
          </div>
          
          <div className="pt-2">
            <button
              type="submit"
              className="btn-primary cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                  Saving...
                </div>
              ) : (
                'Save Settings'
              )}
            </button>
          </div>
        </form>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
        <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <p className="text-sm text-gray-600">
              Enable or disable payment methods available to customers
            </p>
          </div>
          
          <div className="divide-y divide-gray-100">
            {allPaymentOptions.map((option) => (
              <div key={option.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <FaCreditCard className="text-cyan-600 mr-3" />
                  <span className="font-medium">{option.name}</span>
                </div>
                <button
                  onClick={() => handleTogglePayment(option.id)}
                  className="text-2xl cursor-pointer"
                >
                  {option.enabled ? (
                    <FaToggleOn className="text-cyan-600" />
                  ) : (
                    <FaToggleOff className="text-gray-400" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}