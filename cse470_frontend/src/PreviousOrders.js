import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PreviousOrders.css';

const PreviousOrders = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { customerId, customerName, contactNumber, email, credit } = location.state || {};
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchPreviousOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/previous-orders/${customerId}`);
                console.log('Response:', response.data); // Debug log
                setOrders(response.data.orders);
            } catch (error) {
                console.error('Failed to fetch previous orders:', error);
            }
        };

        if (customerId) {
            fetchPreviousOrders();
        }
    }, [customerId]);

    return (
        <div className="PreviousOrders">
            <h1>Previous Orders</h1>
            <nav className= "menu-nav">
                 <button onClick={() => navigate('/customerhome', { state: { customerName, customerId, contactNumber, email, credit } })}>Back</button>
            </nav>
            <div className="orders-container">
                {orders && orders.length > 0 && (
                    orders.map(order => (
                        <div key={order.order_id} className="order-card">
                            <h2>Order #{order.order_id}</h2>
                            <p className="amount">Total: ৳{order.amount}</p>
                            <div className="items-list">
                                <h3>Items:</h3>
                                <ul>
                                    {Array.isArray(order.items) && order.items.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <button 
                                onClick={() => navigate('/customer-review', { 
                                    state: { 
                                        ...location.state, 
                                        orderId: order.order_id 
                                    } 
                                })}
                                className="review-button"
                            >
                                Add Review
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PreviousOrders;