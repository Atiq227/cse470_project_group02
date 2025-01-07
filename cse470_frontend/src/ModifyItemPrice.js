import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ModifyItemPrice.css';

function ModifyItemPrice() {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [newPrice, setNewPrice] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/items');
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const handlePriceUpdate = async () => {
        if (!selectedItem || !newPrice) {
            alert('Please select an item and enter a new price.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/api/items/${selectedItem}/price`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ item_price: newPrice }),
            });

            if (!response.ok) {
                throw new Error('Failed to update item price');
            }

            alert('Item price updated successfully');
            fetchItems(); // Refresh the items list
        } catch (error) {
            console.error('Error updating item price:', error);
            alert('Error updating item price');
        }
    };

    return (
        <div className="modify-item-price-container">
            <h1>Modify Item Price</h1>
            <button className="back-button" onClick={() => navigate('/admin-home')}>Back to Admin Home</button>
            <div className="item-selection">
                <label htmlFor="item-select">Select Item:</label>
                <select
                    id="item-select"
                    value={selectedItem}
                    onChange={(e) => setSelectedItem(e.target.value)}
                >
                    <option value="">--Select an item--</option>
                    {items.map((item) => (
                        <option key={item.item_id} value={item.item_id}>
                            {item.item_name} - ৳{item.item_price}
                        </option>
                    ))}
                </select>
            </div>
            <div className="price-input">
                <label htmlFor="new-price">New Price:</label>
                <input
                    type="number"
                    id="new-price"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                />
            </div>
            <button className="update-button" onClick={handlePriceUpdate}>Update Price</button>
        </div>
    );
}

export default ModifyItemPrice;