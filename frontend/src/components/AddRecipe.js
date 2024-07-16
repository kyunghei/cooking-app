import React, { useState } from 'react';
import axios from 'axios';
import { getAuthHeader, refreshToken } from '../services/auth';


function AddRecipe() {
    const [formData, setFormData] = useState({
        title: '',
        ingredients: '',
        instruction: '',
        prep_time: '',
        cook_time: '',
        serving_size: '',
        cuisines: []
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const { title, ingredients, instruction, prep_time, cook_time, serving_size, cuisines } = formData;

    function onChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    async function onSubmit(e) {
        e.preventDefault();
        const token = localStorage.getItem('access');
        try {
            const response = await axios.post('http://127.0.0.1:8000/recipes/', formData, {
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
                    let response = await axios.post('http://127.0.0.1:8000/api/recipes/', formData, { headers });
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
        <div>
            <h2>Add Recipe</h2>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={onChange}
                    placeholder="Title"
                    required
                />
                <input
                    type="number"
                    name="serving_size"
                    value={serving_size}
                    onChange={onChange}
                    placeholder="Serving Size"
                    required
                />
                <input
                    type="number"
                    name="prep_time"
                    value={prep_time}
                    onChange={onChange}
                    placeholder="Preparation Time"
                    required
                />
                <input
                    type="number"
                    name="cook_time"
                    value={cook_time}
                    onChange={onChange}
                    placeholder="Cooking Time"
                    required
                />
                <textarea
                    type="text"
                    name="ingredients"
                    value={ingredients}
                    onChange={onChange}
                    placeholder="Ingredients (one per line)"
                    required
                />
                <textarea
                    name="instruction"
                    value={instruction}
                    onChange={onChange}
                    placeholder="Instruction"
                    required
                />

                <button type="submit">Add Recipe</button>
            </form>
        </div>
    )

}

export default AddRecipe;