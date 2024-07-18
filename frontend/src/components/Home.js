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

    const defaultImage = `${process.env.PUBLIC_URL}/logo.jpg`;

    return (
        <div class="recipe-body">
            <h2>All Our Recipes</h2>

            <div class="recipe-container">
                {recipes.map((recipe) => (
                    <div class="card card-custom" key={recipe.id}>
                        <div class="card-body">
                            <img src={recipe.image || defaultImage} class="card-img-top" alt={recipe.title}></img>
                            <div class="card-body">
                                <h5 class="card-title">{recipe.title}</h5>
                                <p class="card-text">{recipe.cusine}</p>
                                <Link to={`/recipes/${recipe.id}`} class="btn btn-primary">View Recipe</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Home;