// ItineraryDetails.js
import React from 'react';

const ItineraryDetails = ({ itinerary }) => {

  return (
    <div>
      <h3>Recommended Activities:</h3>
      <ul>
        {itinerary.recommended_activities.map((activity, index) => (
          <li key={index}>{activity}</li>
        ))}
      </ul>
    </div>
  );
};

export default ItineraryDetails;
