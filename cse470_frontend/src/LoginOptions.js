import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginOptions.css';

function LoginOptions() {
    const navigate = useNavigate();

    const handleLogin = (role) => {
        if (role === 'staff') {
            navigate('/login'); // Redirect to staff login
        } else if (role === 'admin') {
            navigate('/admin-login'); // Corrected to match the route in App.js
        } else if (role === 'chef') {
            // Future implementation for chef login
            console.log('Chef login not implemented yet');
        }
    };

    return (
        <div className="container">
            <h2>Log in as</h2>
            <button className="login-options-button" onClick={() => handleLogin('staff')}>Staff</button>
            <button className="login-options-button" onClick={() => handleLogin('admin')}>Admin</button>
            <button className="login-options-button" onClick={() => handleLogin('chef')}>Chef</button>
        </div>
    );
}

export default LoginOptions;
