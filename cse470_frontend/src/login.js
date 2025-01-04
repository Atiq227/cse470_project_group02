import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css'; // Ensure this file exists and the name matches

const Login = () => {
    const navigate = useNavigate(); // Hook for navigation
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email,
                password,
            });

            localStorage.setItem('token', response.data.token);
            alert('Login successful!');
            navigate('/chef-dashboard'); // Navigate to the chef dashboard after successful login
        } catch (err) {
            setError(err.response.data.error || 'Login failed');
        }
    };

    return (
        <div className="Login">
            <h1>Please log in</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <p className="forgot-password">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            // Handle forgot password functionality here
                        }}
                    >
                        Forgot Password?
                    </button>
                </p>
                <button type="submit">Login</button>
            </form>
            <p className="signup-message">
                <span className="signup-text">Don't have an account?</span>{' '}
                <button
                    className="signup-link"
                    href="#"
                    onClick={(e) => {
                        e.preventDefault(); // Prevent default anchor behavior
                        navigate('/signup'); // Navigate to the signup page
                    }}
                >
                    Sign up now
                </button>
            </p>
        </div>
    );
};

export default Login;
