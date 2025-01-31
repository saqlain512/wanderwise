// ItineraryCard.js
import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import toast from "react-hot-toast";
import ItineraryDetails from './ItineraryDetails';
import { FaShare } from 'react-icons/fa';

const CardContainer = styled.div`
  display: flex;
  width: 300px;
  flex-direction: column;
  border-radius:15px;
  padding: 10px;
  align-items: center;
  text-align: center;
  border:1px solid black;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
`;

const ShareButton = styled(Button)`
  background-color: #17a2b8;
`;

const ItineraryCard = ({ itinerary ,setItineraries}) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/itinerary/itineraries${id}`);
      setItineraries(prevItineraries => prevItineraries.filter(Itinerary => Itinerary._id !== id));
      toast.success('Itinerary deleted successfully');
    } catch (error) {
      if (error.response) {
        toast.error('Failed to delete itinerary');
      } else {
        console.log('Error setting up the request');
      }
    }
  };

  const handleShare = () => {
    const shareText = `Name: ${itinerary.name} Description: ${itinerary.description} Recommended Activities: ${itinerary.recommended_activities}`;
    
    // Display a share dialog or modal for manual sharing
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText)
        .then(() => {
          alert('Itinerary copied to clipboard. You can now share it manually.');
        })
        .catch((error) => {
          console.error('Error copying to clipboard:', error);
          alert('Error copying to clipboard. Please share the itinerary manually.');
        });
    } else {
      alert('Web Share API and clipboard access are not supported. Please share the itinerary manually.');
    }
  };

  return (
    <CardContainer>
      <Button onClick={()=>handleDelete(itinerary._id)}>Delete</Button>
      <ShareButton onClick={handleShare}><FaShare /> Share</ShareButton>
      <div>{itinerary.name}</div>
      <div className="projcard-bar"></div>
      <div>{itinerary.description}</div>
      {showDetails ? (
        <div>
            <ItineraryDetails itinerary={itinerary}/>
          <button onClick={toggleDetails}>Hide Details</button>
        </div>
      ) : (
        <button onClick={toggleDetails}>More Details</button>
      )}
    </CardContainer>
  );
};

export default ItineraryCard;
