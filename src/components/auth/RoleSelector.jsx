import React from 'react';
import { FaUserAlt, FaTruck } from 'react-icons/fa';

export default function RoleSelector({ onRoleSelect }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        What will you use this app for?
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <button 
          onClick={() => onRoleSelect('customer')}
          className="flex flex-col items-center justify-center p-8 bg-white border-2 border-gray-200 rounded-lg hover:border-cyan-500 hover:shadow-md transition-all cursor-pointer"
        >
          <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mb-4">
            <FaUserAlt className="text-2xl text-cyan-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Customer</h3>
          <p className="text-gray-600 text-center">
            I want to order water for delivery to my location
          </p>
        </button>
        
        <button 
          onClick={() => onRoleSelect('deliverer')}
          className="flex flex-col items-center justify-center p-8 bg-white border-2 border-gray-200 rounded-lg hover:border-cyan-500 hover:shadow-md transition-all cursor-pointer"
        >
          <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mb-4">
            <FaTruck className="text-2xl text-cyan-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Deliverer</h3>
          <p className="text-gray-600 text-center">
            I want to deliver water orders to customers
          </p>
        </button>
      </div>
      
      <p className="text-sm text-gray-500 text-center mt-6">
        You can change your role later in settings if needed
      </p>
    </div>
  );
}