import React, { useState, useEffect }from 'react'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/auth';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';
import styled from 'styled-components';
import ItineraryCard from '../../components/ItineraryCard';


const Container = styled.div`
  display:flex;
  padding:20px;
  align-items:center;
  justify-content:space-between;
`;


export default function Dashboard() {
    const [auth, setAuth] = useAuth();
    const [itineraries, setItineraries] = useState('');
    const [loading, setLoading] = useState(true);

    const url = `/api/v1/itinerary/itineraries`;

  useEffect(() => {
      // Make axios GET request to fetch recommendations
      axios.get(url)
        .then(response => {
          if(response.status===200){
           setItineraries(response.data.data);
           setLoading(false);
          }
        })
        .catch(error => {
          console.error('Error fetching itineraries:', error);
        });
    });

  return (
    <>
    <Layout title={"dashboard-user"}>
      <h1 style={{'padding':'30px'}}>Dashboard</h1>
      {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
      {/* <pre>{JSON.stringify(itineraries, null, 4)}</pre> */}

      {loading ? (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <FaSpinner className="spinner" size={40} />
        <p>Loading...</p>
      </div>
    ) : (
      <Container>
        {itineraries && itineraries.map((itinerary,index)=>(
           <ItineraryCard
            key={index}
            itinerary={itinerary}
            setItineraries={setItineraries}
          />
          
        ))}
      </Container>
    )}
      
    </Layout>
    </>
  )
}
