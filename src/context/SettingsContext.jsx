import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const SettingsContext = createContext();

export function useSettings() {
  return useContext(SettingsContext);
}

export function SettingsProvider({ children }) {
  const { currentUser, isAdmin, isSeller } = useAuth();
  
  const [waterBottleTypes, setWaterBottleTypes] = useState(() => {
    const savedTypes = localStorage.getItem('waterBottleTypes');
    return savedTypes ? JSON.parse(savedTypes) : [
      { id: 1, name: '18.9L Dispenser Bottle', price: 50 },
      { id: 2, name: '10L Bottle', price: 30 },
      { id: 3, name: '5L Bottle', price: 15 },
      { id: 4, name: '1.5L Bottle', price: 5 }
    ];
  });
  
  const [paymentOptions, setPaymentOptions] = useState(() => {
    const savedOptions = localStorage.getItem('paymentOptions');
    return savedOptions ? JSON.parse(savedOptions) : [
      { id: 'cash', name: 'Cash on Delivery', enabled: true },
      { id: 'mobile_money', name: 'Mobile Money', enabled: true },
      { id: 'bank_transfer', name: 'Bank Transfer', enabled: true },
      { id: 'credit_card', name: 'Credit Card', enabled: false }
    ];
  });
  
  const [tipOptions, setTipOptions] = useState(() => {
    const savedOptions = localStorage.getItem('tipOptions');
    return savedOptions ? JSON.parse(savedOptions) : [
      { id: 'tip_0', percentage: 0, label: 'No Tip' },
      { id: 'tip_1', percentage: 5, label: '5%' },
      { id: 'tip_2', percentage: 10, label: '10%' },
      { id: 'tip_3', percentage: 15, label: '15%' },
      { id: 'tip_4', percentage: 20, label: '20%' }
    ];
  });
  
  const [appSettings, setAppSettings] = useState(() => {
    const savedSettings = localStorage.getItem('appSettings');
    return savedSettings ? JSON.parse(savedSettings) : {
      deliveryRadius: 20, // km
      minOrderAmount: 50, // Kwacha
      deliveryFee: 15, // Kwacha
      notifications: {
        orderConfirmation: true,
        deliveryUpdates: true,
        promotions: false
      }
    };
  });

  useEffect(() => {
    localStorage.setItem('waterBottleTypes', JSON.stringify(waterBottleTypes));
  }, [waterBottleTypes]);

  useEffect(() => {
    localStorage.setItem('paymentOptions', JSON.stringify(paymentOptions));
  }, [paymentOptions]);

  useEffect(() => {
    localStorage.setItem('tipOptions', JSON.stringify(tipOptions));
  }, [tipOptions]);

  useEffect(() => {
    localStorage.setItem('appSettings', JSON.stringify(appSettings));
  }, [appSettings]);

  // Water bottle type management
  const addBottleType = (type) => {
    if (!isSeller) return false;
    
    setWaterBottleTypes(prev => {
      const newId = prev.length > 0 ? Math.max(...prev.map(t => t.id)) + 1 : 1;
      return [...prev, { id: newId, ...type }];
    });
    return true;
  };

  const updateBottleType = (id, updatedType) => {
    if (!isSeller) return false;
    
    setWaterBottleTypes(prev => 
      prev.map(type => type.id === id ? { ...type, ...updatedType } : type)
    );
    return true;
  };

  const deleteBottleType = (id) => {
    if (!isSeller) return false;
    
    setWaterBottleTypes(prev => prev.filter(type => type.id !== id));
    return true;
  };

  // Payment options management
  const updatePaymentOption = (id, updates) => {
    if (!isAdmin) return false;
    
    setPaymentOptions(prev => 
      prev.map(option => option.id === id ? { ...option, ...updates } : option)
    );
    return true;
  };

  // Tip options management
  const updateTipOption = (id, updates) => {
    if (!isAdmin) return false;
    
    setTipOptions(prev => 
      prev.map(option => option.id === id ? { ...option, ...updates } : option)
    );
    return true;
  };

  // App settings management
  const updateAppSettings = (updates) => {
    if (!isAdmin) return false;
    
    setAppSettings(prev => ({
      ...prev,
      ...updates
    }));
    return true;
  };

  // Get enabled payment options
  const getEnabledPaymentOptions = () => {
    return paymentOptions.filter(option => option.enabled);
  };

  const value = {
    waterBottleTypes,
    paymentOptions: getEnabledPaymentOptions(),
    allPaymentOptions: paymentOptions,
    tipOptions,
    appSettings,
    addBottleType,
    updateBottleType,
    deleteBottleType,
    updatePaymentOption,
    updateTipOption,
    updateAppSettings,
    canEditPrices: isSeller
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}