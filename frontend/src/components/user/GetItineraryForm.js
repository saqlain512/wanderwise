import React, { useState } from "react";
import "../../styles/getitineraryFormStyles.css";
import Itinerary from "./Itinerary";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import axios from "axios";



const GetItineraryForm = ({formData, setFormData, itinerary,setItinerary}) => {
    const [step, setStep] = useState(1);
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };
  
    const handleNext = () => {
      setStep((prevStep) => prevStep + 1);
    };
  
    const handlePrevious = () => {
      setStep((prevStep) => prevStep - 1);
    };
  
    const url = `/api/v1/itinerary/get-itinerary`;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(url, {
                destination:formData.place,
                num_days:formData.days
            });
            if (res && res.data.success) {
                toast.success(res.data.message);
                console.log(res.data)
                setItinerary(res.data.data);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };
  
    return (
        <div className="main">
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="input-container">
            <label htmlFor="destination">Where do you want to go?</label>
            <input
              type="text"
              id="place"
              name="place"
              value={formData.place}
              onChange={handleChange}
              className="location-input"
              required
            />
            <div className="options-container">
            <div className="item">
                Paris
            </div>
            <div className="item">
                London
            </div>
            <div className="item">
                Dubai
            </div>
            <div className="item">
                Tokyo
            </div>
            </div>
            <div className="btn-container">
            <button type="button" onClick={handleNext}>
              Next
            </button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="input-container">
            <label htmlFor="days">How long the trip should be?</label>
            <input
              type="number"
              id="days"
              name="days"
              value={formData.days}
              onChange={handleChange}
              className="location-input"
              required
            />
            <div className="btn-container">
            <button type="button" onClick={handlePrevious}>
              Previous
            </button>
            <button type="button" onClick={handleNext}>
              Next
            </button>
            </div>
            
          </div>
        )}
        {step === 3 && (
  <div className="input-container">
    <label htmlFor="partner">Who is coming with you?</label>
    <div className="options-container">
      <div className="item">
        <input
          type="radio"
          id="solo"
          name="partner"
          value="solo"
          checked={formData.partner === 'solo'}
          onChange={handleChange}
        />
        <label htmlFor="solo">Solo</label>
      </div>
      <div className="item">
        <input
          type="radio"
          id="family"
          name="partner"
          value="family"
          checked={formData.partner === 'family'}
          onChange={handleChange}
        />
        <label htmlFor="family">Family</label>
      </div>
      <div className="item">
        <input
          type="radio"
          id="friends"
          name="partner"
          value="friends"
          checked={formData.partner === 'friends'}
          onChange={handleChange}
        />
        <label htmlFor="friends">Friends</label>
      </div>
    </div>
    <div className="btn-container">
      <button type="button" onClick={handlePrevious}>
        Previous
      </button>
      <button type="button" onClick={handleNext}>
        Next
      </button>
    </div>
  </div>
)}
        {step === 4 && (
          <div className="input-container">
            <label htmlFor="interests">How do you want to spend your time?</label>
            <input
              type="text"
              id="interests"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              className="location-input"
              required
            />
            <div className="btn-container">
            <button type="button" onClick={handlePrevious}>
              Previous
            </button>
            <button type="submit">Generate</button>
            </div>
            
          </div>
        )}
      </form>
      </div>
    );
}

export default GetItineraryForm
