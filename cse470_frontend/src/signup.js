import React, { useState } from 'react';
import './signup.css';

function Signup() {
    const [formData, setFormData] = useState({
        customerName: '',
        contactNumber: '',
        email: '',
        password: ''
    });

    const [status, setStatus] = useState({
        success: false,
        error: '',
        errorDetails: [] // To store field-specific error messages
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ success: false, error: '', errorDetails: [] });

        // URL for your backend API
        const apiUrl = 'http://localhost:8000/api/register'; // Make sure to change this to your backend URL

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ success: true, error: '', errorDetails: [] });
            } else {
                // Handle different error types based on the 'type' field returned from backend
                if (data.type === 'validation_error') {
                    setStatus({
                        success: false,
                        error: data.message,
                        errorDetails: data.errors ? Object.values(data.errors) : []
                    });
                } else if (data.type === 'server_error') {
                    setStatus({
                        success: false,
                        error: data.message,
                        errorDetails: [data.error] // You can include more details if available
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
                errorDetails: []
            });
        }
    };

    return (
        <div className="Signup">
            <h1>Create an Account</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="customerName">Customer Name:</label>
                    <input
                        type="text"
                        id="customerName"
                        name="customerName"
                        placeholder="Enter your name"
                        value={formData.customerName}
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

            {/* Show success message */}
            {status.success && <p className="success-message">Signup completed successfully!</p>}

            {/* Show general error message */}
            {status.error && <p className="error-message">{status.error}</p>}

            {/* Show specific field errors */}
            {status.errorDetails && status.errorDetails.length > 0 && (
                <div className="error-details">
                    <ul>
                        {status.errorDetails.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Signup;
