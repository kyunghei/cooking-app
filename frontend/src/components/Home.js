import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRecipes } from '../services/api';
import '../App.css'

function Home() {
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
            <h2>All <span>eggcellent</span> Recipes</h2>
            <div>
                <ul>
                    {recipes.map((recipe) => (
                        <li key={recipe.id}>
                            <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Home;