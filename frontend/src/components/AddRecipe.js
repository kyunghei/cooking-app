import React, { useState } from 'react';
import axios from 'axios';

function AddRecipe() {
    const [formData, setFormData] = useState({
        title: '',
        instructions: '',
        prep_time: '',
        ingredients: '',
        serving_size: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const { title, instructions, prep_time, ingredients, serving_size } = formData;

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
                <textarea
                    type="text"
                    name="ingredients"
                    value={ingredients}
                    onChange={onChange}
                    placeholder="Ingredients"
                    required
                />
                <textarea
                    name="instructions"
                    value={instructions}
                    onChange={onChange}
                    placeholder="Instructions"
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
                <button type="submit">Add Recipe</button>
            </form>
        </div>
    )

}

export default AddRecipe;