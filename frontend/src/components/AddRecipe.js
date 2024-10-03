import React, { useState } from 'react';
import axios from 'axios';
import { getAuthHeader, refreshToken } from '../services/auth';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/';

function AddRecipe() {
    const [formData, setFormData] = useState({
        title: '',
        ingredients: '',
        instruction: '',
        prep_time: '',
        cook_time: '',
        serving_size: '',
        cuisines: [],
        image: null
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const { title, ingredients, instruction, prep_time, cook_time, serving_size, cuisines, image } = formData;

    function onChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    function onImageChange(e) {
        setFormData({ ...formData, image: e.target.files[0] })
    }

    async function onSubmit(e) {
        e.preventDefault();
        const token = localStorage.getItem('access');

        const data = new FormData();
        data.append('title', title);
        data.append('ingredients', ingredients);
        data.append('instruction', instruction);
        data.append('prep_time', prep_time);
        data.append('cook_time', cook_time);
        data.append('serving_size', serving_size);
        data.append('cuisines', cuisines);
        if (image) {
            data.append('image', image);
        }

        try {
            const response = await axios.post(`${API_URL}recipes/`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMessage('Recipe added successfully!');
            setError('');
        } catch (err) {
            if (err.response.status === 401) {
                try {
                    await refreshToken();
                    let headers = getAuthHeader();
                    let response = await axios.post(`${API_URL}api/recipes/`, formData, { headers });
                    setMessage('Recipe added successfully!');
                    setError('');
                } catch (refreshError) {
                    setError('Error adding recipe.');
                    setMessage('');
                    console.error(refreshError);
                }
            }
            setError('Error adding recipe.');
            setMessage('');
        }
    };

    return (
        <div className="add-recipe-container">
            <h2>share a recipe here, chef!</h2>
            <p>We're on the hunt for egg-cellent recipes to add to our already amazing database.</p>
            <p></p>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
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