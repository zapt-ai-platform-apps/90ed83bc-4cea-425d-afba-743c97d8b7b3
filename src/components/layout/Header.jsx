import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaWater, FaBars, FaTimes, FaCog, FaUser, FaSignInAlt, FaUserPlus, FaBell } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import { useNotifications } from '@/context/NotificationContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser } = useAuth();
  const { unreadCount } = useNotifications();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 text-cyan-600">
            <FaWater className="text-2xl" />
            <span className="font-bold text-xl">Water Delivery</span>
          </Link>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="font-medium text-gray-700 hover:text-cyan-600 transition-colors">
              Home
            </Link>
            
            {currentUser ? (
              <>
                <Link to="/settings" className="font-medium text-gray-700 hover:text-cyan-600 transition-colors flex items-center">
                  <FaCog className="mr-1" />
                  Settings
                </Link>
                
                {currentUser.role === 'admin' && (
                  <Link to="/admin" className="font-medium text-gray-700 hover:text-cyan-600 transition-colors">
                    Admin Dashboard
                  </Link>
                )}
                
                <div className="flex items-center space-x-3 pl-4 ml-4 border-l border-gray-200">
                  <Link to="/settings?tab=notifications" className="relative">
                    <FaBell className="text-gray-700 hover:text-cyan-600 transition-colors" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </Link>
                  
                  <span className="flex items-center">
                    <FaUser className="text-gray-700 mr-1" />
                    <span className="text-sm font-medium">
                      {currentUser.name || currentUser.username}
                    </span>
                  </span>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="font-medium text-gray-700 hover:text-cyan-600 transition-colors flex items-center">
                  <FaSignInAlt className="mr-1" />
                  Sign In
                </Link>
                <Link to="/register" className="btn-primary flex items-center">
                  <FaUserPlus className="mr-1" />
                  Register
                </Link>
              </>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 focus:outline-none cursor-pointer"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <Link 
              to="/" 
              className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={toggleMenu}
            >
              Home
            </Link>
            
            {currentUser ? (
              <>
                <Link 
                  to="/settings" 
                  className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={toggleMenu}
                >
                  <div className="flex items-center">
                    <FaCog className="mr-2" />
                    Settings
                  </div>
                </Link>
                
                {currentUser.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={toggleMenu}
                  >
                    <div className="flex items-center">
                      <FaCog className="mr-2" />
                      Admin Dashboard
                    </div>
                  </Link>
                )}
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Link 
                    to="/settings?tab=notifications" 
                    className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={toggleMenu}
                  >
                    <div className="flex items-center">
                      <FaBell className="mr-2" />
                      Notifications
                      {unreadCount > 0 && (
                        <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                          {unreadCount}
                        </span>
                      )}
                    </div>
                  </Link>
                  
                  <div className="py-2 px-4 text-gray-700">
                    <div className="flex items-center">
                      <FaUser className="mr-2" />
                      <span className="font-medium">
                        {currentUser.name || currentUser.username}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={toggleMenu}
                >
                  <div className="flex items-center">
                    <FaSignInAlt className="mr-2" />
                    Sign In
                  </div>
                </Link>
                
                <Link 
                  to="/register" 
                  className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md mt-2"
                  onClick={toggleMenu}
                >
                  <div className="flex items-center">
                    <FaUserPlus className="mr-2" />
                    Register
                  </div>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}