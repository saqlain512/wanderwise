import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Database connection established: ${conn.connection.host}`.cyan.bold);
    } catch (error) {
        console.error(`Error in DB connection: ${error.message}`.bgRed.white);
        process.exit(1); // Exit with failure
    }
}

export default connectDB;
