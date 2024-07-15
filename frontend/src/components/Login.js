import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const { username, password } = formData;

    function onChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    async function onSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/auth/login/', formData);
            localStorage.setItem('access', response.data.access);
            localStorage.setItem('refresh', response.data.refresh);
            setMessage('Login successful!');
            setError('');
        } catch (err) {
            setError('Login failed.');
            setMessage('');
        }
    }

    return (
        <div>
            <h2>Login!</h2>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={onChange}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;