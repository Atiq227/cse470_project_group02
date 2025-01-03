import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './customerhome.css';

const CustomerHome = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const customerName = location.state?.customerName || 'Customer';
    const customerId = location.state?.customerId;
    const contactNumber = location.state?.contactNumber;
    const email = location.state?.email;
    const credit = location.state?.credit;
    console.log(customerName, customerId, contactNumber, email, credit);
    const actionCards = [
        {
            title: 'View Menu',
            description: 'Browse our food menu',
            onClick: () => navigate('/menu', { state: { customerName, customerId, contactNumber, email, credit } })
        },
        {
            title: 'Previous Orders',
            description: 'View your order history',
            onClick: () => navigate('/previousorders', { state: { customerName, customerId, contactNumber, email, credit } })
        },
        {
            title: 'Credit Balance',
            description: 'Check your available credit',
            onClick: () => navigate('/credit', { state: { customerName, customerId, contactNumber, email, credit } })
        },
        {
            title: 'Favourite Items',
            description: 'View your saved favorites',
            onClick: () => navigate('/favorites', { state: { customerName, contactNumber, email, credit } })
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
        </div>
    );
};

export default CustomerHome;