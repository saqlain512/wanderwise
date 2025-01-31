// SearchBar.js
import React, { useState } from 'react';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';
import "../styles/SearchBar.css";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const SearchResult = styled.div` 
  margin: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }

`;

const SearchBar = () => {
  const [locationInput, setLocationInput] = useState('');
  const [locations, setLocations] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setLocationInput(event.target.value);
  };

  const handleSearch = () => {
    
    setLoading(true)
    axios.get(`api/v1/recommendations/get-location/${locationInput}`)
      .then(response => {
        setLocations(response.data.data);
        setLoading(false)
      })
      .catch(error => console.error(error));

  };

  const handleLocationClick = (id) => {
    // Redirect to location details page
    navigate(`/location/${id}`);
    
  };


  return (
    <>
      <div className="search_box">
        <h1>Where to?</h1>
      <div className="search">
     <div className= "select_area">
       <i className="fas fa-map-marker-alt map_icon"></i>
       <div className="text">Anywhere</div>
     </div>
     
     <div className="line"></div>
     
     <div className = "text_and-icon">
       <input type="text" 
       className="search_text" 
       id="search_text" 
       placeholder="Search by destination.."
       value={locationInput}
       onChange={handleInputChange}
       />
       <i onClick={handleSearch} className="fas fa-search search_icon"></i>
     </div>
     </div> 
    </div>

    <div>
       {loading ? (
         <div style={{ textAlign: 'center', marginTop: '20px' }}>
           <FaSpinner className="spinner" size={40} />
           <p>Loading...</p>
         </div>
       ) : (
         <div>
          {locations && <>
          <h2>Search Results</h2>
          </>}
          {locations && locations.map((location,index)=>(
          <SearchResult key={index} onClick={() => handleLocationClick(location.location_id)}>
            {location.name}
          </SearchResult>
          
        ))}
         </div>
       )}
     </div>
      
    </>
  );
};

export default SearchBar;
