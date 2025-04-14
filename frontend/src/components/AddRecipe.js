import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthHeader, refreshToken } from '../services/auth';
import { getCuisines } from '../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/';
// const API_URL = 'http://127.0.0.1:8000/';

function AddRecipe() {
    const [formData, setFormData] = useState({
        title: '',
        ingredients: '',
        instruction: '',
        prep_time: '',
        cook_time: '',
        serving_size: '',
        cuisine_id: '',
        image: null
    });
    const [cuisineOptions, setCuisineOptions] = useState([]);
    const navigate = useNavigate();

    const { title, ingredients, instruction, prep_time, cook_time, serving_size, cuisine_id, image } = formData;

    // Fetch cuisine options from the API when the component mounts
    useEffect(() => {
        getCuisines()
            .then(data => {
                // Assuming data is an array of cuisine objects e.g.:
                // [{ id: 1, name: 'American'}, { id: 2, name: 'Chinese'}, ...]
                setCuisineOptions(data);
            })
            .catch(err => {
                console.error('Error fetching cuisine types:', err);
                toast.error('Could not load cuisine options');
            });
    }, []);

    function onChange(e) {
        const { name, value } = e.target;
        // If the field is cuisine_id, convert its value to a number, else use the value as is.
        const newValue = name === "cuisine_id" ? Number(value) : value;
        setFormData({ ...formData, [name]: newValue });
        console.log(name, newValue);
    }

    function onImageChange(e) {
        setFormData({ ...formData, image: e.target.files[0] })
    }

    async function onSubmit(e) {
        e.preventDefault();

        // Manual validation: Check required fields before forming the data
        if (!title) {
            toast.error('Recipe Title is required');
            return;
        }
        if (!ingredients) {
            toast.error('Please provide the ingredients');
            return;
        }
        if (!instruction) {
            toast.error('Please provide the instructions');
            return;
        }
        if (!prep_time) {
            toast.error('Please enter prep time');
            return;
        }
        if (!cook_time) {
            toast.error('Please enter cooking time');
            return;
        }
        if (!serving_size) {
            toast.error('Please enter serving size');
            return;
        }
        if (!cuisine_id) {
            toast.error('Please select a cuisine');
            return;
        }

        const token = localStorage.getItem('access');

        const data = new FormData();
        data.append('title', title);
        data.append('ingredients', ingredients);
        data.append('instruction', instruction);
        data.append('prep_time', prep_time);
        data.append('cook_time', cook_time);
        data.append('serving_size', serving_size);
        data.append('cuisine_id', cuisine_id);

        // Check if the user uploaded an image; if not, load the default image.
        if (image) {
            data.append('image', image);
        }

        try {
            const response = await axios.post(`${API_URL}api/recipes/`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success('Recipe added successfully!');
            navigate('/');
        } catch (err) {
            if (err.response.status === 401) {
                try {
                    await refreshToken();
                    let headers = getAuthHeader();
                    let response = await axios.post(`${API_URL}api/recipes/`, formData, { headers });
                    toast.success('Recipe added successfully!');
                } catch (refreshError) {
                    toast.error('Error adding recipe.');
                    console.error(refreshError);
                }
            }
            toast.error('Error adding recipe.');
        }


    };

    return (
        <div className="add-recipe-container">
            <h2>SHARE A RECIPE, CHEF!</h2>
            <p>We're on the hunt for egg-cellent recipes to add to our already amazing database.</p>
            <p></p>
            <form onSubmit={onSubmit} encType="multipart/form-data">
                <div className='input-container'>
                    <label htmlFor="title">Recipe Title <span style={{ color: 'red' }}>*</span></label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor="cuisine">Cuisine <span style={{ color: 'red' }}>*</span></label>
                    <select name="cuisine_id" value={formData.cuisine_id} onChange={onChange} required>
                        <option value="">Select a cuisine</option>
                        {cuisineOptions.map(cuisineOption => (
                            <option key={cuisineOption.id} value={cuisineOption.id}>
                                {cuisineOption.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='input-container'>
                    <label htmlFor="serving_size">Serving Size <span style={{ color: 'red' }}>*</span></label>
                    <input
                        type="number"
                        name="serving_size"
                        value={serving_size}
                        onChange={onChange}
                        required
                    />
                </div>

                <div className='input-container'>
                    <label htmlFor="prep_time">Prep Time (minutes) <span style={{ color: 'red' }}>*</span></label>
                    <input
                        type="number"
                        name="prep_time"
                        value={prep_time}
                        onChange={onChange}
                        placeholder="15 minutes"
                        required
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor="cook_time">Cooking Time (minutes) <span style={{ color: 'red' }}>*</span></label>

                    <input
                        type="number"
                        name="cook_time"
                        value={cook_time}
                        onChange={onChange}
                        placeholder="20 minutes"
                        required
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor="ingredients">Ingredients <span style={{ color: 'red' }}>*</span></label>

                    <textarea
                        type="text"
                        name="ingredients"
                        value={ingredients}
                        onChange={onChange}
                        placeholder="Please put each ingredient and its measurement on its own line.&#10;1 tablespoon of soy sauce.&#10;2 cups of water."
                        required
                    />
                </div>

                <div className='input-container'>
                    <label htmlFor="instruction">Instructions <span style={{ color: 'red' }}>*</span></label>

                    <textarea
                        name="instruction"
                        value={instruction}
                        onChange={onChange}
                        placeholder="Please put each step on its own line.&#10;Mix sugar and flour.&#10;Melt the butter."
                        required
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor="image">Upload a photo of your dish:</label>

                    <input className="btn btn-sm btn-outline-secondary" type="file" name="image" onChange={onImageChange}>
                    </input>
                </div>

                <div className='input-container'>
                    <button type="submit">Add Recipe</button>
                </div>
            </form>
        </div>
    )

}

export default AddRecipe;