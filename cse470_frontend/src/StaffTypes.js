import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StaffTypes.css';

const StaffTypes = () => {
    const navigate = useNavigate();

    return (
        <div className="staff-types-container">
            <h1>Staff Types</h1>
            <div className="options">
                <button onClick={() => navigate('/staff-login')}>Staff</button>
                <button onClick={() => navigate('/chef')}>Chef</button>
                <button onClick={() => navigate('/admin')}>Admin</button>
            </div>
        </div>
    );
};

export default StaffTypes;