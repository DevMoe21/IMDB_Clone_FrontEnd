import React, { useEffect, useState } from 'react';
import { useAuth } from '../../FireBase/AuthContext.js';
import './WatchlistPage.css';

const Watchlist = () => {
    const { currentUser,removeFromWatchlist } = useAuth();
    const [watchlistMovies, setWatchlistMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (currentUser && currentUser.email) {
            setLoading(true);
            fetch(`http://localhost:5000/api/userWatchlist/${currentUser.email}`) // assuming email is the key
                .then(response => response.json())
                .then(data => {
                    if (data && Array.isArray(data.movies)) {
                        setWatchlistMovies(data.movies);
                    } else {
                        console.error('Watchlist data is not in expected format:', data);
                        setWatchlistMovies([]);
                    }
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching watchlist:', error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [currentUser]);

    if (!currentUser) {
        return <div>Please log in</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (watchlistMovies.length === 0) {
        return <div>Your watchlist is empty.</div>;
    }

    // Group movies by genre
    const moviesByGenre = watchlistMovies.reduce((acc, movie) => {
        const genre = movie.genre || 'Unknown'; // Handle movies without a genre
        acc[genre] = acc[genre] || [];
        acc[genre].push(movie);
        return acc;
    }, {});

    const handleRemoveFromWatchlist = (movieId) => {
        removeFromWatchlist(movieId);
        setWatchlistMovies(watchlistMovies.filter(movie => movie.id !== movieId));
    };

    return (
        <div className="watchlist">
            <h2>Your Watchlist</h2>
            {Object.entries(moviesByGenre).map(([genre, movies]) => (
                <section key={genre}>
                    <h3>{genre}</h3>
                    <div className="watchlist-genre">
                        {movies.map(movie => (
                            <div key={movie.id} className="watchlist-item">
                                <img src={movie.poster} alt={movie.title} className="watchlist-image" />
                                <div className="watchlist-info">
                                    <span className="watchlist-title">{movie.title}</span>
                                    <button onClick={() => handleRemoveFromWatchlist(movie.id)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default Watchlist;

