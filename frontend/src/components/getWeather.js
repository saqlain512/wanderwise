
import axios from 'axios';

const getWeather = async (location) => {
  const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

// Example usage:
getWeather('Paris')
  .then(data => {
    console.log('Weather data for Paris:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
