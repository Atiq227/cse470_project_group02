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
import StaffTypes from './StaffTypes';
import StaffLogin from './StaffLogin';
import StaffSignup from './StaffSignup';
import StaffHome from './staffhome';
import StaffMenu from './staffmenu';
import StaffProfile from './StaffProfile';
import OrderHistory from './OrderHistory';
import StaffLeave from './StaffLeave';
import StaffComplaint from './StaffComplaint';
import StaffTasks from './StaffTasks';
import FavoriteItems from './FavoriteItems';
import FavOrderConfirmation from './favorderConfirmation';
import AdminLogin from './AdminLogin';
import Adminhome from './adminhome';
import FeedbackCheck from './FeedbackCheck';
import CheckComplaint from './CheckComplaint';
import CheckStaffLeave from './CheckStaffLeave';
import ModifyItemPrice from './ModifyItemPrice';
import TotalSales from './TotalSales';
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
                <Route path="/staff-types" element={<StaffTypes />} />
                <Route path="/staff-login" element={<StaffLogin />} />
                <Route path="/staff-signup" element={<StaffSignup />} />
                <Route path="/staffhome" element={<StaffHome />} />
                <Route path="/staffmenu" element={<StaffMenu />} />
                <Route path="/staffprofile" element={<StaffProfile />} />
                <Route path="/orderhistory" element={<OrderHistory />} />
                <Route path="/staffleave" element={<StaffLeave />} />
                <Route path="/staff-complaint" element={<StaffComplaint />} />
                <Route path="/staff-tasks" element={<StaffTasks />} />
                <Route path="/favorites" element={<FavoriteItems />} />
                <Route path="/favorder-confirmation" element={<FavOrderConfirmation />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/admin-home" element={<Adminhome />} />
                <Route path="/feedback" element={<FeedbackCheck />} />
                <Route path="/check-complaint" element={<CheckComplaint />} />
                <Route path="/check-staff-leave" element={<CheckStaffLeave />} />
                <Route path="/modify-item-price" element={<ModifyItemPrice />} />
                <Route path="/total-sales" element={<TotalSales />} />
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
                <Link to="/staff-types">
                    <button className="staff-login">Staff Login</button>
                </Link>
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