import React from 'react';
import { Link } from 'react-router-dom';
import './MovieDetailsPage.css'; // Importing the CSS file
import mockMovieDetails from '../MockDataPage.js'    // Importing the mock data

const MovieDetailsPage = () => {
    const { title, description, releaseDate, genre, director, cast, posters, trailers, reviews } = mockMovieDetails;
    const handleSubmitReview = (event) => {
        event.preventDefault();
        // Logic to submit the review goes here
    };
    
    return (
        <div className="movie-details">
            <h1>{title} ({new Date(releaseDate).getFullYear()})</h1>
            <div className="poster">
                {/* Display the first poster as the main poster */}
                <img src={posters[0]} alt={`${title} Poster`} />
            </div>
            <p>{description}</p>
            <button className="watchlist-button">Add to Watchlist</button>
            <div className="trailer">
                {/* Display the first trailer */}
                <video controls src={trailers[0].link} title={`${title} Trailer`}></video>
            </div>
            <div className="movie-info">
                <p><strong>Genre:</strong> {genre}</p>
                <p><strong>Director:</strong> {director}</p>
                <p><strong>Cast:</strong> {cast.map(actor => `${actor.name} as ${actor.character}`).join(', ')}</p>
            </div>
            <Link to={{
                pathname: "/cast-and-director",
                state: { director: mockMovieDetails.director, cast: mockMovieDetails.cast }
            }}>
                <button className="watchlist-button">View Cast and Director</button>
            </Link>
            <div className="user-review-section">
                <h2>Write a Review</h2>
                <form onSubmit={handleSubmitReview}>
                    <textarea className="review-textarea" placeholder="Your review..."></textarea>
                    <div className="rating-section">
                        <label htmlFor="rating">Rating: </label>
                        <select name="rating" id="rating">
                            {[1, 2, 3, 4, 5].map(number => <option key={number} value={number}>{number}</option>)}
                        </select>
                    </div>
                    <button type="submit" className="submit-review-button">Submit Review</button>
                </form>
            </div>
            <div className="reviews">
                <h2>Reviews</h2>
                {reviews.map(review => (
                    <div key={review.id} className="review">
                        <p><strong>{review.author}:</strong> {review.content} ({review.rating}/5)</p>
                    </div>
                ))}
            </div>
            {/* ... Additional components for adding reviews, other trailers, cast details, etc. */}
        </div>
    );
};

export default MovieDetailsPage;