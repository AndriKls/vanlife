import React from "react"
import { useParams, Link } from "react-router-dom"
import ReviewList from "../../components/ReviewList"
import ReviewForm from "../../components/ReviewForm"
import { useLanguage } from "../../contexts/LanguageContext"

export default function VanDetail() {
    const params = useParams()
    const [van, setVan] = React.useState(null)
    const [showReviewForm, setShowReviewForm] = React.useState(false)
    const [refreshReviews, setRefreshReviews] = React.useState(0)
    const { t } = useLanguage()
        
    React.useEffect(() => {
        fetch(`/api/vans/${params.id}`)
        .then(res => res.json())
        .then(data => setVan(data.vans))
    }, [params.id])

    // Handle adding a new review
    function handleReviewAdded(newReview) {
        // Increment the refresh counter to trigger a re-fetch in ReviewList
        setRefreshReviews(prev => prev + 1)
        setShowReviewForm(false)
    }
        
    return (
        <div className="van-detail-container">
            <Link
                to='..'
                relative="path"
                className="back-button"
            >&larr; <span>{t.backToVans}</span></Link>
            
            {van ? (
                <div className="van-detail">
                    <img src={van.imageUrl} />
                    <i className={`van-type ${van.type} selected`}>{t[van.type]}</i>
                    <h2>{van.name}</h2>
                    <p className="van-price"><span>${van.price}</span>{t.perDay}</p>
                    <p>{van.description}</p>
                    <button className="link-button">{t.rentVan}</button>
                    
                    <div className="reviews-section">
                        <div className="reviews-header">
                            <ReviewList 
                                vanId={params.id} 
                                refreshTrigger={refreshReviews} 
                            />
                            
                            {!showReviewForm ? (
                                <button 
                                    className="write-review-button"
                                    onClick={() => setShowReviewForm(true)}
                                >
                                    {t.writeReview}
                                </button>
                            ) : (
                                <ReviewForm 
                                    vanId={params.id} 
                                    onReviewAdded={handleReviewAdded} 
                                    onCancel={() => setShowReviewForm(false)} 
                                />
                            )}
                        </div>
                    </div>
                </div>
            ) : <h2>Loading...</h2>}
        </div>
    )
}