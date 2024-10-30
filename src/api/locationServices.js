export const locationServices = {
    async findNearestCenters({ lat, lng }) {
      try {
        const response = await fetch(`/api/find-nearest-center?lat=${lat}&lng=${lng}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch nearest centers');
        }
        
        return await response.json();
      } catch (error) {
        throw new Error('Error finding nearest centers: ' + error.message);
      }
    },
  
    async submitLocationData(locationData) {
      try {
        const response = await fetch('/api/nearest-center', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(locationData),
        });
        
        if (!response.ok) {
          throw new Error('Failed to submit location data');
        }
        
        return await response.json();
      } catch (error) {
        throw new Error('Error submitting location: ' + error.message);
      }
    }
  };

  export default locationServices;