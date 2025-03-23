import { useState, useCallback, useEffect } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import * as Sentry from '@sentry/browser';

const libraries = ['places'];

export default function useGoogleMaps() {
  const [marker, setMarker] = useState(null);
  const [center, setCenter] = useState({ lat: -15.4167, lng: 28.2833 }); // Lusaka, Zambia
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    if (loadError) {
      console.error('Error loading Google Maps:', loadError);
      Sentry.captureException(loadError);
      setError('Failed to load Google Maps. Please try again later.');
    }
  }, [loadError]);

  const onMapClick = useCallback((event) => {
    const latLng = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    
    setMarker(latLng);
    getAddressFromCoordinates(latLng);
  }, []);

  const getAddressFromCoordinates = useCallback((latLng) => {
    if (!isLoaded) return;
    
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === 'OK' && results[0]) {
        setAddress(results[0].formatted_address);
      } else {
        console.error('Geocoder failed:', status);
        setAddress('');
        setError('Could not fetch address for this location.');
      }
    });
  }, [isLoaded]);

  const searchLocation = useCallback((query) => {
    if (!isLoaded) return;
    
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: query }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const latLng = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        };
        
        setMarker(latLng);
        setCenter(latLng);
        setAddress(results[0].formatted_address);
      } else {
        console.error('Geocoder failed:', status);
        setError('Could not find this location. Please try a different search.');
      }
    });
  }, [isLoaded]);

  return {
    isLoaded,
    loadError,
    marker,
    center,
    address,
    error,
    onMapClick,
    searchLocation,
    setMarker,
    setCenter,
    setAddress,
  };
}