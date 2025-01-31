import React, { useState, useEffect } from 'react';
import '../../styles/itineraryStyles.css'
import axios from 'axios';
import toast from "react-hot-toast";


const Itinerary = ({ data }) => {
  const { name,location_id,address, description, latitude, longitude, recommended_activities } = data;

  const url = `/api/v1/itinerary/itineraries`;

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(url, {
                name:name,
                location_id:location_id,
                address:address,
                description:description,
                latitude:latitude,
                longitude:longitude,
                recommended_activities:recommended_activities,
            });
            if (res && res.data.success) {
                toast.success(res.data.message);
                console.log(res.data)
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };


  return (
    <div className="itinerary-container">
        <div><h2>Genrated Itinerary</h2><button onClick={handleSave}>save</button></div>
      <div className="city">
        <h3>City:{name}</h3>
        <p>{description}</p>
      </div>
      <div className="recommended-activities">
        <h3>Recommended Activities:</h3>
        <ul>
          {recommended_activities.map((activity, index) => (
            <li key={index}>{activity}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Itinerary;
