import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    })
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const navigate = useNavigate();


    const { username, email, password } = formData;

    function onChange(e) {
        const { name, value } = e.target;

        // Live validation for username length
        if (name === "username") {
            if (value.length < 3 || value.length > 20) {
                setError("Username must be between 3 and 20 characters.");
            } else {
                setError(''); // Clear error if username is valid
            }

        }

        // Live validation for password length
        if (name === "password") {
            if (value.length < 8 || value.length > 20) {
                setError("Password must be between 8 and 20 characters.");
            } else {
                setError(''); // Clear error if username is valid
            }

        }
        // Update form data state
        setFormData({ ...formData, [name]: value })
    };

    async function onSubmit(e) {
        e.preventDefault();

        // Username validation must be between 3 to 20 char
        if (username.length < 3 || username.length > 20) {
            toast.error("Username must be between 3 and 20 characters.");
            return;
        }

        // Password validation must be between 8 to 20 char
        if (password.length < 8 || password.length > 20) {
            toast.error("Password must be between 8 and 20 characters.");
            return;
        }

        try {
            const response = await axios.post(`${API_URL}auth/register/`, formData);
            if (response.status === 201) {
                // Registration successful
                toast.success('Registration successful! Please log in.');
                navigate('/login');
                return;
            }

        } catch (err) {
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (err.response.status === 400) {
                    toast.error('Validation error: ' + err.response.data.detail);
                    navigate('/register'); // Redirect to register page on validation error
                } else if (err.response.status === 500) {
                    toast.error('Server error: Please try again later.');
                    navigate('/register'); // Redirect to register page on server error
                } else {
                    toast.error('Error: ' + err.response.data.detail);
                    navigate('/register'); // Redirect to register page on other errors
                }
            } else if (err.request) {
                // The request was made but no response was received
                toast.error('Network error: Please check your connection.');
            } else {
                // Something happened in setting up the request that triggered an Error
                toast.error('Error: ' + err.message);
            }

        }

    };

    return (
        <div className='register-container'>
            <h2>HI CHEF, THANK YOU FOR JOINING!</h2>

            {error && <p className="error-message">{error}</p>}
            <form onSubmit={onSubmit}>
                <input onChange={onChange} value={username} type="text" name="username" placeholder="Username" required>
                </input>
                <input onChange={onChange} value={email} type="email" name="email" placeholder="Email" required>
                </input>
                <div className="password-input-container">
                    <input onChange={onChange} value={password} type={showPassword ? "text" : "password"} name="password" placeholder="Password" required style={{ paddingRight: '140px' }} >
                    </input>
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="toggle-password-btn">
                        {showPassword ? "🙈" : "👁"}</button>
                </div>

                <button type="submit">Register</button>
            </form>
            <div>
                <Link to='/login'>Already have an account?</Link>
            </div>
        </div >


    )
}

export default Register;