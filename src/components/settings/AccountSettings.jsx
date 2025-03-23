import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { FaKey, FaLock, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function AccountSettings() {
  const { currentUser, updateUserProfile, logout } = useAuth();
  const navigate = useNavigate();
  
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChangePasswordClick = () => {
    setIsChangingPassword(true);
  };
  
  const handleCancel = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setIsChangingPassword(false);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!currentPassword) {
      setError('Please enter your current password');
      return;
    }
    
    if (newPassword.length < 4) {
      setError('New password must be at least 4 characters long');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      // In a real app, you would verify the current password server-side
      if (currentPassword !== currentUser.password) {
        setError('Current password is incorrect');
        setIsSubmitting(false);
        return;
      }
      
      const success = updateUserProfile(currentUser.id, {
        password: newPassword
      });
      
      if (success) {
        toast.success('Password updated successfully');
        handleCancel();
      } else {
        setError('Failed to update password');
      }
      
      setIsSubmitting(false);
    }, 1000);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!currentUser) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-600">Please sign in to view your account settings</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Account Settings</h2>
      
      <div className="bg-white p-4 rounded-md border border-gray-200 space-y-4">
        <div className="flex items-start">
          <div className="w-8 text-gray-500 flex-shrink-0">
            <FaUser />
          </div>
          <div>
            <p className="text-sm text-gray-500">Username</p>
            <p className="font-medium">{currentUser.username}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center">
            <div className="w-8 text-gray-500">
              <FaKey />
            </div>
            <span>Password</span>
          </div>
          
          {!isChangingPassword && (
            <button
              onClick={handleChangePasswordClick}
              className="text-cyan-600 hover:text-cyan-800 text-sm font-medium cursor-pointer"
            >
              Change Password
            </button>
          )}
        </div>
      </div>
      
      {isChangingPassword && (
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <h3 className="text-lg font-medium mb-3">Change Password</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Enter current password"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Enter new password"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Confirm new password"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            
            {error && <p className="text-red-500 text-sm">{error}</p>}
            
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
                    Updating...
                  </div>
                ) : (
                  'Update Password'
                )}
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center text-red-600 hover:text-red-800 cursor-pointer"
        >
          <FaSignOutAlt className="mr-2" /> Sign Out
        </button>
      </div>
    </div>
  );
}