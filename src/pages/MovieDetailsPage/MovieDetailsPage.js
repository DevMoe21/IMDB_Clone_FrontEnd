import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../FireBase/AuthContext'; 
import './MovieDetailsPage.css';

const MovieDetailsPage = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { currentUser } = useAuth();
    const [userReview, setUserReview] = useState({
        username: '',
        rating: '',
        comment: '',
    });
    const navigate = useNavigate();

    // Fetch names using the respective ID
    const fetchDataById = async (endpoint, id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/${endpoint}/${id}`);
            const data = await response.json();
            console.log(`Data from ${endpoint}:`, data); // Log the data
            return data.name;
        } catch (error) {
            console.error(`Failed to fetch ${endpoint}:`, error);
            return '';
        }
    };
    
    const goToCastAndDirectorPage = () => {
        navigate(`//cast-and-director/${id}`);
    };

    const fetchUserReviews = async (movieId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/reviews/movie/${movieId}`);
            if (!response.ok) {
                throw new Error('Error fetching reviews');
            }
            const reviewsData = await response.json();
            return reviewsData;
        } catch (error) {
            console.error('Failed to fetch reviews:', error);
            return [];
        }
    };

    // Enrich movie data with names
    const enrichMovieData = async (movieData) => {
        const genres = Array.isArray(movieData.genres) ? movieData.genres : [movieData.genres];
        const actors = Array.isArray(movieData.actor) ? movieData.actor : [movieData.actor];
        const writers = Array.isArray(movieData.writer) ? movieData.writer : [movieData.writer];

        const genresData = await Promise.all(genres.map(id => fetchDataById('genres', id)));
        const director = await fetchDataById('directors', movieData.director);
        const actorsData = await Promise.all(actors.map(id => fetchDataById('actors', id)));
        const writersData = await Promise.all(writers.map(id => fetchDataById('writers', id)));

        return { ...movieData, genres: genresData, director, actors: actorsData, writers: writersData };
    };

    const fetchReviewById = async (reviewId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/reviews/${reviewId}`);
            if (!response.ok) {
                throw new Error('Error fetching review');
            }
            return await response.json();
        } catch (error) {
            console.error('Failed to fetch review:', error);
            return null;
        }
    };
    
    useEffect(() => {
        const fetchMovieAndReviews = async () => {
            try {
                const movieRes = await fetch(`http://localhost:5000/api/movies/${id}`);
                if (!movieRes.ok) throw new Error('Failed to fetch movie details');
                let movieData = await movieRes.json();
    
                movieData = await enrichMovieData(movieData);
    
                // Fetch reviews directly if reviewIds are available
                if (movieData.reviews) {
                    const reviews = await fetchUserReviews(id);
                    setMovie({ ...movieData, userReviews: reviews });
                } else {
                    setMovie(movieData);
                }
            } catch (error) {
                console.error(error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchMovieAndReviews();
    }, [id]); 
    

    // Handle user review form submission
    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        if (!userReview.rating || !userReview.comment.trim()) {
            alert("Please fill in both rating and review.");
            return;
        }

        const reviewSubmission = {
            ...userReview,
            movieId: id,
            username: currentUser?.username || 'Anonymous'
        };
        console.log('Submitting Review:', reviewSubmission);

        try {
            const response = await fetch(`http://localhost:5000/api/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reviewSubmission),
            });
    
            if (!response.ok) throw new Error('Error submitting review');
    
            const newReview = await response.json();
            console.log('Received New Review:', newReview); // Check response data
    
            setMovie(prevMovie => {
                const updatedReviews = [newReview, ...(prevMovie.userReviews || [])];
                return { ...prevMovie, userReviews: updatedReviews };
            });
    
            setUserReview({ rating: '', comment: '' });
        } catch (error) {
            console.error('Failed to submit review:', error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading movie: {error.message}</p>;
    if (!movie) return <p>No movie found</p>;

    const renderUserReviews = () => {
    if (!movie.userReviews || movie.userReviews.length === 0) {
        return <p>No user reviews available.</p>;
    }

    return movie.userReviews.map((review, index) => (
        <div key={index} className="user-review">
            <p><strong>User:</strong> {review.username}</p>
            <p><strong>Rating:</strong> {review.rating}/10</p>
            <p><strong>Review:</strong> {review.comment}</p>
        </div>
    ));
};

    return (
        <div className="movie-details">
    <h1>{movie.title} ({new Date(movie.releaseDate).getFullYear()})</h1>

    <div className="top-section">
        <div className="poster">
            <img src={movie.posterImage} alt={`${movie.title} Poster`} />
        </div>

        <div className="trailer">
            <h2>Trailer</h2>
            {movie.trailerUrl ? (
                <iframe
                    key={id}
                    src={`https://www.youtube.com/embed/${movie.trailerUrl}`}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className="movie-trailer"
                ></iframe>
            ) : (
                <p>No trailer available.</p>
            )}
            </div>
        </div>
            <h1>Overview</h1>
            <p>{movie.description}</p>
            <div className="detail-section">
                <strong>Genre:</strong> {movie.genres && movie.genres.join(', ')}
            </div>
            <div className="detail-section">
                <strong>Director:</strong> {movie.director}
            </div>
            <div className="detail-section">
                <strong>Writers:</strong> {movie.writers && movie.writers.join(', ')}
            </div>
            <div className="detail-section">
            <strong>Cast:</strong>
            <div className="cast-list">
                {Array.isArray(movie.actors) ? (
                    // If it's an array, map through the array
                    movie.actors.map((actor, index) => (
                        <span key={index} className="cast-name">{actor}</span>
                    ))
                ) : typeof movie.actors === 'string' ? (
                    // If it's a string, split the string and then map
                    movie.actors.split(', ').map((actor, index) => (
                        <span key={index} className="cast-name">{actor}</span>
                    ))
                ) : null}
            </div>
        </div>
        <button onClick={goToCastAndDirectorPage} className="view-cast-director-btn">
            View Cast and Director
        </button>            
            {/* User Review Section */}
            <div className="user-review-section">
                <h2>User Reviews</h2>
                <div>
                    <form onSubmit={handleReviewSubmit}>
                        <select
                            value={userReview.rating}
                            onChange={(e) => setUserReview({ ...userReview, rating: e.target.value })}
                            required
                            >
                            <option value="">Select Rating</option>
                            <option value="10">10</option>
                            <option value="9">9</option>
                            <option value="8">8</option>
                            <option value="7">7</option>
                            <option value="6">6</option>
                            <option value="5">5</option>
                            <option value="4">4</option>
                            <option value="3">3</option>
                            <option value="2">2</option>
                            <option value="1">1</option>
                        </select>
                        <textarea
                            placeholder="Your Review"
                            value={userReview.comment}
                            onChange={(e) => setUserReview({ ...userReview, comment: e.target.value })}
                            required
                        ></textarea>
                        <button type="submit">Submit Review</button>
                    </form>
                </div>
                <div>
                    {/* Display user reviews */}
                    {movie.userReviews && movie.userReviews.length > 0 ? (
                        movie.userReviews.map((review, index) => (
                            <div key={index} className="user-review">
                                {review.user && (
                                    <>
                                <p><strong>User:</strong> {review.user.username}</p>
                                <p><strong>Rating:</strong> {review.rating}/10</p>
                                <p><strong>Review:</strong> {review.content}</p>
                                </>
                                )}
                                <div>{renderUserReviews()}</div>
                            </div>
                        ))
                    ) : (
                        <p>No user reviews available.</p>
                    )}
                </div>
            </div>
            {/* More movie details */}
        </div>
    );
};
export default MovieDetailsPage;
