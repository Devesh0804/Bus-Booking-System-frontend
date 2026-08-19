import { mockReviews } from '../../data/reviewData'

function Reviews() {
  const averageRating = mockReviews.reduce((sum, review) => sum + review.rating, 0) / mockReviews.length

  return (
    <section className="operator-page-stack">
      <div className="operator-page-header">
        <div>
          <p className="operator-eyebrow">Reviews</p>
          <h1>Passenger Reviews</h1>
        </div>
      </div>
      <div className="operator-status-grid">
        <article><span>Average Rating</span><strong>{averageRating.toFixed(1)} / 5</strong></article>
        <article><span>Total Reviews</span><strong>{mockReviews.length}</strong></article>
      </div>
      <div className="operator-card-grid">
        {mockReviews.map((review) => (
          <article className="operator-item-card" key={review.id}>
            <strong>{review.passenger}</strong>
            <span>{'*'.repeat(review.rating)}</span>
            <p>{review.comment}</p>
            <small>{review.date}</small>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Reviews
