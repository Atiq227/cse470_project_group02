import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';

function StaffSignup() {
    const [formData, setFormData] = useState({
        staffName: '',
        contactNumber: '',
        email: '',
        password: ''
    });
    const [status, setStatus] = useState({
        success: false,
        error: '',
        errorDetails: []
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ success: false, error: '', errorDetails: [] });

        try {
            const response = await fetch('http://localhost:8000/api/staff-register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ 
                    success: true, 
                    error: '', 
                    errorDetails: [] 
                });
                setTimeout(() => {
                    navigate('/staff-login');
                }, 2000);
            } else {
                if (data.type === 'validation_error') {
                    setStatus({
                        success: false,
                        error: 'Please check the form for errors',
                        errorDetails: data.errors ? Object.values(data.errors) : []
                    });
                } else if (data.type === 'server_error') {
                    setStatus({
                        success: false,
                        error: data.message,
                        errorDetails: [data.error]
                    });
                } else {
                    setStatus({
                        success: false,
                        error: data.message || 'Registration failed',
                        errorDetails: []
                    });
                }
            }
        } catch (error) {
            setStatus({
                success: false,
                error: 'Registration failed due to a network error',
                errorDetails: [error.message]
            });
        }
    };

    return (
        <div className="Signup">
            <h1>Staff Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="staffName">Staff Name:</label>
                    <input
                        type="text"
                        id="staffName"
                        name="staffName"
                        placeholder="Enter your name"
                        value={formData.staffName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="contactNumber">Contact Number:</label>
                    <input
                        type="text"
                        id="contactNumber"
                        name="contactNumber"
                        placeholder="Enter your contact number"
                        value={formData.contactNumber}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
            {status.success && (
                <p className="success-message">
                    Signup successful! Redirecting to login page...
                </p>
            )}
            {status.error && (
                <div className="error-container">
                    <p className="error-message">{status.error}</p>
                    {status.errorDetails.map((error, index) => (
                        <p key={index} className="error-detail">
                            {error}
                        </p>
                    ))}
                </div>
            )}
            <p className="login-message">
                Already have an account?{' '}
                <button
                    className="login-link"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate('/staff-login');
                    }}
                >
                    Login now
                </button>
            </p>
        </div>
    );
}

export default StaffSignup;