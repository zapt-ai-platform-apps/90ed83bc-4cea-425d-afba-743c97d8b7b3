import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaWater, FaBars, FaTimes, FaCog } from 'react-icons/fa';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="font-medium text-gray-700 hover:text-cyan-600 transition-colors">
              Home
            </Link>
            <Link to="/settings" className="font-medium text-gray-700 hover:text-cyan-600 transition-colors">
              Settings
            </Link>
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
          </div>
        )}
      </div>
    </header>
  );
}