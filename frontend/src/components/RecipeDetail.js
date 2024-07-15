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

    return (
        <div>
            <h1>{recipe.title}</h1>
            <h2>by: {recipe.author.username}</h2>
            <p>Preparation time: {recipe.prep_time} minutes</p>
            <p>{recipe.instruction}</p>
        </div>
    )
}

export default RecipeDetail;