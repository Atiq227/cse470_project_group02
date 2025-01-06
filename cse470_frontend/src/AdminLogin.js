import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import './login.css'; // Ensure this file exists and the name matches

function Login() {
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
