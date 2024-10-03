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

    const defaultImage = `/media/recipe_images/logo.jpg`;

    return (
        <div className="recipe-body">
            <h2>all recipes</h2>

            <div className="recipe-container">
                {recipes.map((recipe) => (
                    <div className="card card-custom" key={recipe.id}>
                        <div className="card-body">
                            <img
                                src={recipe.image ? recipe.image : defaultImage}
                                className="card-img-top"
                                alt={recipe.title || 'default'}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{recipe.title}</h5>
                                <p className="card-text">{recipe.cusine}</p>
                                <Link to={`/recipes/${recipe.id}`} className="btn btn-sm btn-outline-secondary">View Recipe</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Home;