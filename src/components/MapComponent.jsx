import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { NIGERIA_DEFAULT_COORDS } from '../constants';

const MapComponent = ({ location, centers = [] }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const containerStyle = {
    width: '100%',
    height: '400px',
  };

  const centerLocation = location?.lat ? {
    lat: location.lat,
    lng: location.lng
  } : NIGERIA_DEFAULT_COORDS;

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={centerLocation}
      zoom={10}
    >
      {location?.lat && (
        <Marker
          position={{ lat: location.lat, lng: location.lng }}
          icon={{
            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
          }}
        />
      )}
      
      {centers.map((center, index) => (
        <Marker
          key={index}
          position={{ lat: center.lat, lng: center.lng }}
          title={center.name}
        />
      ))}
    </GoogleMap>
  );
};

export default MapComponent;