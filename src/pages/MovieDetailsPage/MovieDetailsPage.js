import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetailsPage.css';
// Import other necessary components and libraries

function MovieDetailsPage() {
    const { movieId } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Replace with your actual API endpoint
                const response = await fetch(`https://yourapi.com/movies/${movieId}`);
                if (!response.ok) throw new Error('Data not found');
                const data = await response.json();
                setMovieDetails(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovieDetails();
    }, [movieId]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!movieDetails) return <div>No movie details available.</div>;

    return (
        <div className="movie-details-container">
            <img src={movieDetails.poster} alt={movieDetails.title} className="movie-poster" />
            <h1>{movieDetails.title}</h1>
            <p><strong>Release Date:</strong> {movieDetails.releaseDate}</p>
            <p><strong>Rating:</strong> {movieDetails.rating}</p>
            <p><strong>Description:</strong> {movieDetails.description}</p>

            <h2>Trailers</h2>
            {/* Example of mapping through trailers */}
            <div className="movie-trailers">
                {movieDetails.trailers.map(trailer => (
                    <div key={trailer.id}>
                        <iframe
                            src={trailer.link}
                            title={trailer.title}
                            frameborder="0"
                            allowfullscreen
                        ></iframe>
                    </div>
                ))}
            </div>

            <h2>Genres</h2>
            <div className="movie-genres">
                {movieDetails.genres.join(', ')}
            </div>

            <h2>Cast</h2>
            <div className="movie-cast">
                {/* Example of displaying cast members */}
                {movieDetails.cast.map(member => (
                    <div key={member.id} className="cast-member">
                        <img src={member.photo} alt={member.name} />
                        <p>{member.name} as {member.character}</p>
                    </div>
                ))}
            </div>

            <h2>Reviews</h2>
            <div className="movie-reviews">
                {/* Example of displaying and sorting reviews */}
                {movieDetails.reviews.map(review => (
                    <div key={review.id} className="review">
                        <p><strong>{review.author}:</strong> {review.content}</p>
                    </div>
                ))}
            </div>

            {/* Include other movie details as needed */}
        </div>
    );
}

export default MovieDetailsPage;
