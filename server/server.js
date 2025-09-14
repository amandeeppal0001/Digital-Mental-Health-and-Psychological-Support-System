// This MUST be the absolute first line of code that runs
import './dotenv-config.js'; 

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';

// dotenv.config() is no longer needed here

const app = express();

connectDB();


const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization"
}));






// Middleware
// app.use(cors({
//     origin: process.env.CORS_ORIGIN || 'http://localhost:3000' || 'http://localhost:5173',
//     credentials: true
// }));
app.use(express.json());
app.use(cookieParser());

// Define a simple root route for testing
app.get('/', (req, res) => {
  res.send('Mental Health Support System API is running...');
});

// API Routes
import authRoutes from './routes/authRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';
import forumRoutes from './routes/forumRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js'


app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/analytics', analyticsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));












// // This MUST be the absolute first line of code that runs to ensure environment variables are loaded.
// import './dotenv-config.js'; 

// import express from 'express';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import connectDB from './config/db.js';

// // --- Main Application Setup ---
// const app = express();
// connectDB();

// // --- CORS Configuration (The Important Part) ---

// // We create a list of all the frontend URLs that are allowed to make requests to this backend.
// // We pull the production URL from the .env file and always include localhost for development.
// const allowedOrigins = [
//   "http://localhost:5173", // Your local Vite dev server
//   "http://localhost:5174", // Another possible local port
//   process.env.FRONTEND_URL // The URL of your deployed frontend (e.g., on Vercel/Netlify)
// ];

// // Configure the CORS middleware.
// const corsOptions = {
//   // The 'origin' property checks if the incoming request's origin is in our 'allowedOrigins' list.
//   // If it is, CORS headers are sent back, allowing the browser to proceed with the request.
//   origin: allowedOrigins,
  
//   // This is crucial. It tells the server to accept and process cookies sent from the frontend.
//   // The browser will not send cookies in cross-origin requests unless this is set to true on the server.
//   credentials: true
// };

// // Apply the CORS middleware to all incoming requests.
// app.use(cors(corsOptions));

// // --- Standard Middleware ---
// app.use(express.json()); // To parse JSON request bodies
// app.use(cookieParser()); // To parse cookies attached to requests

// // --- API Routes ---
// import authRoutes from './routes/authRoutes.js';
// import appointmentRoutes from './routes/appointmentRoutes.js';
// import resourceRoutes from './routes/resourceRoutes.js';
// import forumRoutes from './routes/forumRoutes.js';
// import analyticsRoutes from './routes/analyticsRoutes.js'

// app.use('/api/auth', authRoutes);
// app.use('/api/appointments', appointmentRoutes);
// app.use('/api/resources', resourceRoutes);
// app.use('/api/forum', forumRoutes);
// app.use('/api/analytics', analyticsRoutes);


// // A simple root route to confirm the server is running.
// app.get('/', (req, res) => {
//   res.send('Mental Health Support System API is running...');
// });

// // --- Server Startup ---
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


