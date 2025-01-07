import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

function AdminLogin() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [status, setStatus] = useState({ success: false, error: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ success: false, error: '' });

        try {
            const response = await fetch('http://localhost:8000/api/admin-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ success: true, error: '' });
                navigate('/admin-home');
            } else {
                setStatus({ success: false, error: data.message || 'Login failed' });
            }
        } catch (error) {
            setStatus({ success: false, error: 'Login failed due to a network error' });
        }
    };

    return (
        <div className="Login">
            <h1>Admin Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input 
                        type="text" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange} 
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input 
                        type="password" 
                        name="password" 
                        value={formData.password}
                        onChange={handleChange} 
                    />
                </label>
                <button type="submit">Login</button>
            </form>
            {status.success && <p className="success-message">Login successful!</p>}
            {status.error && <p className="error-message">{status.error}</p>}
        </div>
    );
}

export default AdminLogin;