import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

export default function ReviewForm({ vanId, onReviewAdded, onCancel }) {
  const [formData, setFormData] = React.useState({
    userName: "",
    rating: 5,
    text: ""
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState(null);
  const { t } = useLanguage();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value, 10) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.userName.trim()) {
      setError(t.enterName);
      return;
    }
    
    if (!formData.text.trim()) {
      setError(t.enterReview);
      return;
    }
    
    try {
      setSubmitting(true);
      setError(null);
      
      const response = await fetch(`/api/vans/${vanId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error(t.errorSubmit);
      }
      
      const data = await response.json();
      console.log("Review submitted successfully:", data);
      
      // Call the callback with the new review data
      onReviewAdded(data.review || data);
      
      // Reset the form
      setFormData({
        userName: "",
        rating: 5,
        text: ""
      });
      
    } catch (err) {
      console.error("Error submitting review:", err);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Function to render star rating input
  const renderStarInput = () => {
    const stars = [];
    for (let i = 5; i >= 1; i--) {
      stars.push(
        <label key={i} className="star-label">
          <input
            type="radio"
            name="rating"
            value={i}
            checked={formData.rating === i}
            onChange={handleChange}
          />
          <span className={`star ${i <= formData.rating ? "filled" : "empty"}`}>★</span>
        </label>
      );
    }
    return stars;
  };

  return (
    <div className="review-form-container">
      <h3>{t.writeReview}</h3>
      
      {error && <p className="error-message">{error}</p>}
      
      <form onSubmit={handleSubmit} className="review-form">
        <div className="form-group">
          <label htmlFor="userName">{t.yourName}</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            placeholder={t.yourName}
            disabled={submitting}
            required
          />
        </div>
        
        <div className="form-group">
          <label>{t.rating}</label>
          <div className="star-rating-input">
            {renderStarInput()}
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="text">{t.yourReview}</label>
          <textarea
            id="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
            placeholder={t.shareFeedback}
            rows={4}
            disabled={submitting}
            required
          />
        </div>
        
        <div className="form-actions">
          <button 
            type="button" 
            className="cancel-button" 
            onClick={onCancel}
            disabled={submitting}
          >
            {t.cancel}
          </button>
          <button 
            type="submit" 
            className="submit-button"
            disabled={submitting}
          >
            {submitting ? t.submitting : t.submitReview}
          </button>
        </div>
      </form>
    </div>
  );
} 