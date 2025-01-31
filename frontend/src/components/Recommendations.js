// SearchBar.js
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import "../styles/Recommendations.css";
import { FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const Recommendations = () => {
  const [recommendations, setRecommendations] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate()

    const url = `/api/v1/recommendations/get-recommendations`;

    useEffect(() => {
        // Make axios GET request to fetch recommendations
        axios.get(url)
          .then(response => {
            if(response.status===200){
             setRecommendations(response.data.data);
             setLoading(false);
            }
          })
          .catch(error => {
            console.error('Error fetching recommendations:', error);
          });
      }, []); 

      const handleClick = (destination) => {
        // Redirect to location details page
        console.log(destination)
        navigate(`/plan-trip/${destination}`);
        
      };

  return (
    <div>
    {loading ? (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <FaSpinner className="spinner" size={40} />
        <p>Loading...</p>
      </div>
    ) : (
      <div class="projcard-container">
        {recommendations && recommendations.map((item,index)=>(
   
            <div key={index} onClick={() => handleClick(item.destination)} class="projcard projcard-blue">
              <div class="projcard-innerbox">
                <img class="projcard-img" src="https://media-cdn.tripadvisor.com/media/photo-i/15/33/f5/ce/auckland.jpg" />
                <div class="projcard-textbox">
                  <div class="projcard-title">{item.destination}</div>
                  <div class="projcard-subtitle">${item.budget}</div>
                  <div class="projcard-bar"></div>
                  <div class="projcard-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                  <div class="projcard-tagbox">
                    <span class="projcard-tag">{item.Accommodation}</span>
                  </div>
                  
                </div>
              </div>
            </div>
        ))}
      </div>
    )}
  </div>

  );
};

export default Recommendations;
