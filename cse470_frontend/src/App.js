import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Slideshow from './slide'; // Ensure this is your slideshow component
import './App.css';
import Login from './login'; // Ensure correct path to your Login component
import Signup from './signup'; // Ensure correct path to your Signup component
import ChefDashboard from './components/ChefDashboard'; // Corrected import for ChefDashboard
import api from './api'; // Ensure correct path to your API file

function App() {
    useEffect(() => {
        // Example API call to fetch data
        api.get('/food-items')
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the food items!', error);
            });
    }, []);

    return (
        <Router>
            <Routes>
                {/* Route for the homepage */}
                <Route path="/" element={<HomePage />} />
                {/* Route for the login page */}
                <Route path="/login" element={<Login />} />
                {/* Route for the signup page */}
                <Route path="/signup" element={<Signup />} />
                {/* Route for the chef dashboard */}
                <Route path="/chef-dashboard" element={<ChefDashboard />} />
            </Routes>
        </Router>
    );
}

// HomePage component: contains the homepage content
function HomePage() {
    return (
        <div className="App">
            <header>
                <h1>Welcome to XYZ Cafeteria</h1>
                <button className="staff-login">Staff Login</button>
            </header>
            <Slideshow />
            <h1>
                <Link to="/login">
                    <button>Want to order something?</button>
                </Link>
            </h1>
        </div>
    );
}

export default App;
