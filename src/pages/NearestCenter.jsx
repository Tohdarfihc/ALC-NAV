import React, { useState, useEffect } from 'react';
import { useGeolocation } from '../hooks/useGeolocation';
import { locationServices } from '../api/locationServices';
import LocationInputForm from '../components/LocationInputForm';
import MapComponent from '../components/MapComponent';
import CenterList from '../components/CenterList';


const NearestCenter = () => {
  const [centers, setCenters] = useState([]);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { location, error: geoError, getCurrentPosition } = useGeolocation();

  // Handle automatic location-based search when geolocation is successful
  useEffect(() => {
    if (useCurrentLocation && location.lat && location.lng) {
      handleLocationSearch(location);
    }
  }, [location, useCurrentLocation]);

  // Function to handle location search (used by both auto and manual methods)
  const handleLocationSearch = async (coordinates) => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await locationServices.findNearestCenters(coordinates);
      setCenters(response.centers);
      
      // Submit the location data to backend
      await locationServices.submitLocationData({
        lat: coordinates.lat,
        lng: coordinates.lng,
        state: coordinates.state,
        lga: coordinates.lga,
      });
    } catch (err) {
      setError(err.message);
      setCenters([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle location toggle
  const handleLocationToggle = () => {
    setUseCurrentLocation(!useCurrentLocation);
    setError('');
    setCenters([]);
    
    if (!useCurrentLocation) {
      getCurrentPosition();
    }
  };

  // Handle manual location submission
  const handleManualLocationSubmit = async (locationData) => {
    await handleLocationSearch(locationData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-8">
        Find Nearest Training Center
      </h2>

      {/* Location Toggle */}
      <div className="mb-6">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={useCurrentLocation}
            onChange={handleLocationToggle}
            className="form-checkbox"
            disabled={isLoading}
          />
          <span>Use my current location</span>
        </label>
      </div>

      {/* Error Messages */}
      {(error || geoError) && (
        <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
          {error || geoError}
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="mb-4 p-4 bg-blue-50 text-blue-700 rounded-md">
          Searching for nearest centers...
        </div>
      )}

      {/* Manual Location Form */}
      {!useCurrentLocation && (
        <div className="mb-6">
          <LocationInputForm
            onSubmit={handleManualLocationSubmit}
            isLoading={isLoading}
          />
        </div>
      )}

      {/* Results Display */}
      {!isLoading && centers.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <MapComponent 
              location={location} 
              centers={centers} 
            />
          </div>
          <div>
            <CenterList centers={centers} />
          </div>
        </div>
      )}
    </div>
  );
};

export default NearestCenter;