import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './credit.css';

const Credit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {customerId, customerName, contactNumber, email, credit } = location.state || {};
  console.log(customerId, customerName, contactNumber, email, credit);
  return (
    <div className="credit-container">
      <h1>You have {credit} credits available</h1>
      <h1>You can use credits for future orders</h1>
      <button onClick={() => navigate('/customerhome', { state: { customerName, customerId, contactNumber, email, credit } })}>Back</button>
    </div>
  );
};

export default Credit;