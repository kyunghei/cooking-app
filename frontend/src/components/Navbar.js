import { Link, useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = localStorage.getItem('access') !== null;
    const [dropdownOpen, setDropdownOpen] = useState(false);

    function toggleDropdown() {
        setDropdownOpen(!dropdownOpen);
    };

    // Close dropdown on route change
    useEffect(() => {
        setDropdownOpen(false);
    }, [location]);


    function handleLogout() {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        navigate('/login');
    };


    return (
        <nav>
            <Link to='/' >Home</Link>
            {isAuthenticated ? (
                <div className="dropdown">
                    <button onClick={toggleDropdown}>Account</button>
                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            <Link to="/my-recipes">My Recipes</Link>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
            ) : (
                <>
                    <Link to='/register'>Register</Link>
                    <Link to='/login'>Login</Link>
                </>
            )}
        </nav>
    )
}

export default Navbar;