import axios from 'axios';

const API_URL =  'https://digital-mental-health-and-psycholog.vercel.app/api/resources';
// const API_URL = import.meta.env.VITE_API_URL || 'https://digital-mental-health-and-psycholog.vercel.app/api/resources';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

// Interceptor to attach token to requests
api.interceptors.request.use((config) => {
    // We assume the auth token is stored in localStorage after login
    // In a real app, you might use an auth context or state management library
    const token = localStorage.getItem('authToken'); 
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getAllResources = () => {
    return api.get('/');
};

export const getResourceById = (id) => {
    return api.get(`/${id}`);
};

export const createResource = (resourceData) => {
    return api.post('/', resourceData, {
        headers: {
            'Content-Type': 'multipart/form-data', // Important for file uploads
        },
    });
};

