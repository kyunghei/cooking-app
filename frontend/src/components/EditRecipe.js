import React, { useState, useEffect } from 'react';
import { getRecipe, updateRecipe } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

function EditRecipe() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        ingredients: '',
        instruction: '',
        prep_time: '',
        cook_time: '',
        serving_size: '',
        image: null,
        imageUrl: ''
    });

    useEffect(() => {
        async function fetchRecipe() {
            const data = await getRecipe(id);
            setFormData({
                title: data.title,
                ingredients: data.ingredients,
                instruction: data.instruction,
                prep_time: data.prep_time,
                cook_time: data.cook_time,
                serving_size: data.serving_size,
                image: null,
                imageUrl: data.image
            });
        }
        fetchRecipe();
    }, [id]);

    function onChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function onImageChange(e) {
        setFormData({ ...formData, image: e.target.files[0] });
    }

    async function onSubmit(e) {
        e.preventDefault();
        const form = new FormData();
        form.append('title', formData.title);
        form.append('ingredients', formData.ingredients);
        form.append('instruction', formData.instruction);
        form.append('prep_time', formData.prep_time);
        form.append('cook_time', formData.cook_time);
        form.append('serving_size', formData.serving_size);
        if (formData.image) {
            form.append('image', formData.image);
        }

        try {
            await updateRecipe(id, form);
            navigate('/my-recipes');
        } catch (error) {
            console.error('Error updating recipe:', error);
        }
    }

    return (
        <div className='edit-recipe-container'>
            <h2>EDIT YOUR  {formData.title.toUpperCase()}  RECIPE</h2>
            <form onSubmit={onSubmit} encType="multipart/form-data">
                <div className='input-container'>
                    <label htmlFor="title">Recipe Title <span style={{ color: 'red' }}>*</span></label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={onChange}
                        required
                    />
                </div>

                <div className='input-container'>
                    <label htmlFor="serving_size">Serving Size <span style={{ color: 'red' }}>*</span></label>
                    <input
                        type="number"
                        name="serving_size"
                        value={formData.serving_size}
                        onChange={onChange}
                        required
                    />
                </div>

                <div className='input-container'>
                    <label htmlFor="prep_time">Prep Time (minutes) <span style={{ color: 'red' }}>*</span></label>
                    <input
                        type="number"
                        name="prep_time"
                        value={formData.prep_time}
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
                        value={formData.cook_time}
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
                        value={formData.ingredients}
                        onChange={onChange}
                        placeholder="Please put each ingredient and its measurement on its own line.&#10;1 tablespoon of soy sauce.&#10;2 cups of water."
                        required
                    />
                </div>

                <div className='input-container'>
                    <label htmlFor="instruction">Instructions <span style={{ color: 'red' }}>*</span></label>

                    <textarea
                        name="instruction"
                        value={formData.instruction}
                        onChange={onChange}
                        placeholder="Please put each step on its own line.&#10;Mix sugar and flour.&#10;Melt the butter."
                        required
                    />
                </div>

                <div className='input-container'>
                    <label htmlFor="image">Upload a photo of your dish:</label>

                    {formData.imageUrl && (
                        <div>
                            <img src={formData.imageUrl} alt="Current dish" style={{ width: '200px', height: 'auto' }} />
                            <p>Current Image</p>
                        </div>
                    )}
                    <input
                        className="btn btn-sm btn-outline-secondary"
                        type="file"
                        name="image"
                        onChange={onImageChange}
                    />
                </div>

                <button type="submit">Update Recipe</button>
            </form>
        </div>
    );
}

export default EditRecipe;
