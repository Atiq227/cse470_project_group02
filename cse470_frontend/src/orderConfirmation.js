import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './orderConfirmation.css';

const OrderConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { orderId, customerId, customerName, creditsEarned, contactNumber, email, credit } = location.state || {};
    console.log(orderId, customerId, customerName, creditsEarned, contactNumber, email, credit);
    return (
        <div className="order-confirmation">
            <h2>Order Confirmation</h2>
            <p>Thank you, {customerName}, for your order!</p>
            <p>Your order ID is: {orderId}</p>
            <p>You have earned {creditsEarned} credits with this order.</p>
            <button onClick={() => navigate('/menu', { state: { customerName, customerId, contactNumber, email, credit } })}>Back</button>
        </div>
    );
};

export default OrderConfirmation;