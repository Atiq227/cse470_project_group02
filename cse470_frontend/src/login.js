// src/Login.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import './login.css'; // Ensure this file exists and the name matches

function Login() {
    const navigate = useNavigate(); // Hook for navigation

    return (
        <div className="Login">
            <h1>Please log in</h1>
            <form>
                <label>
                    Email:
                    <input type="text" name="email" />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" />
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
}

export default Login;