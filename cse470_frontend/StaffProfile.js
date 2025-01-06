import React from 'react';
import { useLocation } from 'react-router-dom';
import './staffprofile.css';

const StaffProfile = () => {
    const location = useLocation();
    const { staffName, staffId, contactNumber, email } = location.state || {};

    const handleChangePassword = () => {
        // Implement change password functionality here
        alert("Change Password Clicked");
    };

    return (
        <div className="staff-profile">
            <h2>Staff Profile</h2>
            <p><strong>Name:</strong> {staffName}</p>
            <p><strong>Staff ID:</strong> {staffId}</p>
            <p><strong>Contact Number:</strong> {contactNumber}</p>
            <p><strong>Email:</strong> {email}</p>
            <button onClick={handleChangePassword}>Change Password</button>
        </div>
    );
};

export default StaffProfile;