import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipe } from '../services/api';

function RecipeDetail() {
    const [recipe, setRecipe] = useState(null);
    const { id } = useParams(); // get the id from the route parameters

    useEffect(() => {
        async function fetchRecipe() {
            try {
                const data = await getRecipe(id);
                setRecipe(data);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };
        fetchRecipe();
    }, [id]);

    // Add conditional rendering here
    if (!recipe) {
        return <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
        </div>;
    }
    const defaultImage = `${process.env.PUBLIC_URL}/logo.jpg`;

    return (
        <div className='recipe-detail-container'>
            <div class="recipe-image-container">
                <img src={recipe.image || defaultImage} alt={recipe.title} width="200px" class="recipe-image"></img>
            </div>
            <div className='recipe-details-container'>
                <h1 class="recipe-title">{recipe.title}</h1>
                <p class="contributor">by: {recipe.author.username}</p>
                <p class="cuisine">Cuisine: {recipe.cuisine ? recipe.cuisine.name : 'N/A'}</p>
                <p>Serving size: {recipe.serving_size}</p>
                <p>Preparation time: {recipe.prep_time} minutes</p>
                <p>Cooking time: {recipe.cook_time} minutes</p>

                <div class="ingredients">
                    <h2>Ingredients</h2>
                    <ul> {recipe.ingredients.split('\n').map((line, index) => (
                        <li className='ingredient-item' key={index}>{line}</li>
                    ))}</ul>
                </div>
                <div class="directions">
                    <h2>Instructions </h2>
                    <ol> {recipe.instruction.split('\n').map((line, index) => (
                        <li className='instruction-item' key={index}>{line}</li>
                    ))}</ol>
                </div>
            </div>

        </div>
    )
}

export default RecipeDetail;