import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import RecommendationController from "../controllers/recommendationController.js";

//router object
const router = express.Router();

//get recommendations
router.get("/get-recommendations",  RecommendationController.generateRecommendations);

router.get("/get-location/:locationInput",  RecommendationController.getLocation);
router.get("/get-location-details/:id",  RecommendationController.getLocationDetails);



export default router;