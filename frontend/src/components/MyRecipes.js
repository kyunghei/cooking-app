import React, { useEffect, useState } from 'react';
import { getMyRecipes, deleteRecipe, apiClient } from '../services/api';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


function MyRecipes() {
    console.log("MyRecipes component rendered");  // Log here

    const [recipes, setRecipes] = useState([]);

    // Use an effect to set the Authorization header from localStorage
    useEffect(() => {
        const token = localStorage.getItem('access'); // ensure the key matches your storage
        if (token) {
            // Set the default header on your Axios instance
            apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;
            console.log("Authorization header set in MyRecipes component:", apiClient.defaults.headers['Authorization']);
        }
    }, []);

    useEffect(() => {
        console.log("MyRecipes component loaded");

        async function fetchMyRecipes() {
            const token = localStorage.getItem('access');
            if (!token) {
                console.error('No token found in local storage');
                return;
            }

            try {
                const data = await getMyRecipes();
                console.log("Fetched data:", data);
                setRecipes(data);
            } catch (error) {
                console.error('Error fetching user recipes:', error);
            }
        };
        fetchMyRecipes();
    }, []);

    async function handleDelete(id) {
        // Show browser confirmation dialog
        const ok = window.confirm(
            'Are you sure you want to permanently delete this recipe?'
        );
        if (!ok) return; // user clicked “Cancel”

        try {
            await deleteRecipe(id);
            setRecipes(recipes.filter(recipe => recipe.id !== id));
            toast.success('Recipe deleted successfully!');
        } catch (error) {
            console.error('Error deleting recipe:', error);

        }
    }
    const defaultImage = `${process.env.PUBLIC_URL}/logo.jpg`;

    return (
        <div className='myrecipe-container'>
            {recipes.length === 0 ? (
                <div className="empty-state">
                    <img src={`/static/images/empty-recipe.png`} width="200px" alt="Empty State" className="empty-state-image" />
                    <p className="empty-state-text">You have not added any recipes yet.</p>
                    <p className="empty-state-text">Click the button below to add your first recipe!</p>
                    <Link to="/add-recipe" className="btn btn-sm btn-outline-secondary">Add Recipe</Link>
                </div>
            ) : (
                <>
                    <h2>YOUR DELICIOUS RECIPE CONTRIBUTIONS</h2>
                    <div className="myrecipe-container">
                        {recipes.map((recipe) => (
                            <div className="card card-custom" key={recipe.id}>
                                <div className="card-body">
                                    <img src={recipe.image || defaultImage} className="card-img-top" alt={recipe.title}></img>
                                    <div className="card-body">
                                        <h5 className="card-title">{recipe.title}</h5>
                                        <p className="card-text">{recipe.cusine}</p>
                                        <Link to={`/recipes/${recipe.id}`} className="btn btn-sm btn-outline-secondary">View Recipe</Link>
                                        <Link to={`/edit-recipe/${recipe.id}`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                                        <button onClick={() => handleDelete(recipe.id)} className="btn btn-sm btn-outline-secondary">Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>

            )}
        </div>

    );
};

export default MyRecipes;