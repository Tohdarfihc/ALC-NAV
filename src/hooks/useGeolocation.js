import { useState } from 'react';

export const useGeolocation = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [error, setError] = useState('');

  const getCurrentPosition = () => {
    if (!('geolocation' in navigator)) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setError('');
      },
      (error) => {
        setError('Unable to retrieve your location');
      }
    );
  };

  return { location, error, getCurrentPosition };
};

export default useGeolocation;