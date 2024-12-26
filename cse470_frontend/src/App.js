import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Slideshow from './slide';
import './App.css';
import Login from './login'; // Import your Login component
import Signup from './signup'; // Import your Signup component
import LoginOptions from './LoginOptions'; // Import LoginOptions component
import AdminLogin from './AdminLogin';
function App() {
    return (
        <Router>
            <Routes>
                {/* Route for the homepage */}
                <Route path="/" element={<HomePage />} />
                {/* Route for the login page */}
                <Route path="/login" element={<Login />} />
                {/* Route for the signup page */}
                <Route path="/signup" element={<Signup />} />
                {/* Route for the login options page */}
                <Route path="/login-options" element={<LoginOptions />} />
                {/* Route for the admin login options page */}
                <Route path="/admin-login" element={<AdminLogin />} />
            </Routes>
        </Router>
    );
}

// HomePage component: contains the homepage content
function HomePage() {
    const navigate = useNavigate();

    const handleStaffLogin = () => {
        navigate('/login-options'); // Redirect to LoginOptions component
    };

    return (
        <div className="App">
            <header>
                <h1>Welcome to xyz Cafeteria</h1>
                <button className="staff-login" onClick={handleStaffLogin}>Staff Login</button>
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
