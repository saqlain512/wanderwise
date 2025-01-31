import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location_id: {
    type: String,
    required: true
  },
  address: {
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    address_string: {
      type: String
    }
  },
  description: {
    type: String
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  recommended_activities: {
    type: [String],
  }
});


export default mongoose.model('itineraryModel', itinerarySchema);

