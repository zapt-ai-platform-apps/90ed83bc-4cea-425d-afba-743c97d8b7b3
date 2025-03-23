import React, { createContext, useState, useContext, useEffect } from 'react';

const SettingsContext = createContext();

export function useSettings() {
  return useContext(SettingsContext);
}

export function SettingsProvider({ children }) {
  const [waterBottleTypes, setWaterBottleTypes] = useState(() => {
    const savedTypes = localStorage.getItem('waterBottleTypes');
    return savedTypes ? JSON.parse(savedTypes) : [
      { id: 1, name: '18.9L Dispenser Bottle', price: 50 },
      { id: 2, name: '10L Bottle', price: 30 },
      { id: 3, name: '5L Bottle', price: 15 },
      { id: 4, name: '1.5L Bottle', price: 5 }
    ];
  });

  useEffect(() => {
    localStorage.setItem('waterBottleTypes', JSON.stringify(waterBottleTypes));
  }, [waterBottleTypes]);

  const addBottleType = (type) => {
    setWaterBottleTypes(prev => {
      const newId = prev.length > 0 ? Math.max(...prev.map(t => t.id)) + 1 : 1;
      return [...prev, { id: newId, ...type }];
    });
  };

  const updateBottleType = (id, updatedType) => {
    setWaterBottleTypes(prev => 
      prev.map(type => type.id === id ? { ...type, ...updatedType } : type)
    );
  };

  const deleteBottleType = (id) => {
    setWaterBottleTypes(prev => prev.filter(type => type.id !== id));
  };

  const value = {
    waterBottleTypes,
    addBottleType,
    updateBottleType,
    deleteBottleType
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}