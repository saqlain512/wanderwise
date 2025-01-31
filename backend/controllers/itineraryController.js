import axios from 'axios';
import itineraryModel from '../models/itineraryModel.js';


  const itineraryController = {

    generateItinerary: async (req, res) => {
      try {
        const baseUrl=process.env.ITINERARY_SERVICE_API
        const url=`${baseUrl}/generate-itinerary`
        //get itinerary
        const ItineraryResponse=await axios.post(url,{
          destination:req.body.destination,
          num_days:req.body.num_days
        })
    
        const api_key=process.env.TRIPADVISOR_API_KEY
          // Get location ID
          const locationIdResponse = await axios.get('https://api.content.tripadvisor.com/api/v1/location/search', {
              params: {
                  key: api_key,
                  searchQuery: req.body.destination,
                  language: 'en'
              },
              headers: {
                  accept: 'application/json'
              }
          });
    
          const locationId = locationIdResponse.data.data[0].location_id;
    
          // Get location details
          const locationDetailsResponse = await axios.get(`https://api.content.tripadvisor.com/api/v1/location/${locationId}/details`, {
              params: {
                  language: 'en',
                  currency: 'USD',
                  key: api_key
              },
              headers: {
                  accept: 'application/json'
              }
          });
    
          const data= {
            name:locationIdResponse.data.data[0].name,
            location_id:locationIdResponse.data.data[0].location_id,
            address:locationIdResponse.data.data[0].address_obj,
            description:locationDetailsResponse.data.description,
            latitude:locationDetailsResponse.data.latitude,
            longitude:locationDetailsResponse.data.longitude,
            recommended_activities:ItineraryResponse.data.Itinerary.recommended_activities
          }
    
    
          res.status(200).send({
            success: true,
            message: "successull",
            data
          });
      } catch (error) {
        // Handle errors
        console.error('Error generating itinerary:', error);
        res.status(500).json({ error: 'An error occurred while generating itinerary' });
      }
    },

    getAllItineraries: async (req, res) => {
      try {
        const itineraries = await itineraryModel.find();
        res.status(200).json({ success: true, data: itineraries });
      } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch itineraries', error: error.message });
      }
    },
  
    getItineraryById: async (req, res) => {
      try {
        const itinerary = await itineraryModel.findById(req.params.id);
        if (!itinerary) {
          return res.status(404).json({ success: false, message: 'Itinerary not found' });
        }
        res.status(200).json({ success: true, data: itinerary });
      } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch itinerary', error: error.message });
      }
    },
  
    //create 
    createItinerary: async (req, res) => {
      try {
        const itinerary = new itineraryModel(req.body);
        await itinerary.save();
        res.status(201).json({ success: true, message: 'Itinerary created successfully', data: itinerary });
      } catch (error) {
        res.status(400).json({ success: false, message: 'Failed to create itinerary', error: error.message });
      }
    },
  
    updateItinerary: async (req, res) => {
      try {
        const itinerary = await itineraryModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!itinerary) {
          return res.status(404).json({ success: false, message: 'Itinerary not found' });
        }
        res.status(200).json({ success: true, message: 'Itinerary updated successfully', data: itinerary });
      } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update itinerary', error: error.message });
      }
    },
  
    deleteItinerary: async (req, res) => {
      try {
        const itinerary = await itineraryModel.findByIdAndDelete(req.params.id);
        if (!itinerary) {
          return res.status(404).json({ success: false, message: 'Itinerary not found' });
        }
        res.status(200).json({ success: true, message: 'Itinerary deleted successfully' });
      } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete itinerary', error: error.message });
      }
    },
  };
  
  export default itineraryController