import { useNavigate } from 'react-router-dom';
import React from 'react';
import '../App.css'


function Navbar() {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem('access') !== null;

    function handleLogout() {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        navigate('/login');
    };

    function handleAddRecipe() {
        if (isAuthenticated) {
            navigate('/add-recipe');
        } else {
            navigate('/login');
        }
    };


    return (
        <nav className="navbar navbar-expand-lg  nav-custom">
            <div className="container-fluid" >
                <a className="navbar-brand" href="/">
                    <img src="https://eggcellent-backend-cb142e407950.herokuapp.com/static/logo.jpg" alt="Logo" width="150px" className="d-inline-block align-text-top"></img>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div><h1>egg-cellent</h1></div>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="btn btn-sm btn-outline-secondary" type="button" href='/'>Home</a>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-sm btn-outline-secondary" type="button" onClick={handleAddRecipe}>Add Recipe</button>
                        </li>
                        {isAuthenticated ? (
                            <li className="nav-item dropdown">
                                <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Account
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="/my-recipes">My Recipes</a></li>
                                    <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                                </ul>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <button onClick={() => navigate('/login')} className="btn btn-sm btn-outline-secondary">Login</button>
                                </li>
                                <li className="nav-item">
                                    <button onClick={() => navigate('/register')} className="btn btn-sm btn-outline-secondary">Register</button>
                                </li>
                            </>

                        )}

                    </ul>
                </div>

            </div>
            <img src="https://eggcellent-backend-cb142e407950.herokuapp.com/static/divider.jpg" alt='divider' height='50px' width='70%'></img>
        </nav >
    )
}

export default Navbar;