import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

function StaffLogin() {
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
            const response = await fetch('http://localhost:8000/api/staff-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log('API Response:', data);

            if (response.ok) {
                setStatus({ success: true, error: '' });
                navigate('/staffhome', { 
                    state: { 
                        staffName: data.user.staffName, 
                        staffId: data.user.staffId,
                        contactNumber: data.user.contactNumber,
                        email: data.user.email,
                        role: data.user.role
                    } 
                });
            } else {
                setStatus({ success: false, error: data.message || 'Login failed' });
            }
        } catch (error) {
            setStatus({ success: false, error: 'Login failed due to a network error' });
        }
    };

    return (
        <div className="Login">
            <h1>Staff Login</h1>
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
                <p className="forgot-password">
                    <button onClick={(e) => e.preventDefault()}>
                        Forgot Password?
                    </button>
                </p>
                <button type="submit">Login</button>
            </form>
            {status.success && <p className="success-message">Login successful!</p>}
            {status.error && <p className="error-message">{status.error}</p>}
            <p className="signup-message">
                Don't have an account?{' '}
                <button
                    className="signup-link"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate('/staff-signup');
                    }}
                >
                    Sign up now
                </button>
            </p>
        </div>
    );
}

export default StaffLogin;