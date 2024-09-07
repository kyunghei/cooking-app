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
        return <div>Loading...</div>;
    }
    const defaultImage = `${process.env.PUBLIC_URL}/logo.jpg`;

    return (
        <div className='recipe-detail-container'>
            <div className='recipe-intro'>
                <h1>{recipe.title}</h1>
                <img src={recipe.image || defaultImage} alt={recipe.title} width="200px"></img>
                <h2>by: {recipe.author.username}</h2>
                <p>Serving size: {recipe.serving_size}</p>
                <p>Preparation time: {recipe.prep_time} minutes</p>
                <p>Cooking time: {recipe.cook_time} minutes</p>
            </div>
            <div className='recipe-body'>
                <h4>Ingredients</h4><p> {recipe.ingredients.split('\n').map((line, index) => (
                    <li className='ingredient-item' key={index}>{line}</li>
                ))}</p>
                <h4>Instructions </h4><p> {recipe.instruction.split('\n').map((line, index) => (
                    <li className='instruction-item' key={index}>{line}</li>
                ))}</p>
            </div>

        </div>
    )
}

export default RecipeDetail;