// LocationDetailsPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout/Layout';
import styled from 'styled-components';

const Container = styled.div`
  margin: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 10px;
`;

const Link = styled.a`
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const LocationDetailsPage = () => {
  const { id } = useParams(); // Get the location id from URL params
  const [locationDetails, setLocationDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate()

  const handleClick= (destination)=>{
    navigate(`/plan-trip/${destination}`)
  }

  useEffect(() => {
    // Fetch location details when component mounts
    axios.get(`/api/v1/recommendations/get-location-details/${id}`)
      .then(response => {
        setLocationDetails(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching location details:', error);
        setLoading(false);
      });
  }, [id]); // Fetch location details whenever id changes

  return (
    <div>
        <Layout>
      <h1>Location Details</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
        <Container>
      <Title>{locationDetails.name}</Title>
      <Description>{locationDetails.description}</Description>
      <p>
        <strong>Country:</strong> {locationDetails.address_obj.country}
      </p>
      <p>
        <strong>Address:</strong> {locationDetails.address_obj.address_string}
      </p>
      <p>
        <strong>Latitude:</strong> {locationDetails.latitude}, <strong>Longitude:</strong> {locationDetails.longitude}
      </p>
      <p>
        <strong>Web URL:</strong> <Link href={locationDetails.web_url} target="_blank" rel="noopener noreferrer">Visit Website</Link>
      </p>
      <p>
        <strong>Ancestors:</strong> {locationDetails.ancestors.map(ancestor => ancestor.name).join(', ')}
      </p>
      <button onClick={() => handleClick(locationDetails.name)}>Plan you trip to {locationDetails.name}</button>
    </Container>
        </>
      )}
      </Layout>
    </div>
  );
};

export default LocationDetailsPage;
