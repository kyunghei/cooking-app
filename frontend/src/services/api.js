import axios from 'axios';
import { refreshToken, getAuthHeader } from './auth';


const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: getAuthHeader()
});

apiClient.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await refreshToken();
                originalRequest.headers = getAuthHeader();
                return apiClient(originalRequest);
            } catch (e) {
                console.error('Token refresh failed:', e);
                // Optionally handle logout here if refresh fails
            }
        }

        return Promise.reject(error);
    }
);

// Get all recipes
export const getRecipes = async () => {
    const response = await apiClient.get('recipes/');
    return response.data;
}

// Get a specific recipe
export const getRecipe = async (id) => {
    const response = await apiClient.get(`recipes/${id}/`);
    return response.data;
}

// Get recipes user posted
export const getMyRecipes = async (token) => {
    const response = await apiClient.get('my-recipes/', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export const deleteRecipe = async (id) => {
    const response = await apiClient.delete(`recipes/${id}/`);
    return response.data;
};

export const updateRecipe = async (id, data) => {
    const response = await apiClient.put(`recipes/${id}/`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
        }
    });
    return response.data;
};