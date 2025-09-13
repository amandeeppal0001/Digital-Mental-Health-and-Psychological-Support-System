import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://digital-mental-health-and-psycholog.vercel.app/api/forum';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

// Interceptor to attach token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export const getAllPosts = () => {
    return api.get('/');
};

export const getPostById = (postId) => {
    return api.get(`/${postId}`);
};

export const addCommentToPost = (postId) => {
    return api.get(`/${postId}/comments`);
};

export const createPost = (postData) => {
    return api.post('/', postData);
};

export const createComment = (postId, commentData) => {
    return api.post(`/${postId}/comments`, commentData);
};
