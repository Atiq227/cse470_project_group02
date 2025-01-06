import React from 'react';
import { useLocation } from 'react-router-dom';
import './customerprofile.css';

const CustomerProfile = () => {
  const location = useLocation();
  const { customerName, contactNumber, email } = location.state || {};

  const handleChangePassword = () => {
    // Implement change password functionality here
    alert("Change Password Clicked");
  };

  return (
    <div className="customer-profile">
      <h2>Customer Profile</h2>
      <p><strong>Name:</strong> {customerName}</p>
      <p><strong>Contact Number:</strong> {contactNumber}</p>
      <p><strong>Email:</strong> {email}</p>
      <button onClick={handleChangePassword}>Change Password</button>
    </div>
  );
};

export default CustomerProfile;