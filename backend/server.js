import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import itineraryRoutes from './routes/itineraryRoutes.js';
import recommendationRoutes from './routes/recommendationRoutes.js';
import cors from "cors";
const app=express();
dotenv.config();
connectDB();

//middleware
app.use(cors())
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev')); // Log HTTP requests
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/itinerary',itineraryRoutes)
app.use('/api/v1/recommendations',recommendationRoutes)


app.get('/',(req,res)=>{
    res.send({
        message: "WanderWise backend"
    })
})

const PORT=process.env.PORT|| 8080

app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT} in ${process.env.DEV_MODE} mode`.bgCyan.bgWhite);
});
