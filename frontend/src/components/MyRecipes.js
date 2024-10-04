import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getMyRecipes, deleteRecipe } from '../services/api';
import { Link } from 'react-router-dom';


function MyRecipes() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        async function fetchMyRecipes() {
            const token = localStorage.getItem('access');
            console.log("Token in localstorage:", token);

            try {
                const data = await getMyRecipes(token);
                console.log("Fetched data:", data);
                setRecipes(data);
            } catch (error) {
                console.error('Error fetching user recipes:', error);
            }
        };
        fetchMyRecipes();
    }, []);

    async function handleDelete(id) {
        try {
            await deleteRecipe(id);
            setRecipes(recipes.filter(recipe => recipe.id !== id));
        } catch (error) {
            console.error('Error deleting recipe:', error);

        }
    }
    const defaultImage = `${process.env.PUBLIC_URL}/logo.jpg`;

    return (
        <div className='myrecipe-container'>
            <h2>your delicious recipe contributions</h2>
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
        </div>
    );
};

export default MyRecipes;