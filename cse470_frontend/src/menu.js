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

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        try {
            const response = await fetch('/api/menu');
            const data = await response.json();
            setItems(data.items);
        } catch (error) {
            console.error('Error fetching menu items:', error);
        }
    };

    const handlePlaceOrder = async () => {
        try {
            const response = await fetch('/api/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: cart }),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Order created successfully!');
                setCart([]);
                setShowCart(false);
                navigate('/order-confirmation', { state: { orderId: data.order_id, customerName } });
            } else {
                alert('Failed to create order: ' + data.message);
            }
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <div className="menu">
            <h1>Our Menu</h1>
            <h2>Welcome, {customerName}!</h2>
            <nav className="menu-nav">
                <button onClick={() => navigate('/customerhome', { state: { customerName } })}>
                    Back to Home
                </button>
            </nav>

            <div className="menu-grid">
                {items.map((item) => (
                    <div key={item.id} className="menu-item">
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <p>Price: ${item.price}</p>
                        <button onClick={() => setCart([...cart, item])}>Add to Cart</button>
                    </div>
                ))}
            </div>

            {showCart && (
                <div className="cart">
                    <h2>Your Cart</h2>
                    {cart.map((item, index) => (
                        <div key={index}>
                            <span>{item.name}</span>
                        </div>
                    ))}
                    <button onClick={handlePlaceOrder}>Place Order</button>
                    <button onClick={() => setShowCart(false)}>Close Cart</button>
                </div>
            )}

            <button className="cart-toggle" onClick={() => setShowCart(!showCart)}>
                {showCart ? 'Hide Cart' : 'Show Cart'}
            </button>
        </div>
    );
};

export default Menu;
