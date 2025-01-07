import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './staffcomplaint.css';

const StaffComplaint = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { staffName, staffId, contactNumber, email } = location.state || {};

    const handleBack = () => {
        navigate('/staffhome', { state: {  staffName, staffId, contactNumber, email  } });
    };

    const [formData, setFormData] = useState({
        staff_id: staffId || '',
        complaint_message: ''
    });

    const [status, setStatus] = useState({
        success: false,
        error: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ success: false, error: '' });

        try {
            const response = await fetch('http://127.0.0.1:8000/api/staff-complaint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log('Response Data:', data);

            if (response.ok) {
                setStatus({ success: true, error: '' });
                alert('Complaint submitted successfully');
                setFormData({
                    staff_id: staffId || '',
                    complaint_message: ''
                });
            } else {
                setStatus({ 
                    success: false, 
                    error: data.errors ? Object.values(data.errors).flat().join(', ') : data.message 
                });
            }
        } catch (error) {
            console.error('Error:', error);
            setStatus({ 
                success: false, 
                error: 'An error occurred while submitting the complaint' 
            });
        }
    };

    return (
        <div className="staff-complaint">
            <nav className="menu-nav">
                <button onClick={handleBack}>
                    Back to Dashboard
                </button>
            </nav>
            <h2>Staff Complaint Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="staff_id">Staff ID:</label>
                    <input
                        type="number"
                        id="staff_id"
                        name="staff_id"
                        value={formData.staff_id}
                        onChange={handleChange}
                        readOnly
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="complaint_message">Complaint Message:</label>
                    <textarea
                        id="complaint_message"
                        name="complaint_message"
                        value={formData.complaint_message}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
            {status.error && <p className="error-message">{status.error}</p>}
        </div>
    );
};

export default StaffComplaint;