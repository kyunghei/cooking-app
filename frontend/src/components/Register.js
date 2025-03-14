import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    })
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');


    const { username, email, password } = formData;

    function onChange(e) {
        const { name, value } = e.target;

        // Live validation for username length
        if (name === "username") {
            if (value.length < 3 || value.length > 20) {
                setError("Username must be between 3 and 20 characters.");
            } else {
                setError(""); // Clear error if valid
            }
        }
        setFormData({ ...formData, [name]: value })
    };

    async function onSubmit(e) {
        e.preventDefault();

        // Username validation must be between 3 to 20 char
        if (username.length < 3 || username.length > 20) {
            setError("Username must be between 3 and 20 characters.");
            return;
        }

        try {
            const response = await axios.post(`${API_URL}auth/register/`, formData);
            setMessage('Registration successful!');
            setError('');
        } catch (err) {
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (err.response.status === 400) {
                    setError('Validation error: ' + err.response.data.detail);
                } else if (err.response.status === 500) {
                    setError('Server error: Please try again later.');
                } else {
                    setError('Error: ' + err.response.data.detail);
                }
            } else if (err.request) {
                // The request was made but no response was received
                setError('Network error: Please check your connection.');
            } else {
                // Something happened in setting up the request that triggered an Error
                setError('Error: ' + err.message);
            }
            setMessage('');

        }

    };

    return (
        <div className='register-container'>
            <h2>HI CHEF, THANK YOU FOR JOINING!</h2>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
            <form onSubmit={onSubmit}>
                <input onChange={onChange} value={username} type="text" name="username" placeholder="Username" required>
                </input>
                {error && username.length < 3 && <p style={{ color: 'red' }}>{error}</p>}
                <input onChange={onChange} value={email} type="email" name="email" placeholder="Email" required>
                </input>
                <input onChange={onChange} value={password} type="password" name="password" placeholder="Password" required>
                </input>
                <button type="submit">Register</button>
            </form>
            <div>
                <Link to='/login'>Already have an account?</Link>
            </div>
        </div>


    )
}

export default Register;