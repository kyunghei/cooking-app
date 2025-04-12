import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRecipes, getCuisines, getRecipesByCuisine } from '../services/api';
import '../App.css'


function Home() {

    const [recipes, setRecipes] = useState([]);
    const [cuisines, setCuisines] = useState([]);
    const [selectedCuisine, setSelectedCuisine] = useState('');

    // Fetch all recipes and cuisines on component mount
    useEffect(() => {
        async function fetchInitialData() {
            const allRecipes = await getRecipes();
            console.log("Fetched recipes:", allRecipes)
            setRecipes(Array.isArray(allRecipes) ? allRecipes : []);

            const allCuisines = await getCuisines();
            setCuisines(allCuisines);
        };
        fetchInitialData();
    }, []);

    // Fetch filtered recipes based on selected cuisine
    useEffect(() => {
        async function fetchFilteredRecipes(cuisine = '') {
            const filteredRecipes = await getRecipesByCuisine(cuisine);
            console.log('Fetched recipes by cuisine:', filteredRecipes); // Log the response to check
            setRecipes(Array.isArray(filteredRecipes) ? filteredRecipes : []);
        }

        if (selectedCuisine) {
            fetchFilteredRecipes(selectedCuisine);
        } else {
            // If no cuisine is selected, fetch all recipes
            async function fetchAllRecipes() {
                const allRecipes = await getRecipes();
                setRecipes(allRecipes);
            }
            fetchAllRecipes();
        }
    }, [selectedCuisine]);

    // Handle when cuisine selection changes
    const handleCuisineChange = (e) => {
        const selectedCuisineId = e.target.value;
        setSelectedCuisine(selectedCuisineId);
    };


    return (
        <div className="recipe-body">
            <h2>All Recipes</h2>
            <div className="dropdown my-4">
                <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {selectedCuisine ? cuisines.find(c => c.id === parseInt(selectedCuisine))?.name : "Filter by Cuisine"}
                </button>
                <ul className="dropdown-menu">
                    <li>
                        <button className="dropdown-item" value="" onClick={() => handleCuisineChange({ target: { value: '' } })}>
                            All Cuisines
                        </button>
                    </li>
                    {cuisines.map((cuisine) => (
                        <li key={cuisine.id}>
                            <button className="dropdown-item" value={cuisine.id} onClick={() => handleCuisineChange({ target: { value: cuisine.id } })}>
                                {cuisine.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="recipe-container">
                {recipes.length > 0 ? (
                    recipes.map((recipe) => (
                        <div className="card card-custom" key={recipe.id}>
                            <div className="card-body">
                                <img
                                    src={recipe.image || '/media/recipe_images/default-image.png'}
                                    className="card-img-top"
                                    alt={recipe.title || 'default'}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{recipe.title}</h5>
                                    <p className="card-text">{recipe.cuisine ? recipe.cuisine.name : 'N/A'}</p>
                                    <Link to={`/recipes/${recipe.id}`} className="btn btn-sm btn-outline-secondary">
                                        View Recipe
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No recipes found.</p>
                )}
            </div>

        </div >
    )
}

export default Home;