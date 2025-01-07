import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckComplaint.css';

function StaffComplaints() {
    const [complaints, setComplaints] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8000/api/check-complaint')
            .then(response => response.json())
            .then(data => setComplaints(data))
            .catch(error => console.error('Error fetching complaints:', error));
    }, []);

    return (
        <div className="complaints-container">
            <h1>Staff Complaints</h1>
            <button className="back-button" onClick={() => navigate('/admin-home')}>Back to Admin Home</button>
            <ul className="complaints-list">
                {complaints.map((complaint, index) => (
                    <li key={index} className="complaint-item">
                        <p><strong>Staff Name: {complaint.staff_name}</strong></p>
                        <p>Staff ID: {complaint.staff_id}</p>
                        <p>Complaint: {complaint.complaint_message}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default StaffComplaints;