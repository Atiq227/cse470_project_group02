import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { orderId } = location.state || {};

    return (
        <div className="order-confirmation">
            <h1>Order Confirmation</h1>
            {orderId ? (
                <p>Your order has been placed successfully! Your order ID is {orderId}.</p>
            ) : (
                <p>There was an issue with your order. Please try again.</p>
            )}
            <button onClick={() => navigate('/menu')}>Back to Menu</button>
        </div>
    );
};

export default OrderConfirmation;