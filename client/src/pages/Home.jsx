import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center bg-white p-12 rounded-lg shadow-lg">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">
        Welcome to the Digital Mental Health Support System
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Your safe space for mental wellness and support. We're here to help you navigate the challenges of student life.
      </p>
      <div className="space-x-4">
        <Link 
          to="/register" 
          className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Get Started
        </Link>
        <Link 
          to="/login" 
          className="bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition duration-300"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;

