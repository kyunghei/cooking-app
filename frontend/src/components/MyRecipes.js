import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getMyRecipes } from '../services/api';
import { Link } from 'react-router-dom';


function MyRecipes() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        async function fetchMyRecipes() {
            const token = localStorage.getItem('access');
            try {
                const data = await getMyRecipes(token)
                setRecipes(data);
            } catch (error) {
                console.error('Error fetching user recipes:', error);
            }
        };
        fetchMyRecipes();
    }, []);

    return (
        <div>
            <h2>My Recipes</h2>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}><Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link></li>
                ))}
            </ul>
        </div>
    );
};

export default MyRecipes;