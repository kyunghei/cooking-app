import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRecipes, searchRecipes } from '../services/api';
import '../App.css'

function Home() {

    const [recipes, setRecipes] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        async function fetchRecipes() {
            if (query) {
                const data = await searchRecipes(query);
                setRecipes(data);
            } else {
                const data = await getRecipes();
                setRecipes(data);
            }
        };
        fetchRecipes();
    }, [query]);

    const defaultImage = `${process.env.PUBLIC_URL}/logo.jpg`;

    return (
        <div className="recipe-body">
            <div className="search-container">
                <h2>{query ? 'Search Results' : 'All Recipes'}</h2>
                <input className="form-control mr-sm-2" type="text" placeholder="Search recipe..." value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>

            <div className="recipe-container">
                {recipes.map((recipe) => (
                    <div className="card card-custom" key={recipe.id}>
                        <div className="card-body">
                            <img src={recipe.image || defaultImage} className="card-img-top" alt={recipe.title}></img>
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