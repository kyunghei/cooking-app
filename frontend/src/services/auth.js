import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

async function login(username, password) {
    try {
        const response = await axios.post(`${API_URL}/token/`, {
            username,
            password
        });
        localStorage.setItem('access', response.data.access);
        localStorage.setItem('refresh', response.data.refresh);
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

async function refreshToken() {
    const refresh = localStorage.getItem('refresh');
    try {
        const response = await axios.post(`${API_URL}/token/refresh/`, {
            refresh
        });
        localStorage.setItem('access', response.data.access);
        return response.data;
    } catch (error) {
        console.error('Token refresh error:', error);
        throw error;
    }
};

function getAuthHeader() {
    const token = localStorage.getItem('access');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export { getAuthHeader, refreshToken, login };