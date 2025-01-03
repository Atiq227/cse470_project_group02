import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './menu.css';

const Menu = () => {
    const [items, setItems] = useState([]);
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const customerName = location.state?.customerName || 'Customer';
    const customerId = location.state?.customerId;
    const contactNumber = location.state?.contactNumber;
    const email = location.state?.email;
    const credit = location.state?.credit;
    console.log(customerName, customerId, contactNumber, email, credit);

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/items');
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const addToCart = (item) => {
        setCart([...cart, item]);
        setShowCart(true);
    };

    const removeFromCart = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
    };

    const getTotal = () => {
        return cart.reduce((sum, item) => sum + parseFloat(item.item_price), 0);
    };

    const placeOrder = async (orderItems) => {
        try {
            const itemNames = orderItems.map(item => item.item_name);
            const totalAmount = orderItems.reduce((sum, item) => sum + parseFloat(item.item_price), 0);
            const response = await fetch('http://localhost:8000/api/place-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    items: itemNames,
                    customer_id: customerId, // Ensure customerId is included here
                    staff_id: 1,
                    chef_id: 1,
                    amount: totalAmount, // Ensure amount is included here
                    payment_method: 'Cash',
                    status: 1
                })
            });

            const data = await response.json();
            console.log('Server response:', data);

            if (!response.ok) {
                throw new Error(data.message || 'Order failed');
            }

            if (data.success) {
                alert('Order created successfully!');
                setCart([]);
                setShowCart(false);
                navigate('/order-confirmation', { state: { orderId: data.order_id, customerName, customerId, creditsEarned: data.credits_earned, contactNumber, email, credit: credit + data.credits_earned } });
            } else {
                alert('Failed to create order: ' + data.message);
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Error placing order: ' + error.message);
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

            <h1>Our Menu</h1>
            <div className="credit-notice">
                <p>If your order minimum of ৳500 you will get 100 credits</p>
            </div>
            <nav className="menu-nav">
                <button onClick={() => navigate('/customerhome', { state: { customerName, customerId, contactNumber, email, credit } })}>Back to Home</button>
            </nav>

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
                    </div>
                    <button 
                        className="order-btn"
                        onClick={() => placeOrder(cart)}
                    >
                        Place Order
                    </button>
                </div>
            )}
        </div>
    );
};

export default Menu;