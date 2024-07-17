import { Link, useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
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
        <nav class="navbar navbar-expand-lg  nav-custom">
            <div class="container-fluid" >
                <a class="navbar-brand" href="/">
                    <img src={`${process.env.PUBLIC_URL}/logo.jpg`} alt="Logo" width="150px" class="d-inline-block align-text-top"></img>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <div><h1>egg-cellent</h1></div>
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="btn btn-sm btn-outline-secondary" type="button" href='/'>Home</a>
                        </li>
                        <li class="nav-item">
                            <button class="btn btn-sm btn-outline-secondary" type="button" onClick={handleAddRecipe}>Add Recipe</button>
                        </li>
                        {isAuthenticated ? (
                            <li class="nav-item dropdown">
                                <button class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Account
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="/my-recipes">My Recipes</a></li>
                                    <li><button class="dropdown-item" onClick={handleLogout}>Logout</button></li>
                                </ul>
                            </li>
                        ) : (
                            <>
                                <li class="nav-item">
                                    <button class="btn btn-sm btn-outline-secondary">Login</button>
                                </li>
                                <li class="nav-item">
                                    <button class="btn btn-sm btn-outline-secondary">Register</button>
                                </li>
                            </>

                        )}

                    </ul>
                </div>
            </div>
            <img src={`${process.env.PUBLIC_URL}/divider.jpg`} alt='divider' height='50px' width='70%'></img>
        </nav >
    )
}

export default Navbar;