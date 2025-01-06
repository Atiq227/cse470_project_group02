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
                console.log('Raw orders data:', response.data.orders); // Debug log
                setOrders(response.data.orders);
            } catch (error) {
                console.error('Failed to fetch previous orders:', error);
            }
        };

        if (customerId) {
            fetchPreviousOrders();
        }
    }, [customerId]);

    const parseItems = (items) => {
        if (!items) return []; // Handle empty or null items

        console.log('Raw items string:', items); // Debug log

        try {
            const decodedItems = JSON.parse(items);
            if (typeof decodedItems === 'string') {
                return JSON.parse(decodedItems);
            }
            return decodedItems;
        } catch (error) {
            console.error('Failed to parse items:', error);
            return [];
        }
    };

    return (
        <div className="PreviousOrders">
            <h1>Previous Orders</h1>
            <nav className="menu-nav">
                <button onClick={() => navigate('/customerhome', { 
                    state: { customerName, customerId, contactNumber, email, credit } 
                })}>
                    Back
                </button>
            </nav>
            <div className="orders-container">
                {orders && orders.length > 0 ? (
                    orders.map(order => {
                        console.log('Processing order:', order); // Debug log
                        return (
                            <div key={order.order_id} className="order-card">
                                <h2>Order #{order.order_id}</h2>
                                <p className="amount">Total: ৳{order.amount}</p>
                                <div className="items-list">
                                    <h3>Items:</h3>
                                    <ul>
                                        {parseItems(order.items).map((item, index) => (
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
                        );
                    })
                ) : (
                    <p>No previous orders found.</p>
                )}
            </div>
        </div>
    );
};

export default PreviousOrders;
