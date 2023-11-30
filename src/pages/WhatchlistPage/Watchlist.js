import React from 'react';
import { useAuth } from '../../FireBase/AuthContext.js'; // Update this path as necessary
import './WatchlistPage.css';
import mockMovieDetails from '../MockDataPage.js';


const Watchlist = () => {
    const { currentUser, removeFromWatchlist } = useAuth();

    if (!currentUser) return <div>Please log in</div>;

    // Ensure moviesToDisplay is always an array
    const moviesToDisplay = Array.isArray(currentUser.watchlist) && currentUser.watchlist.length > 0
        ? currentUser.watchlist
        : [mockMovieDetails]; // Wrap mockMovieDetails in an array

    // Group movies by genre
    const moviesByGenre = moviesToDisplay.reduce((acc, movie) => {
        const genre = movie.genre || 'Unknown'; // Handle movies without a genre
        acc[genre] = acc[genre] || [];
        acc[genre].push(movie);
        return acc;
    }, {});

    if (!Array.isArray(moviesToDisplay)) {
        console.error('moviesToDisplay is not an array', moviesToDisplay);
        return <div>Error loading movies</div>;
    }

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
                                    <button onClick={() => removeFromWatchlist(movie.id)}>Remove</button>
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
