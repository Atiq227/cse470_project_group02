import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './staffmenu.css';

const StaffMenu = () => {
    const [items, setItems] = useState([]);
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [customerId, setCustomerId] = useState('');
    const [customerIdError, setCustomerIdError] = useState('');
    const [customerData, setCustomerData] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { staffName, staffId, contactNumber, email } = location.state || {};

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/items');
            if (!response.ok) {
                throw new Error('Failed to fetch menu items');
            }
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error('Error fetching menu items:', error);
        }
    };

    const validateCustomerId = async () => {
        try {
            const numericId = parseInt(customerId.trim(), 10);
            
            console.log('Attempting to validate:', {
                originalId: customerId,
                numericId: numericId,
                isValidNumber: !isNaN(numericId)
            });

            if (isNaN(numericId) || numericId <= 0) {
                setCustomerIdError('Please enter a valid positive numeric ID.');
                return false;
            }

            const response = await fetch(`http://localhost:8000/api/customer/${numericId}`);
            
            if (!response.ok) {
                const data = await response.json();
                setCustomerIdError(data.message || `Customer ID ${numericId} not found.`);
                return false;
            }

            const data = await response.json();
            
            if (!data || !data.customer_id) {
                setCustomerIdError(`Customer ID ${numericId} not found.`);
                return false;
            }

            setCustomerData(data);
            setCustomerIdError('');
            return true;

        } catch (error) {
            console.error('Error validating customer ID:', error);
            setCustomerIdError('An error occurred while validating the customer ID.');
            return false;
        }
    };

    const addToCart = (item) => {
        setCart([...cart, item]);
        setShowCart(true);
    };

    const removeFromCart = (index) => {
        const newCart = cart.filter((_, i) => i !== index);
        setCart(newCart);
    };

    const getTotal = () => {
        return cart.reduce((total, item) => total + parseFloat(item.item_price), 0);
    };

    const getCreditsToEarn = (amount) => {
        return Math.round((amount / 500) * 100);
    };

    const placeOrder = async (orderItems) => {
        if (!customerId) {
            setCustomerIdError('Please enter a customer ID.');
            return;
        }

        try {
            const isValidCustomer = await validateCustomerId();
            if (!isValidCustomer) {
                return;
            }
            const itemNames = orderItems.map(item => item.item_name);
            const totalAmount = orderItems.reduce((total, item) => total + parseFloat(item.item_price), 0);
            const creditsToAdd = getCreditsToEarn(totalAmount);

            const response = await fetch('http://localhost:8000/api/place-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: itemNames,
                    customer_id: parseInt(customerId),
                    staff_id: staffId,
                    chef_id: 0,
                    amount: totalAmount,
                    payment_method: 'Credit',
                    status: 1,
                    credits_earned: creditsToAdd
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert(`Order placed successfully! Credits earned: ${creditsToAdd}`);
                setCart([]);
                setShowCart(false);
                setCustomerId('');
                setCustomerIdError('');
                setCustomerData(null);
            } else {
                throw new Error(data.message || 'Failed to place order');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert(error.message || 'Failed to place order');
        }
    };

    return (
        <div className="menu-container">
            <button 
                className="cart-toggle-btn"
                onClick={() => setShowCart(!showCart)}
            >
                🛒 Cart ({cart.length})
            </button>

            <h1>Staff Menu</h1>
            <nav className="menu-nav">
                <button onClick={() => navigate('/staffhome', { state: {  staffName, staffId, contactNumber, email  } })}>
                    Back to Dashboard
                </button>
            </nav>

            <div className="customer-section">
                <input
                    type="text"
                    className="customer-input"
                    placeholder="Enter Customer ID"
                    value={customerId}
                    onChange={(e) => {
                        setCustomerId(e.target.value);
                        setCustomerIdError('');
                        setCustomerData(null);
                    }}
                />
                <button className="find-button" onClick={validateCustomerId}>Find</button>
                {customerIdError && <p className="error-message">{customerIdError}</p>}
                {customerData && (
                    <div className="customer-details">
                        <p>Customer Name: {customerData.customer_name}</p>
                        <p>Contact: {customerData.contact}</p>
                    </div>
                )}
            </div>

            <div className="menu-grid">
                {items.map(item => (
                    <div key={item.item_id} className="menu-item">
                        <h3 className="item-name">{item.item_name}</h3>
                        <p className="price">৳{item.item_price}</p>
                        <div className="image-container">
                            <img 
                                src={`data:image/jpeg;base64,${item.photo}`} 
                                alt={item.item_name}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'default-food-image.jpg';
                                }}
                            />
                        </div>
                        <div className="button-container">
                            <button 
                                className="add-to-cart-btn"
                                onClick={() => addToCart(item)}
                            >
                                Add to Cart
                            </button>
                            <button 
                                className="order-item-btn"
                                onClick={() => placeOrder([item])}
                            >
                                Order This Item
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            {showCart && cart.length > 0 && (
                <div className="cart-container">
                    <div className="cart-header">
                        <h2>Shopping Cart</h2>
                        <button 
                            className="close-cart-btn"
                            onClick={() => setShowCart(false)}
                        >
                            ×
                        </button>
                    </div>
                    <div className="cart-items">
                        {cart.map((item, index) => (
                            <div key={index} className="cart-item">
                                <div className="cart-item-details">
                                    <span className="cart-item-name">{item.item_name}</span>
                                    <span className="cart-item-price">৳{item.item_price}</span>
                                </div>
                                <button 
                                    className="remove-item-btn"
                                    onClick={() => removeFromCart(index)}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="cart-total">
                        <strong>Total: ৳{getTotal()}</strong>
                        <p className="credits-info">
                            Credits to be earned: {getCreditsToEarn(getTotal())}
                        </p>
                    </div>
                    <button 
                        className="order-btn"
                        onClick={() => placeOrder(cart)}
                        disabled={!customerId || cart.length === 0}
                    >
                        Place Order for Customer
                    </button>
                </div>
            )}
        </div>
    );
};

export default StaffMenu;