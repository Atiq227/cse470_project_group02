import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './orderhistory.css';

const OrderHistory = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { staffName, staffId, contactNumber, email } = location.state || {};
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/staff-orders/${staffId}`);
                console.log('Response:', response.data); // Debug log
                setOrders(response.data.orders);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            }
        };

        if (staffId) {
            fetchOrders();
        }
    }, [staffId]);

    return (
        <div className="OrderHistory">
            <h1>Order History</h1>
            <nav className="menu-nav">
                <button onClick={() => navigate('/staffhome', { state: { staffName, staffId, contactNumber, email  } })}>Back to Dashboard</button>
            </nav>
            <div className="orders-container">
                {orders && orders.length > 0 ? (
                    orders.map(order => (
                        <div key={order.order_id} className="order-card">
                            <h2>Order #{order.order_id}</h2>
                            <p className="amount">Total: ৳{order.amount}</p>
                            <p className="customer-id">Customer ID: {order.customer_id}</p>
                            <p className="customer-name">Customer Name: {order.customer_name}</p>
                            <div className="items-list">
                                <h3>Items:</h3>
                                <ul>
                                    {Array.isArray(order.items) && order.items.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
        </div>
    );
};

export default OrderHistory;