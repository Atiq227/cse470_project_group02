import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './customerhome.css';

const CustomerHome = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { customerName, customerId, contactNumber, email, credit } = location.state || {};

    const actionCards = [
        {
            title: 'Order Food',
            description: 'Browse our menu and place an order',
            onClick: () => navigate('/menu', { state: { customerName, customerId, contactNumber, email, credit } })
        },
        {
            title: 'Previous Orders',
            description: 'View your order history',
            onClick: () => navigate('/previous-orders', { state: { customerName, customerId, contactNumber, email, credit } })
        },
        {
            title: 'Credit',
            description: 'View your credit balance',
            onClick: () => navigate('/credit', { state: { customerId, customerName, contactNumber, email, credit } })
        },
        {
            title: 'Favourite Items',
            description: 'View your saved favorites',
            onClick: () => navigate('/favorites', { state: {customerId, customerName, contactNumber, email, credit } })
        },
        {
            title: 'View Profile',
            description: 'Manage your account details',
            onClick: () => navigate('/customerprofile', { state: { customerName, contactNumber, email, credit } })
        }
    ];

    return (
        <div className="CustomerHome">
            <h1>Welcome {customerName}</h1>
            <p>Your customer ID is: {customerId}</p>
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
                        alert('Logged out');
                        navigate('/login');
                    }} 
                    className="logout-button"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default CustomerHome;