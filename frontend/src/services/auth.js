import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/';
// const API_URL = 'http://127.0.0.1:8000/';

async function login(username, password) {
    try {
        const response = await axios.post(`${API_URL}api/token/`, {
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
    if (!refresh) {
        throw new Error('No refresh token available');
    }
    try {
        const response = await axios.post(`${API_URL}api/token/refresh/`, {
            refresh
        });
        localStorage.setItem('access', response.data.access);
        if (response.data.refresh) {
            localStorage.setItem('refresh', response.data.refresh);
        }
        return response.data;
    } catch (error) {
        console.error('Token refresh error:', error.response ? error.response.data : error);
        throw error;
    }
};

function getAuthHeader() {
    const token = localStorage.getItem('access');
    console.log("Token in localstorage:", token);
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export { getAuthHeader, refreshToken, login };