
import Recommendation from '../models/recommendationModel.js';
import axios from 'axios';

class RecommendationController {
    static async generateRecommendations(req, res) {

        try {
            const baseUrl=process.env.ITINERARY_SERVICE_API
            const url=`${baseUrl}/recommendations`

            axios.get(url)
            .then(response => {
            // Handle successful response
             res.status(200).send({
                success: true,
                message: "successull",
                data:response.data
              });
            })
            .catch(error => {
           // Handle error
             console.error('Error fetching data:', error);
             res.status(201).send({
                success: false,
                message: "error occured",
                error:error
              });
           });

        } catch (error) {
            // Handle errors
            console.error('Error generating recommendations:', error);
            res.status(500).json({ error: error });
        }
    }

    static async getLocation(req, res) {
        const input=req.params.locationInput
        console.log(input)
        try {
            const api_key=process.env.TRIPADVISOR_API_KEY
              // Get location ID
              const locationIdResponse = await axios.get('https://api.content.tripadvisor.com/api/v1/location/search', {
                  params: {
                      key: api_key,
                      searchQuery: input,
                      language: 'en'
                  },
                  headers: {
                      accept: 'application/json'
                  }
              });
        
              res.status(200).send({
                success: true,
                message: "successull",
                data:locationIdResponse.data.data
              });
          } catch (error) {
            // Handle errors
            console.error('Error in location id search', error);
            res.status(500).json({ error: 'An error occurred while generating itinerary' });
          }
    }


    static async getLocationDetails(req, res) {
        try {

              const api_key=process.env.TRIPADVISOR_API_KEY
              const locationId = req.params.id
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
        
              res.status(200).send({
                success: true,
                message: "successull",
                data:locationDetailsResponse.data
              });
          } catch (error) {
            // Handle errors
            console.error('Error generating itinerary:', error);
            res.status(500).json({ error: 'An error occurred while generating itinerary' });
          }
    }
  
}

export default RecommendationController;
