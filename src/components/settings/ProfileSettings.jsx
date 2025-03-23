import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { FaUserEdit, FaIdCard, FaPhone, FaEnvelope } from 'react-icons/fa';

export default function ProfileSettings() {
  const { currentUser, updateUserProfile } = useAuth();
  
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleCancel = () => {
    setName(currentUser?.name || '');
    setPhone(currentUser?.phone || '');
    setEmail(currentUser?.email || '');
    setIsEditing(false);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      const success = updateUserProfile(currentUser.id, {
        name,
        phone,
        email
      });
      
      if (success) {
        toast.success('Profile updated successfully');
        setIsEditing(false);
      } else {
        toast.error('Failed to update profile');
      }
      
      setIsSubmitting(false);
    }, 800);
  };

  if (!currentUser) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-600">Please sign in to view your profile settings</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Profile Information</h2>
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="flex items-center text-cyan-600 hover:text-cyan-800 cursor-pointer"
          >
            <FaUserEdit className="mr-1" /> Edit
          </button>
        )}
      </div>
      
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaIdCard className="text-gray-400" />
              </div>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field pl-10"
                placeholder="Your full name"
                disabled={isSubmitting}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaPhone className="text-gray-400" />
              </div>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input-field pl-10"
                placeholder="Your phone number"
                disabled={isSubmitting}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field pl-10"
                placeholder="Your email address"
                disabled={isSubmitting}
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="btn-secondary"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                  Saving...
                </div>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white p-4 rounded-md border border-gray-200 space-y-4">
          <div className="flex items-start">
            <div className="w-8 text-gray-500 flex-shrink-0">
              <FaIdCard />
            </div>
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium">{currentUser.name || 'Not set'}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-8 text-gray-500 flex-shrink-0">
              <FaPhone />
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="font-medium">{currentUser.phone || 'Not set'}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-8 text-gray-500 flex-shrink-0">
              <FaEnvelope />
            </div>
            <div>
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="font-medium">{currentUser.email || 'Not set'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}