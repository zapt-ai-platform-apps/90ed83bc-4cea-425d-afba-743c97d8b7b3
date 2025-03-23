import React from 'react';
import LocationMap from '@/components/map/LocationMap';
import OrderForm from '@/components/order/OrderForm';
import useGoogleMaps from '@/hooks/useGoogleMaps';
import { FaWater, FaTruck, FaMapMarkerAlt } from 'react-icons/fa';

export default function HomePage() {
  const {
    isLoaded,
    marker,
    center,
    address,
    error,
    onMapClick,
    searchLocation,
  } = useGoogleMaps();

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Premium Water Delivery Service</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We deliver high-quality water dispensers and bottles directly to your doorstep
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="card text-center">
            <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaWater className="text-2xl text-cyan-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality Water</h3>
            <p className="text-gray-600">Premium quality water from trusted sources, purified and safe to drink.</p>
          </div>
          
          <div className="card text-center">
            <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaTruck className="text-2xl text-cyan-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Quick and reliable delivery service to your home or office.</p>
          </div>
          
          <div className="card text-center">
            <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaMapMarkerAlt className="text-2xl text-cyan-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Wide Coverage</h3>
            <p className="text-gray-600">We deliver to various locations across the city for your convenience.</p>
          </div>
        </div>
      </section>
      
      <section className="mb-16">
        <h2 className="section-title text-center mb-8">Order Water Now</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Select Your Location</h3>
            <p className="text-gray-600 mb-4">Click on the map to select your delivery location or search for an address.</p>
            <LocationMap
              isLoaded={isLoaded}
              marker={marker}
              center={center}
              onMapClick={onMapClick}
              searchLocation={searchLocation}
              error={error}
            />
          </div>
          
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Order Details</h3>
            <OrderForm 
              address={address} 
              marker={marker}
            />
          </div>
        </div>
      </section>
      
      <section className="mb-16">
        <div className="bg-cyan-50 rounded-lg p-8 max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Need Assistance?</h2>
          <p className="text-lg mb-6">Contact our customer support team for any questions or concerns</p>
          <div className="inline-block bg-white py-3 px-6 rounded-full shadow-md">
            <a href="tel:+260772789897" className="text-xl font-semibold text-cyan-600 hover:text-cyan-800 transition-colors">
              +260 772 789 897
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}