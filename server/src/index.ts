import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db'; // Assuming this function connects to your database
import loginRoute from './routes/loginRoute';
import courseRouter from './routes/courseRouter'; // Import the course router

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

(async () => {
    try {
        const db = await connectDB();
        console.log('Connected to SQLite database');

        // Make db available throughout the app
        app.locals.db = db;

        // Middleware
        app.use(cors());
        app.use(express.json());
        app.use('/api/login', loginRoute); // Set up login route
        app.use("/api/courses", courseRouter); // Set up course route

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to the database', error);
    }
})();
