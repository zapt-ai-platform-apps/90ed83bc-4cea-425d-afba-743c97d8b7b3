import React from 'react';
import { useSettings } from '@/context/SettingsContext';
import { FaCreditCard, FaMoneyBillWave, FaMobileAlt, FaUniversity } from 'react-icons/fa';

export default function PaymentOptions({ selectedOption, onSelect }) {
  const { paymentOptions } = useSettings();
  
  const getPaymentIcon = (id) => {
    switch (id) {
      case 'cash':
        return <FaMoneyBillWave className="text-green-600" />;
      case 'mobile_money':
        return <FaMobileAlt className="text-blue-600" />;
      case 'bank_transfer':
        return <FaUniversity className="text-gray-600" />;
      case 'credit_card':
        return <FaCreditCard className="text-purple-600" />;
      default:
        return <FaCreditCard className="text-cyan-600" />;
    }
  };

  if (paymentOptions.length === 0) {
    return (
      <div className="text-center py-4 bg-gray-50 rounded-md">
        <p className="text-gray-500">No payment options available</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {paymentOptions.map((option) => (
        <label 
          key={option.id}
          className={`flex items-center p-3 border rounded-md cursor-pointer transition-colors ${
            selectedOption === option.id
              ? 'border-cyan-500 bg-cyan-50'
              : 'border-gray-200 hover:bg-gray-50'
          }`}
        >
          <input
            type="radio"
            name="paymentOption"
            value={option.id}
            checked={selectedOption === option.id}
            onChange={() => onSelect(option.id)}
            className="mr-3"
          />
          <div className="mr-3">
            {getPaymentIcon(option.id)}
          </div>
          <span className="font-medium">{option.name}</span>
        </label>
      ))}
    </div>
  );
}