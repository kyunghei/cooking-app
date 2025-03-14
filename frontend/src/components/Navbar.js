import { useNavigate, Link } from 'react-router-dom';
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
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand" href="/">
                    <img src={`/static/images/logo.jpg`} alt="Logo" width="150px" className="d-inline-block align-text-top"></img>
                </a>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <div><h1>egg-cellent</h1></div>
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <Link className="btn btn-sm btn-outline-secondary" to="/">Home</Link>
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
                                    <li><Link className="dropdown-item" to="/my-recipes/">My Recipes</Link></li>
                                    <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                                </ul>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <button onClick={() => navigate('/login/')} className="btn btn-sm btn-outline-secondary">Login</button>
                                </li>
                                <li className="nav-item">
                                    <button onClick={() => navigate('/register/')} className="btn btn-sm btn-outline-secondary">Register</button>
                                </li>
                            </>

                        )}

                    </ul>
                </div>

            </div>
            <img src={`/static/images/divider.jpg`} alt='divider' height='50px' width='70%'></img>
        </nav >
    )
}

export default Navbar;