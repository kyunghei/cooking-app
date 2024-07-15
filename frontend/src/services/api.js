import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/';

// Get all recipes
export const getRecipes = async () => {
    const response = await axios.get(`${API_URL}recipes/`);
    return response.data;
}

// Get a specific recipe
export const getRecipe = async (id) => {
    const response = await axios.get(`${API_URL}recipes/${id}/`);
    return response.data;
}