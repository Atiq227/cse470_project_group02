import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TotalSales.css';

function TotalSales() {
    const [totalSales, setTotalSales] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTotalSales();
    }, []);

    const fetchTotalSales = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/total-sales');
            const data = await response.json();
            setTotalSales(data.total_sales);
        } catch (error) {
            console.error('Error fetching total sales:', error);
        }
    };

    return (
        <div className="total-sales-container">
            <h1>Total Sales</h1>
            <button className="back-button" onClick={() => navigate('/admin-home')}>Back to Admin Home</button>
            <div className="total-sales-amount">
                <p>Total Sales Amount: ৳{totalSales}</p>
            </div>
        </div>
    );
}

export default TotalSales;