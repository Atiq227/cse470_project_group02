import React from 'react';
import { useLocation } from 'react-router-dom';
import './customerhome.css';

const CustomerHome = () => {
    const location = useLocation();
    const customerName = location.state && location.state.customerName ? location.state.customerName : 'Customer';
    console.log('Customer Name:', customerName);

    return (
        <div className="CustomerHome">
            <div className="customer-content">
                <h1>Welcome, {customerName}</h1>
            </div>
        </div>
    );
};

export default CustomerHome;
