import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Slideshow from './slide';
import './App.css';
import Login from './login';
import Signup from './signup';
import CustomerHome from './customerhome';
import Menu from './menu';
import OrderConfirmation from './orderConfirmation';
import CustomerProfile from './customerprofile';
import Credit from './credit';
import PreviousOrders from './PreviousOrders';
import CustomerReview from './customerreview';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/customerhome" element={<CustomerHome />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="/customerprofile" element={<CustomerProfile />} />
                <Route path="/credit" element={<Credit />} />
                <Route path="/previous-orders" element={<PreviousOrders />} />
                <Route path="/customer-review" element={<CustomerReview />} />
            </Routes>
        </Router>
    );
}

// HomePage component: contains the homepage content
function HomePage() {
    return (
        <div className="App">
            <header>
                <h1>Welcome to xyz Cafeteria</h1>
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