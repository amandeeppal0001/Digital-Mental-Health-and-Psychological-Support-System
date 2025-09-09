import axios from 'axios';

// 1. Define the base URL for your backend API.
// It should point to your server, not including the /api part.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// 2. Create a reusable axios instance with your base configuration.
export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true, // This is important for handling cookies.
});

// 3. Use an interceptor to automatically attach the auth token to every request.
// This is much cleaner than adding the header to every function call manually.
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            // This header must match what your backend's auth middleware expects.
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 4. Define your API functions using the configured 'api' instance.
/**
 * Fetches dashboard statistics from the backend.
 * The final request URL will be: http://localhost:5000/api/analytics/dashboard
 */
export const getDashboardStats = () => {
    return api.get('/api/analytics/dashboard');
};

// You can add other API calls here in the future
// For example:
// export const getForumPosts = () => api.get('/api/forum/posts');





// import axios from 'axios';

// // const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// // const api = axios.create({
// //     baseURL: API_URL,
// //     withCredentials: true,
// // });

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api' || 'http://localhost:5173';

// // Setup axios instance
//  export const api = axios.create({
//     baseURL: API_URL,
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     withCredentials: true // Important for sending cookies
// });

// // Interceptor to attach token
// // api.interceptors.request.use((config) => {
// //     const token = localStorage.getItem('authToken');
// //     if (token) {
// //         config.headers.Authorization = `Bearer ${token}`;
// //     }
// //     return config;
// // });


// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem('authToken'); // make sure key matches Login.jsx
//     if (token) {
//         config.headers['Authorization'] = `Bearer ${token}`; // must match middleware expectation
//     }
//     return config;
// });


// // export const getDashboardStats = () => {
// //     return api.get('/dashboard');
// // };


// // export const getDashboardStats = () => {
// //     return api.get('/api/analytics/dashboard');
// // };


// // import axios from 'axios';

// export const getDashboardStats = () => {
//     const token = localStorage.getItem('authToken'); // or use your auth context/provider
//     return axios.get('/analytics/dashboard', {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//          });
// };