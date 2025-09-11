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
  credentials: true
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





// You've set up your server.js file correctly, and logically, it looks like it should work. dotenv.config() is right at the top, so what's going on?

// This is a very common and subtle issue that happens specifically when using ES Modules (import/export syntax) in Node.js.

// The Root Cause: Module Load Order
// Here’s the sequence of events happening when you start your server:

// Node.js begins to execute server.js.

// It sees all the import statements at the top. Before running any other code, Node.js first loads and parses all imported modules.

// It finds import resourceRoutes from './routes/resourceRoutes.js';.

// It then loads resourceRoutes.js, which in turn imports your controller.

// The controller then imports uploadOnCloudinary from your utils/cloudinary.js file.

// Here's the key moment: As soon as cloudinary.js is imported, the code at the top level of that file runs immediately. This includes the cloudinary.config({...}) line.

// The problem is, at this exact moment, the dotenv.config() line in your server.js has not run yet! It's still waiting for all the imports to finish loading.

// So, Cloudinary is being configured with undefined values before dotenv ever gets a chance to load your .env file.

// The Solution: Pre-loading dotenv
// You must ensure dotenv runs before any other file is imported. The easiest and cleanest way to do this is to run it as a separate, initial import.

// 1. Create a New Config File

// Create a new file at the root of your server directory named dotenv-config.js







// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import connectDB from './config/db.js';

// // Load environment variables
// dotenv.config();

// const app = express();

// connectDB();

// // Middleware
// // app.use(cors()); // Enable Cross-Origin Resource Sharing
// app.use(cors({
//     origin: process.env.CORS_ORIGIN || 'http://localhost:3000', //  frontend URL
//     credentials: true
// }));

// app.use(express.json()); // To accept JSON data in the request body
// app.use(cookieParser());

// // Define a simple root route for testing
// app.get('/', (req, res) => {
//   res.send('Mental Health Support System API is running...');
// });

// // API Routes
// import authRoutes from './routes/authRoutes.js';
// import appointmentRoutes from './routes/appointmentRoutes.js';
// import resourceRoutes from './routes/resourceRoutes.js';
// // import forumRoutes from './routes/forumRoutes.js';
// // import analyticsRoutes from './routes/analyticsRoutes.js';

// app.use('/api/auth', authRoutes);
// app.use('/api/appointments', appointmentRoutes);
// app.use('/api/resources', resourceRoutes);
// // app.use('/api/forum', forumRoutes);
// // app.use('/api/analytics', analyticsRoutes);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
