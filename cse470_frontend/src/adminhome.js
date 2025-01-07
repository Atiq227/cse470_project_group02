import React from 'react';
import { useNavigate } from 'react-router-dom';
import './customerhome.css';

const AdminHome = () => {
    const navigate = useNavigate();


    const actionCards = [
        {
            title: 'Check feedbacks',
            description: 'Check the feedbacks given by the customers',
            onClick: () => navigate('/feedback')
        },

        {
            title: 'Check staff complaints',
            description: 'View the complaints made by the staff',
            onClick: () => navigate('/check-complaint')
        },
        
        {
            title: 'Check staff leave requests',
            description: 'Check the staffs leave requests',
            onClick: () => navigate('/check-staff-leave')
        },
        
        {
            title: 'Modify Item Prices',
            description: 'Modify the prices of menu items',
            onClick: () => navigate('/modify-item-price')
        },        
        
        {
            title: 'View Total Sales',
            description: 'View the total sales amount',
            onClick: () => navigate('/total-sales')
        },
    ];

    return (
        <div className="CustomerHome">
            <h1>Welcome</h1>
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
                        navigate('/admin-login');
                    }} 
                    className="logout-button"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default AdminHome;