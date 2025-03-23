import React, { useState } from 'react';
import { useSettings } from '@/context/SettingsContext';
import { FaHeart } from 'react-icons/fa';

export default function TipSelector({ orderTotal, onTipChange }) {
  const { tipOptions } = useSettings();
  const [selectedTip, setSelectedTip] = useState(tipOptions[0]?.id || '');
  const [customTip, setCustomTip] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  
  const handleTipSelect = (tipId) => {
    if (tipId === 'custom') {
      setIsCustom(true);
      setSelectedTip('custom');
      // Use existing custom value or default to 10%
      const tipValue = customTip || Math.round(orderTotal * 0.1);
      setCustomTip(tipValue.toString());
      onTipChange(tipValue);
    } else {
      setIsCustom(false);
      setSelectedTip(tipId);
      
      const option = tipOptions.find(opt => opt.id === tipId);
      if (option) {
        const tipValue = Math.round(orderTotal * (option.percentage / 100));
        onTipChange(tipValue);
      } else {
        onTipChange(0);
      }
    }
  };
  
  const handleCustomTipChange = (e) => {
    const value = e.target.value;
    setCustomTip(value);
    
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= 0) {
      onTipChange(numValue);
    } else {
      onTipChange(0);
    }
  };
  
  const calculateTipAmount = (percentage) => {
    return Math.round(orderTotal * (percentage / 100));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center mb-2">
        <FaHeart className="text-red-500 mr-2" />
        <h3 className="font-medium">Add a tip for your deliverer</h3>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {tipOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => handleTipSelect(option.id)}
            className={`py-2 px-4 border rounded-md flex flex-col items-center justify-center cursor-pointer transition-colors ${
              selectedTip === option.id
                ? 'border-cyan-500 bg-cyan-50'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <span className="font-medium">{option.label}</span>
            {option.percentage > 0 && (
              <span className="text-sm text-gray-600">
                K{calculateTipAmount(option.percentage).toFixed(2)}
              </span>
            )}
          </button>
        ))}
        
        <button
          type="button"
          onClick={() => handleTipSelect('custom')}
          className={`py-2 px-4 border rounded-md flex flex-col items-center justify-center cursor-pointer transition-colors ${
            selectedTip === 'custom'
              ? 'border-cyan-500 bg-cyan-50'
              : 'border-gray-200 hover:bg-gray-50'
          }`}
        >
          <span className="font-medium">Custom</span>
        </button>
      </div>
      
      {isCustom && (
        <div>
          <label htmlFor="customTip" className="block text-sm font-medium text-gray-700 mb-1">
            Custom Tip Amount (K)
          </label>
          <input
            id="customTip"
            type="number"
            min="0"
            value={customTip}
            onChange={handleCustomTipChange}
            className="input-field box-border"
            placeholder="Enter custom tip"
          />
        </div>
      )}
    </div>
  );
}