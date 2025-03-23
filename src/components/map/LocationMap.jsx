import React, { useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { FaSearch } from 'react-icons/fa';
import * as Sentry from '@sentry/browser';

export default function LocationMap({ 
  isLoaded, 
  marker, 
  center, 
  onMapClick, 
  searchLocation,
  error
}) {
  const [searchInput, setSearchInput] = useState('');
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      try {
        searchLocation(searchInput);
      } catch (error) {
        console.error('Search error:', error);
        Sentry.captureException(error);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for a location..."
            className="input-field flex-grow"
          />
          <button 
            type="submit" 
            className="ml-2 bg-cyan-600 text-white p-2 rounded-md hover:bg-cyan-700 cursor-pointer"
          >
            <FaSearch />
          </button>
        </form>
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </div>

      {isLoaded ? (
        <div className="map-container">
          <GoogleMap
            mapContainerClassName="map-container"
            center={center}
            zoom={14}
            onClick={onMapClick}
            options={{
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
          >
            {marker && <Marker position={marker} />}
          </GoogleMap>
        </div>
      ) : (
        <div className="map-container flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-t-cyan-600 border-gray-200 rounded-full animate-spin mx-auto mb-4"></div>
            <p>Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
}