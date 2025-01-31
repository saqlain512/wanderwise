import React, { useState, useEffect } from 'react'

const Map = ({itinerary}) => {
  const { name,latitude, longitude, recommended_activities } = itinerary;
  useEffect(() => {
    // Initialize Google Maps and add markers for activities
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: parseFloat(latitude), lng: parseFloat(longitude) }, // Center map on Paris coordinates
      zoom: 12,
    });

    recommended_activities.forEach(activity => {
      // Geocode each activity to get its coordinates
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: `${activity}, ${name}` }, (results, status) => {
        if (status === 'OK' && results[0].geometry) {
          const marker = new window.google.maps.Marker({
            position: results[0].geometry.location,
            map,
            title: activity,
          });
        }
      });
    });
  }, [recommended_activities, name, latitude, longitude]);
  return (
    <div id="map" style={{ height: '400px', width: '100%' }}></div>
  )
}

export default Map
