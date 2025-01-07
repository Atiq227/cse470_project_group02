import React, { useState, useEffect } from "react";
import api from '../config/axios';
import './ChefDashboard.css';

const ChefDashboard = () => {
  // State for food items
  const [foodItems, setFoodItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: '' });
  
  // State for orders
  const [orders, setOrders] = useState([]);
  
  // State for notifications
  const [notification, setNotification] = useState('');
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch food items on component mount
  useEffect(() => {
    fetchFoodItems();
    fetchOrders();
    fetchStaffList();
  }, []);

  // Fetch food items
  const fetchFoodItems = async () => {
    try {
      const response = await api.get('/food-items');
      console.log('Food items response:', response.data); // Debug log
      if (response.data.status === 'success') {
        setFoodItems(response.data.data.items);
        console.log('Updated food items:', response.data.data.items); // Debug log
      }
    } catch (error) {
      console.error('Error fetching food items:', error);
    }
  };

  // Add new food item
  const handleAddItem = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
        console.log('Sending new item data:', { 
            item_name: newItem.name, 
            item_price: parseFloat(newItem.price) 
        }); // Debug log

        const response = await api.post('/menu/item/add', {
            item_name: newItem.name,
            item_price: parseFloat(newItem.price)
        });

        console.log('Add item response:', response.data); // Debug log

        if (response.data.status === 'success') {
            setNewItem({ name: '', price: '' });
            await fetchFoodItems(); // Make sure to await this
            alert('Food item added successfully');
        } else {
            setError(response.data.message || 'Failed to add item');
        }
    } catch (error) {
        console.error('Error adding food item:', error);
        setError(error.response?.data?.message || 'Error adding food item');
    } finally {
        setIsLoading(false);
    }
  };

  // Remove food item
  const handleRemoveItem = async (itemId) => {
    try {
      await api.delete(`/menu/item/remove/${itemId}`);
      fetchFoodItems();
    } catch (error) {
      console.error('Error removing food item:', error);
    }
  };

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // Handle order acceptance
  const handleAcceptOrder = async (orderId) => {
    try {
      await api.post(`/order/${orderId}/accept`);
      fetchOrders();
    } catch (error) {
      console.error('Error accepting order:', error);
    }
  };

  // Handle order decline
  const handleDeclineOrder = async (orderId) => {
    try {
      await api.post(`/order/${orderId}/decline`);
      fetchOrders();
    } catch (error) {
      console.error('Error declining order:', error);
    }
  };

  // Fetch staff list
  const fetchStaffList = async () => {
    try {
      const response = await api.get('/staff');
      setStaffList(response.data.staff);
    } catch (error) {
      console.error('Error fetching staff list:', error);
    }
  };

  // Send notification
  const handleSendNotification = async (e) => {
    e.preventDefault();
    try {
      await api.post('/notify', {
        message: notification,
        staff_ids: selectedStaff
      });
      setNotification('');
      setSelectedStaff([]);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  return (
    <div className="chef-dashboard">
      <h1>Chef Dashboard</h1>

      {/* Add Food Item Section */}
      <section className="section">
        <h2>Add New Food Item</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleAddItem}>
          <input
            type="text"
            placeholder="Food Item Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            required
            disabled={isLoading}
          />
          <input
            type="number"
            placeholder="Price"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            required
            min="0"
            step="0.01"
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add Item'}
          </button>
        </form>
      </section>

      {/* Food Items List Section */}
      <section className="section">
        <h2>Current Food Items</h2>
        <div className="food-items-grid">
          {foodItems.map((item) => (
            <div key={item.item_id} className="food-item-card">
              <h3>{item.item_name}</h3>
              <p>${item.item_price}</p>
              <button onClick={() => handleRemoveItem(item.item_id)}>Remove</button>
            </div>
          ))}
        </div>
      </section>

      {/* Orders Section */}
      <section className="section">
        <h2>Pending Orders</h2>
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <h3>Order #{order.id}</h3>
              <p>{order.items}</p>
              <div className="order-actions">
                <button onClick={() => handleAcceptOrder(order.id)}>Accept</button>
                <button onClick={() => handleDeclineOrder(order.id)}>Decline</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Notifications Section */}
      <section className="section">
        <h2>Send Notification to Staff</h2>
        <form onSubmit={handleSendNotification}>
          <textarea
            placeholder="Notification message"
            value={notification}
            onChange={(e) => setNotification(e.target.value)}
            required
          />
          <select
            multiple
            value={selectedStaff}
            onChange={(e) => setSelectedStaff(Array.from(e.target.selectedOptions, option => option.value))}
          >
            {staffList.map((staff) => (
              <option key={staff.id} value={staff.id}>
                {staff.name}
              </option>
            ))}
          </select>
          <button type="submit">Send Notification</button>
        </form>
      </section>
    </div>
  );
};

export default ChefDashboard;



