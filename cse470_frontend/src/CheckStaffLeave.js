import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './checkstaffleave.css';

function StaffLeaveRequests() {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8000/api/staff-leave-requests')
            .then(response => response.json())
            .then(data => setLeaveRequests(data))
            .catch(error => console.error('Error fetching leave requests:', error));
    }, []);

    return (
        <div className="leave-requests-container">
            <h1>Staff Leave Requests</h1>
            <button className="back-button" onClick={() => navigate('/admin-home')}>Back to Admin Home</button>
            <ul className="leave-requests-list">
                {leaveRequests.map((request, index) => (
                    <li key={index} className="leave-request-item">
                        <p><strong>Staff Name: {request.staff_name}</strong></p>
                        <p>Staff ID: {request.staff_id}</p>
                        <p>Reason: {request.reason}</p>
                        <p>Leave From: {new Date(request.leave_from).toLocaleDateString()}</p>
                        <p>Leave To: {new Date(request.leave_to).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default StaffLeaveRequests;