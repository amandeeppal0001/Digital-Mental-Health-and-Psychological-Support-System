// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api' || 'http://localhost:5173';

// // Setup axios instance
//  export const api = axios.create({
//     baseURL: API_URL,
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     withCredentials: true // Important for sending cookies
// });

// export const loginUser = (userData) => {
//     return api.post('/auth/login', userData);
// };

// export const registerUser = (userData) => {
//     return api.post('/auth/register', userData);
// };

// export const logoutUser = () => {
//     return api.post('/auth/logout');
// };

// export const checkAuthStatus = () => {
//     return api.get('/status');
// };

// export default api;









// authService.js

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Setup axios instance
export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true // Good to keep for cookie-based auth if you ever switch
});

// ✅ ADD THIS INTERCEPTOR
// This function will run before every request is sent
api.interceptors.request.use(
    (config) => {
        // Get the token from local storage
        const token = localStorage.getItem('authToken');
        
        // If the token exists, add it to the Authorization header
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        
        return config; // Return the modified config
    },
    (error) => {
        // Handle request errors
        return Promise.reject(error);
    }
);


// Your existing functions remain the same
export const loginUser = (userData) => {
    return api.post('/auth/login', userData);
};

export const registerUser = (userData) => {
    return api.post('/auth/register', userData);
};

export const logoutUser = () => {
    return api.post('/auth/logout');
};

export const checkAuthStatus = () => {
    return api.get('/status');
};

export default api;