import { getRecipes } from '../services/api';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function RecipeList() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        async function fetchRecipes() {
            const data = await getRecipes();
            setRecipes(data);
        };
        fetchRecipes();
    }, []);

    return (
        <div>
            <h1>Recipes</h1>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>
                        <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeList;