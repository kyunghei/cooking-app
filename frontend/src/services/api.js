import axios from 'axios';
import { refreshToken, getAuthHeader } from './auth';


const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/';
// const API_URL = 'http://127.0.0.1:8000/';

export const apiClient = axios.create({
    baseURL: `${API_URL}api/`, // Set the base URL for the API
});

// Add a request interceptor to add token before each request
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('access'); // Fetch token from localStorage
    console.log("Interceptor attaching token:", token);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;  // Set token in headers
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

apiClient.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
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
    console.log('API response:', response);
    return response.data;
}

export const getCuisines = async () => {
    const response = await apiClient.get(`cuisines/`);
    return response.data;
}

export const getRecipesByCuisine = async (cuisineId) => {
    try {
        const response = await apiClient.get(`recipes/?cuisine=${cuisineId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching recipes by cuisine:', error);
        return []; // Return an empty array on error
    }

}

// Get recipes user posted
export const getMyRecipes = async () => {

    const response = await apiClient.get('my-recipes/');
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

// add a recipe
export const addRecipe = async (data) => {
    try {
        await apiClient.post('/recipes/', data);
        return { success: true, message: 'Recipe added successfully!' };
    } catch (err) {
        // If error is due to unauthorized access, it will attempt to refresh token
        if (err.response && err.response.status === 401) {
            try {
                await refreshToken();
                const headers = getAuthHeader();
                await apiClient.post('/recipes/', data, { headers });
                return { success: true, message: 'Recipe addedd successfully after refreshing token!' };
            } catch (refreshError) {
                console.error('Error after refreshing token:', refreshError);
                return { success: false, message: 'Error adding recipe after refreshing token.' };
            }
        }
        console.error('Error adding recipe:', err);
        return { success: false, message: 'Error adding recipe.' };
    }
};

