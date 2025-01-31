import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/auth';
import { useNavigate, useParams } from 'react-router-dom';
import GetItineraryForm from '../../components/user/GetItineraryForm';
import Itinerary from '../../components/user/Itinerary';
import Map from '../../components/Map';

export default function PlanTrip() {
    const [auth, setAuth] = useAuth();
    const { destination } = useParams(); 
    const [formData, setFormData] = useState({
      place: destination,
      days:0,
      partner:'',
    });
    const [itinerary, setItinerary] = useState(null);
  return (
    <div>
      <Layout title={"plan trip-user"}>
        <h1 style={{'margin':'20px'}}>PlanTrip</h1>
         <GetItineraryForm 
         formData={formData} 
         setFormData={setFormData} 
         itinerary={itinerary}
         setItinerary={setItinerary}
         />
          {itinerary && (
        <div>
          <Itinerary data={itinerary}/>
          <Map itinerary={itinerary}/>
          {JSON.stringify(itinerary)}
        </div>
      )}
    </Layout>
    </div>
  )
}
