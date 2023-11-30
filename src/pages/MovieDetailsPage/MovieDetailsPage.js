import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetailsPage = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch names using the respective ID
    const fetchDataById = async (endpoint, id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/${endpoint}/${id}`);
            const data = await response.json();
            return data.name; // Assuming the response has a 'name' field
        } catch (error) {
            console.error(`Failed to fetch ${endpoint}:`, error);
            return ''; // Return a fallback value
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

    // Initial data fetch
    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/movies/${id}`);
                if (!response.ok) {
                    throw new Error('Error fetching movie');
                }
                const movieData = await response.json();
                return enrichMovieData(movieData);
            } catch (error) {
                console.error('Failed to fetch movie:', error);
                setError(error);
            }
        };

        fetchMovieDetails()
            .then(enrichedMovieData => {
                setMovie(enrichedMovieData);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading movie: {error.message}</p>;
    if (!movie) return <p>No movie found</p>;

    return (
        <div className="movie-details">
            {/* Movie details layout */}
            <h1>{movie.title} ({new Date(movie.releaseYear).getFullYear()})</h1>
            <div className="poster">
                <img src={movie.posterImage} alt={`${movie.title} Poster`} />
            </div>
            <p>{movie.description}</p>
            <div>
                <strong>Genre:</strong> {movie.genres.join(', ')}
            </div>
            <div>
                <strong>Director:</strong> {movie.director}
            </div>
            <div>
                <strong>Cast:</strong> {movie.actors.join(', ')}
            </div>
            <div>
                <strong>Writers:</strong> {movie.writers.join(', ')}
            </div>
            {/* More movie details */}
        </div>
    );
};

export default MovieDetailsPage;
