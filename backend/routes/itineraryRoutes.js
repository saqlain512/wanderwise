import express from "express";
import itineraryController from "../controllers/itineraryController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();



//genrate itinerary
router.post("/get-itinerary", requireSignIn, itineraryController.generateItinerary);
//create 
router.post("/itineraries", requireSignIn, itineraryController.createItinerary);
//get all
router.get("/itineraries", requireSignIn, itineraryController.getAllItineraries);

//get by id
router.get("/itineraries:id", requireSignIn, itineraryController.getItineraryById);

//update by id
router.put("/itineraries:id", requireSignIn, itineraryController.updateItinerary);

//delete by id
router.delete("/itineraries:id", requireSignIn, itineraryController.deleteItinerary);



export default router;