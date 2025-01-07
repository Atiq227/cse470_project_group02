import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FeedbackCheck.css';

function FeedbackCheck() {
    const [feedbacks, setFeedbacks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8000/api/feedback')
            .then(response => response.json())
            .then(data => setFeedbacks(data))
            .catch(error => console.error('Error fetching feedback:', error));
    }, []);

    return (
        <div className="feedback-container">
            <h1>Feedback Check</h1>
            <button className="back-button" onClick={() => navigate('/admin-home')}>Back to Admin Home</button>
            <ul className="feedback-list">
                {feedbacks.map((feedback, index) => (
                    <li key={index} className="feedback-item">
                        <p><strong>Customer ID: {feedback.customer_id}</strong></p>
                        <p><strong>Customer Name: {feedback.customer_name}</strong></p>
                        <p>Rating: {feedback.feedback_rating}</p>
                        <p>Comment: {feedback.feedback_comment}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FeedbackCheck;