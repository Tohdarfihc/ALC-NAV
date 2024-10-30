import React from 'react';

const CenterList = ({ centers = [] }) => {
  if (centers.length === 0) {
    return (
      <div className="p-4 bg-gray-50 rounded-md">
        <p className="text-gray-600">No training centers found near your location.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Nearest Training Centers</h3>
      <div className="divide-y divide-gray-200">
        {centers.map((center, index) => (
          <div key={index} className="py-4">
            <h4 className="font-medium text-lg">{center.name}</h4>
            <p className="text-gray-600">{center.address}</p>
            <p className="text-sm text-gray-500">Distance: {center.distance} km</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CenterList;