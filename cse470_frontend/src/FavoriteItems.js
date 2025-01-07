import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './menu.css';

const FavoriteItems = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { customerName, customerId, contactNumber, email, credit } = location.state || {};

    const fetchFavoriteItems = useCallback(async () => {
        if (!customerId) return;

        try {
            setLoading(true);
            const response = await fetch(`http://localhost:8000/api/customer-favorite/${customerId}`);
            const data = await response.json();

            if (response.ok) {
                setFavorites(data.data);
            } else {
                setError(data.message || 'Failed to fetch favorite items');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [customerId]);

    useEffect(() => {
        fetchFavoriteItems();
    }, [fetchFavoriteItems]);

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
                    customer_id: customerId,
                    staff_id: 1,
                    chef_id: 1,
                    amount: totalAmount,
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
                navigate('/favorder-confirmation', { state: { orderId: data.order_id, customerName, customerId, creditsEarned: data.credits_earned, contactNumber, email, credit: credit + data.credits_earned } });
            } else {
                alert('Failed to create order: ' + data.message);
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Error placing order: ' + error.message);
        }
    };

    const removeFromFavorites = async (itemId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/customer-favorite/${customerId}/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            const data = await response.json();
            console.log('Remove from favorites response:', data);

            if (!response.ok) {
                throw new Error(data.message || 'Failed to remove from favorites');
            }

            if (data.status === 'success') {
                alert('Item removed from favorites!');
                setFavorites(favorites.filter(favorite => favorite.item_id !== itemId));
            } else {
                alert('Failed to remove from favorites: ' + data.message);
            }
        } catch (error) {
            console.error('Error removing from favorites:', error);
            alert('Error removing from favorites: ' + error.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="menu-container">
            <button 
                className="cart-toggle-btn"
                onClick={() => setShowCart(!showCart)}
            >
                🛒 Cart ({cart.length})
            </button>

            <h1>Your Favorite Items</h1>
            <div className="credit-notice">
                <p>If your order minimum of ৳500 you will get 100 credits</p>
            </div>
            <nav className="menu-nav">
                <button onClick={() => navigate('/customerhome', { state: { customerName, customerId, contactNumber, email, credit } })}>Back to Home</button>
            </nav>

            <div className="menu-grid">
                {favorites.map(favorite => (
                    <div key={favorite.item_id} className="menu-item">
                        <h3 className="item-name">{favorite.item.item_name}</h3>
                        <p className="price">৳{favorite.item.item_price}</p>
                        <div className="image-container">
                            <img 
                                src={`data:image/jpeg;base64,${favorite.item.photo}`} 
                                alt={favorite.item.item_name}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'default-food-image.jpg';
                                }}
                            />
                        </div>
                        <div className="button-container">
                            <button 
                                className="add-to-cart-btn"
                                onClick={() => addToCart(favorite.item)}
                            >
                                Add to Cart
                            </button>
                            <button 
                                className="order-item-btn"
                                onClick={() => placeOrder([favorite.item])}
                            >
                                Order This Item
                            </button>
                            <button 
                                className="rmv-fav-item-btn"
                                onClick={() => removeFromFavorites(favorite.item_id)}
                            >
                                Remove from Favorites
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

export default FavoriteItems;