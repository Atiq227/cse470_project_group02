import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CustomerReview.css';

const CustomerReview = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { orderId } = location.state || {};
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { customerId, customerName, contactNumber, email, credit } = location.state || {};

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Validation
        if (!orderId) {
            setError('Invalid order ID');
            setIsLoading(false);
            return;
        }

        if (rating === 0) {
            setError('Please select a rating');
            setIsLoading(false);
            return;
        }

        if (!comment.trim()) {
            setError('Please provide feedback');
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/submit-review', {
                order_id: orderId,
                rating: rating,
                comment: comment
            });

            if (response.data.status === 'success') {
                alert('Review submitted successfully!');
                navigate('/customerhome', { state: { customerName, customerId, contactNumber, email, credit } });
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            setError(error.response?.data?.message || 'Failed to submit review. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="customer-review">
            <h1>Submit Your Review</h1>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="rating-container">
                    <h3>Rate your experience:</h3>
                    <div className="stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`star ${star <= rating ? 'active' : ''}`}
                                onClick={() => setRating(star)}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                </div>
                <div className="comment-container">
                    <h3>Your feedback:</h3>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your experience..."
                        rows="4"
                        required
                    />
                </div>
                <button 
                    type="submit" 
                    className="submit-button"
                    disabled={isLoading}
                >
                    {isLoading ? 'Submitting...' : 'Submit Review'}
                </button>
            </form>
        </div>
    );
};

export default CustomerReview;