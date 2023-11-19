import React from 'react';
import { Link } from 'react-router-dom';
import './MovieDetailsPage.css'; // Importing the CSS file
import mockMovieDetails from '../MockDataPage.js'    // Importing the mock data

const MovieDetailsPage = () => {
    const { title, description, releaseDate, genre, director, cast, posters, trailers, reviews } = mockMovieDetails;

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