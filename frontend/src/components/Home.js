import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRecipes, getCuisines, getRecipesByCuisine } from '../services/api';
import '../App.css'


function Home() {

    const [recipes, setRecipes] = useState([]);
    const [cuisines, setCuisines] = useState([]);
    const [selectedCuisine, setSelectedCuisine] = useState('');

    useEffect(() => {
        async function fetchRecipes() {
            const data = await getRecipes();
            setRecipes(data);
        };
        fetchRecipes();

        // Fetch all cuisines for filter dropdown
        async function fetchCuisines() {
            const response = await getCuisines();
            setCuisines(response);
        }

        fetchCuisines();
    }, []);

    async function fetchFilteredRecipes(cuisine = '') {
        // Fetch recipes, optionally filtered by cuisine
        const data = getRecipesByCuisine(cuisine);
        console.log('Fetched recipes by cuisine:', data); // Log the response to check

        setRecipes(Array.isArray(data) ? data : []);
    }

    const handleCuisineChange = (e) => {
        setSelectedCuisine(e.target.value);
        fetchFilteredRecipes(e.target.value);
    }

    const defaultImage = `/media/recipe_images/logo.jpg`;

    return (
        <div className="recipe-body">
            <h2>All Recipes</h2>
            <div>
                <label htmlFor="cuisine-filter">Filter by Cuisine: </label>
                <select id="cuisine-filter" value={selectedCuisine} onChange={handleCuisineChange}>
                    <option value="">All Cuisines</option>
                    {cuisines.map((cuisine) => (
                        <option key={cuisine.id} value={cuisine.id}>
                            {cuisine.name}
                        </option>
                    ))}
                </select>
            </div>
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