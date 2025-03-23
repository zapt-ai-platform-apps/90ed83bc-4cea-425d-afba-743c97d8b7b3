import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';

export default function BottleTypeForm({ onSubmit, initialValues = null, onCancel }) {
  const [name, setName] = useState(initialValues?.name || '');
  const [price, setPrice] = useState(initialValues?.price || '');
  const [errors, setErrors] = useState({});
  const { isSeller } = useAuth();

  const validate = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = 'Bottle type name is required';
    }
    
    if (!price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isSeller) {
      toast.error('Only sellers can modify bottle types');
      return;
    }
    
    if (!validate()) return;
    
    const formattedPrice = parseFloat(parseFloat(price).toFixed(2));
    
    onSubmit({
      name: name.trim(),
      price: formattedPrice
    });
    
    if (!initialValues) {
      // Reset form if adding new type
      setName('');
      setPrice('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Bottle Type Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`input-field ${errors.name ? 'border-red-500' : ''}`}
          placeholder="e.g. 18.9L Dispenser Bottle"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>
      
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
          Price (K)
        </label>
        <input
          id="price"
          type="number"
          min="0"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className={`input-field box-border ${errors.price ? 'border-red-500' : ''}`}
          placeholder="0.00"
        />
        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
      </div>
      
      <div className="flex justify-end space-x-3 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary cursor-pointer"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="btn-primary cursor-pointer"
        >
          {initialValues ? 'Update' : 'Add'} Bottle Type
        </button>
      </div>
    </form>
  );
}