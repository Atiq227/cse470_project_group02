import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './customerhome.css';

const StaffHome = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { staffName, staffId, contactNumber, email } = location.state || {};
    console.log(staffName, staffId, contactNumber, email);

    const actionCards = [
        {
            title: 'Order Food food for customer',
            description: 'Browse our menu and place an order for customer',
            onClick: () => navigate('/staffmenu', { state: { staffName, staffId, contactNumber, email } })
        },

        {
            title: 'Order History',
            description: 'View the orders that you handled',
            onClick: () => navigate('/orderhistory', { state: { staffName, staffId, contactNumber, email } })
        },
        
        {
            title: 'Daily Tasks',
            description: 'Check your daily tasks',
            onClick: () => navigate('/staff-tasks', { state: { staffName, staffId, contactNumber, email } })
        },
        
        {
            title: 'View Profile',
            description: 'Manage your account details',
            onClick: () => navigate('/staffprofile', { state: { staffName, staffId, contactNumber, email } })
        },        
        
        {
            title: 'Leave a complaint',
            description: 'Complaint about the equipments and other things',
            onClick: () => navigate('/staff-complaint', { state: { staffName, staffId, contactNumber, email } })
        },
        
        {
            title: 'Leave request',
            description: 'Submit a leave request',
            onClick: () => navigate('/staffleave', { state: { staffName, staffId, contactNumber, email } })
        },
    ];

    return (
        <div className="CustomerHome">
            <h1>Welcome {staffName}</h1>
            <div className="actions-grid">
                {actionCards.map((card, index) => (
                    <div 
                        key={index}
                        className="action-card"
                        onClick={card.onClick}
                    >
                        <h2>{card.title}</h2>
                        <p>{card.description}</p>
                    </div>
                ))}
            </div>
            <div className="logout-container">
                <button 
                    onClick={() => {
                        navigate('/staff-login');
                    }} 
                    className="logout-button"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default StaffHome;