import React, { useState, useEffect } from 'react';
import { STATES_WITH_LGAS } from '../constants';

const LocationInputForm = ({ onSubmit, coordinates }) => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedLGA, setSelectedLGA] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);  // Added state for isLoading

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);  // Start loading

    try {
      if (!selectedState || !selectedLGA) {
        setError('Please select both state and LGA');
        setIsLoading(false);  // Stop loading if there's an error
        return;
      }

      const address = `${selectedLGA}, ${selectedState}, Nigeria`;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
      );

      const data = await response.json();

      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        const locationData = {
          state: selectedState,
          lga: selectedLGA,
          lat,
          lng,
        };

        await onSubmit(locationData);
        setError('');
      } else {
        setError('Location not found');
      }
    } catch (err) {
      setError('Error processing location');
    }

    setIsLoading(false);  // Stop loading after completion
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-group">
        <label htmlFor="state" className="block text-sm font-medium">
          Select State
        </label>
        <select
          id="state"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={selectedState}
          onChange={(e) => {
            setSelectedState(e.target.value);
            setSelectedLGA('');
          }}
        >
          <option value="">-- Select State --</option>
          {Object.keys(STATES_WITH_LGAS).map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>

      {selectedState && (
        <div className="form-group">
          <label htmlFor="lga" className="block text-sm font-medium">
            Select Local Government Area (LGA)
          </label>
          <select
            id="lga"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={selectedLGA}
            onChange={(e) => setSelectedLGA(e.target.value)}
          >
            <option value="">-- Select LGA --</option>
            {STATES_WITH_LGAS[selectedState].map((lga) => (
              <option key={lga} value={lga}>{lga}</option>
            ))}
          </select>
        </div>
      )}

      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
        disabled={isLoading}  // Disable button when loading
      >
        {isLoading ? 'Searching...' : 'Submit Location'}
      </button>
    </form>
  );
};

export default LocationInputForm;
