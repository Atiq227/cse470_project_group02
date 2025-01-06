import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './staffleave.css';

const StaffLeave = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { staffName, staffId, contactNumber, email } = location.state || {};

    const handleBack = () => {
        navigate('/staffhome', { state: {  staffName, staffId, contactNumber, email  } });
    };

    const [formData, setFormData] = useState({
        staff_id: staffId || '',
        reason: '',
        leave_from: '',
        leave_to: ''
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
            const response = await fetch('http://127.0.0.1:8000/api/staff-leave', {
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
                alert('Leave request submitted successfully. You will soon be notified about the request.');
                setFormData({
                    staff_id: staffId || '',
                    reason: '',
                    leave_from: '',
                    leave_to: ''
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
                error: 'An error occurred while submitting the leave request' 
            });
        }
    };

    return (
        <div className="staff-leave">
            <nav className="menu-nav">
                <button onClick={handleBack}>
                    Back to Dashboard
                </button>
            </nav>
            <h2>Staff Leave Request Form</h2>
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
                    <label htmlFor="reason">Reason:</label>
                    <textarea
                        id="reason"
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="leave_from">Leave From:</label>
                    <input
                        type="date"
                        id="leave_from"
                        name="leave_from"
                        value={formData.leave_from}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="leave_to">Leave To:</label>
                    <input
                        type="date"
                        id="leave_to"
                        name="leave_to"
                        value={formData.leave_to}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            {status.error && <p className="error-message">{status.error}</p>}
        </div>
    );
};

export default StaffLeave;