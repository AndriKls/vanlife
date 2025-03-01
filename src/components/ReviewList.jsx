import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

export default function ReviewList({ vanId, refreshTrigger }) {
  const [reviews, setReviews] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const { t } = useLanguage();

  async function fetchReviews() {
    try {
      setLoading(true);
      const response = await fetch(`/api/vans/${vanId}/reviews`);
      if (!response.ok) {
        throw new Error(t.errorFetch);
      }
      const data = await response.json();
      setReviews(data.reviews);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchReviews();
  }, [vanId, refreshTrigger]);

  // Function to render star ratings
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`star ${i <= rating ? "filled" : "empty"}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  // Calculate average rating
  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;

  return (
    <div className="review-list-container">
      <h3>{t.customerReviews}</h3>
      
      {reviews.length > 0 ? (
        <>
          <div className="review-summary">
            <div className="average-rating">
              <span className="rating-number">{calculateAverageRating()}</span>
              <div className="stars">{renderStars(Math.round(calculateAverageRating()))}</div>
            </div>
            <p className="review-count">
              {t.basedOn} {reviews.length} {reviews.length === 1 ? t.review : t.reviews}
            </p>
          </div>

          <div className="reviews">
            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <div className="review-user">{review.userName}</div>
                  <div className="review-date">{review.date}</div>
                </div>
                <div className="review-rating">{renderStars(review.rating)}</div>
                <p className="review-text">{review.text}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="no-reviews">{t.noReviews}</p>
      )}
    </div>
  );
} 