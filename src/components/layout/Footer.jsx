import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-cyan-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Water Delivery Service</h3>
            <p className="mb-4">
              We provide premium quality water dispensers and bottled water delivered right to your doorstep.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-cyan-200 transition-colors">Home</a></li>
              <li><a href="/settings" className="hover:text-cyan-200 transition-colors">Settings</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <FaPhone className="mr-3" />
                <span>+260772789897</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-3" />
                <span>info@waterdelivery.com</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-3" />
                <span>Lusaka, Zambia</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-cyan-700 mt-8 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Water Delivery Service. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}