import React, { useState } from "react";
import axios from "axios"; // Importing axios for HTTP requests

// The main component for the Chef's Dashboard
const ChefDashboard = () => {
  // State variables to handle form inputs and data
  const [menuName, setMenuName] = useState(""); // To store the menu name
  const [itemName, setItemName] = useState(""); // To store the food item name
  const [itemPrice, setItemPrice] = useState(""); // To store the food item price
  const [menuId, setMenuId] = useState(""); // To store the menu ID for adding items
  const [orderId, setOrderId] = useState(""); // To store the order ID for managing orders
  const [notificationMessage, setNotificationMessage] = useState(""); // To store the notification message

  // Function to add a new menu
  const addMenu = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/create-menu", {
        menu_name: menuName, // Sending menu name to the backend
      });
      alert(response.data.message); // Showing success message
    } catch (error) {
      console.error(error); // Logging any errors
      alert("Failed to create menu"); // Showing failure message
    }
  };

  // Function to add a new food item
  const addFoodItem = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/add-food-item", {
        item_name: itemName, // Sending food item name to the backend
        item_price: itemPrice, // Sending food item price to the backend
        menu_id: menuId, // Sending menu ID to the backend
      });
      alert(response.data.message); // Showing success message
    } catch (error) {
      console.error(error); // Logging any errors
      alert("Failed to add food item"); // Showing failure message
    }
  };

  // Function to remove a food item by its ID
  const removeFoodItem = async (itemId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/remove-food-item/${itemId}`);
      alert(response.data.message); // Showing success message
    } catch (error) {
      console.error(error); // Logging any errors
      alert("Failed to remove food item"); // Showing failure message
    }
  };

  // Function to accept an order by its ID
  const acceptOrder = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/accept-order/${orderId}`);
      alert(response.data.message); // Showing success message
    } catch (error) {
      console.error(error); // Logging any errors
      alert("Failed to accept order"); // Showing failure message
    }
  };

  // Function to decline an order by its ID
  const declineOrder = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/decline-order/${orderId}`);
      alert(response.data.message); // Showing success message
    } catch (error) {
      console.error(error); // Logging any errors
      alert("Failed to decline order"); // Showing failure message
    }
  };

  // Function to send notifications to staff
  const sendNotification = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/send-notification", {
        message: notificationMessage, // Sending notification message to the backend
      });
      alert(response.data.message); // Showing success message
    } catch (error) {
      console.error(error); // Logging any errors
      alert("Failed to send notification"); // Showing failure message
    }
  };

  return (
    <div className="chef-dashboard"> {/* Main container for the Chef Dashboard */}
      <h2>Chef Dashboard</h2>

      {/* Section for adding a new menu */}
      <div className="section">
        <h3>Add Menu</h3>
        <input
          type="text"
          placeholder="Menu Name"
          value={menuName} // Controlled input for menu name
          onChange={(e) => setMenuName(e.target.value)} // Update menu name state
        />
        <button onClick={addMenu}>Add Menu</button> {/* Call addMenu on click */}
      </div>

      {/* Section for adding a new food item */}
      <div className="section">
        <h3>Add Food Item</h3>
        <input
          type="text"
          placeholder="Item Name"
          value={itemName} // Controlled input for item name
          onChange={(e) => setItemName(e.target.value)} // Update item name state
        />
        <input
          type="number"
          placeholder="Item Price"
          value={itemPrice} // Controlled input for item price
          onChange={(e) => setItemPrice(e.target.value)} // Update item price state
        />
        <input
          type="text"
          placeholder="Menu ID"
          value={menuId} // Controlled input for menu ID
          onChange={(e) => setMenuId(e.target.value)} // Update menu ID state
        />
        <button onClick={addFoodItem}>Add Food Item</button> {/* Call addFoodItem on click */}
      </div>

      {/* Section for managing orders */}
      <div className="section">
        <h3>Manage Orders</h3>
        <input
          type="text"
          placeholder="Order ID"
          value={orderId} // Controlled input for order ID
          onChange={(e) => setOrderId(e.target.value)} // Update order ID state
        />
        <button onClick={acceptOrder}>Accept Order</button> {/* Call acceptOrder on click */}
        <button onClick={declineOrder}>Decline Order</button> {/* Call declineOrder on click */}
      </div>

      {/* Section for sending notifications */}
      <div className="section">
        <h3>Send Notification</h3>
        <textarea
          placeholder="Notification Message"
          value={notificationMessage} // Controlled input for notification message
          onChange={(e) => setNotificationMessage(e.target.value)} // Update notification message state
        ></textarea>
        <button onClick={sendNotification}>Send Notification</button> {/* Call sendNotification on click */}
      </div>
    </div>
  );
};

export default ChefDashboard; // Export the component for use in App.js


