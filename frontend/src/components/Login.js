import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/';
// const API_URL = 'http://127.0.0.1:8000/';

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State for password visibility


    const { username, password } = formData;

    function onChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    async function onSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}api/auth/login/`, formData);
            localStorage.setItem('access', response.data.access);
            localStorage.setItem('refresh', response.data.refresh);
            toast.success('Login successfu!');
            setLoading(false);
            navigate('/');
        } catch (err) {
            toast.error('Login failed.');
            setLoading(false);
        }
    }

    return (
        <div className="login-container">
            <h2>WELCOME BACK CHEF!</h2>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={onChange}
                    placeholder="Username"
                    required
                />
                <div className="password-input-container">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={password}
                        onChange={onChange}
                        placeholder="Password"
                        required
                        style={{ paddingRight: '140px' }}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="toggle-password-btn">
                        {showPassword ? "🙈" : "👁"}</button>
                </div>

                {loading ? (
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                    <button type="submit" >Login</button>
                )}
            </form>
            <div>
                New? <Link to='/register'>Register Here</Link>
            </div>
        </div>

    )
}

export default Login;