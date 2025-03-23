import React, { useState } from 'react';
import { useSettings } from '@/context/SettingsContext';
import toast from 'react-hot-toast';
import { FaPlus, FaMinus, FaCheckCircle } from 'react-icons/fa';

export default function OrderForm({ address, marker }) {
  const { waterBottleTypes } = useSettings();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [quantities, setQuantities] = useState({});
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const updateQuantity = (id, value) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(0, parseInt(value) || 0)
    }));
  };

  const incrementQuantity = (id) => {
    updateQuantity(id, (quantities[id] || 0) + 1);
  };

  const decrementQuantity = (id) => {
    updateQuantity(id, (quantities[id] || 0) - 1);
  };

  const getTotalPrice = () => {
    return waterBottleTypes.reduce((total, type) => {
      return total + (type.price * (quantities[type.id] || 0));
    }, 0);
  };

  const validateForm = () => {
    if (!name.trim()) {
      toast.error('Please enter your name');
      return false;
    }
    
    if (!phone.trim()) {
      toast.error('Please enter your phone number');
      return false;
    }
    
    if (!marker) {
      toast.error('Please select your delivery location on the map');
      return false;
    }
    
    const totalItems = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
    if (totalItems === 0) {
      toast.error('Please select at least one water bottle');
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Order submitted:', {
        name,
        phone,
        email,
        address,
        location: marker,
        items: waterBottleTypes
          .filter(type => quantities[type.id] > 0)
          .map(type => ({
            id: type.id,
            name: type.name,
            price: type.price,
            quantity: quantities[type.id]
          })),
        totalPrice: getTotalPrice(),
        additionalNotes
      });
      
      toast.success('Your order has been placed successfully!');
      setOrderComplete(true);
      setIsSubmitting(false);
    }, 1500);
  };

  const resetForm = () => {
    setName('');
    setPhone('');
    setEmail('');
    setQuantities({});
    setAdditionalNotes('');
    setOrderComplete(false);
  };

  if (orderComplete) {
    return (
      <div className="text-center py-8">
        <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Order Placed!</h2>
        <p className="mb-6">Thank you for your order. We'll contact you shortly to confirm delivery details.</p>
        <button 
          onClick={resetForm}
          className="btn-primary"
        >
          Place Another Order
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="font-medium mb-2">Your Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name*
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number*
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input-field"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email (optional)
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-2">Delivery Location</h3>
        <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
          {address ? (
            <p>{address}</p>
          ) : (
            <p className="text-gray-500 italic">Please select a location on the map</p>
          )}
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-2">Water Bottles</h3>
        <div className="space-y-3">
          {waterBottleTypes.map((type) => (
            <div key={type.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-md">
              <div>
                <p className="font-medium">{type.name}</p>
                <p className="text-gray-600">K{type.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  type="button"
                  onClick={() => decrementQuantity(type.id)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
                  disabled={!quantities[type.id]}
                >
                  <FaMinus className="text-gray-600" />
                </button>
                <input
                  type="number"
                  min="0"
                  value={quantities[type.id] || 0}
                  onChange={(e) => updateQuantity(type.id, e.target.value)}
                  className="w-12 text-center border border-gray-300 rounded-md box-border"
                />
                <button 
                  type="button"
                  onClick={() => incrementQuantity(type.id)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
                >
                  <FaPlus className="text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
          Additional Notes (optional)
        </label>
        <textarea
          id="notes"
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
          className="input-field min-h-[100px]"
        />
      </div>
      
      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between mb-4">
          <span className="font-medium">Total:</span>
          <span className="font-bold text-lg">K{getTotalPrice().toFixed(2)}</span>
        </div>
        <button 
          type="submit" 
          className="btn-primary w-full py-3"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
              Processing...
            </div>
          ) : (
            'Place Order'
          )}
        </button>
      </div>
    </form>
  );
}