import React, { useEffect, useState } from 'react';
import { useAuth } from '../../FireBase/AuthContext.js';
import './WatchlistPage.css';


const useUser = () => {
    const [user, setUser] = useState(null);
    const { currentUser } = useAuth();
  
    useEffect(() => {
      if (currentUser && currentUser.email) {
        // Fetch user data from MongoDB by email
        fetch(`http://localhost:5000/api/users/email/${currentUser.email}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => setUser(data))
          .catch(error => console.error('Error fetching user data:', error));
      }
    }, [currentUser]);
  
    return user;
  };

const Watchlist = () => {
    const user = useUser();
    const [watchlistMovies, setWatchlistMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && user.email) {
            setLoading(true);
            fetch(`http://localhost:5000/api/UserWatchlist/${user._id}`) // assuming email is the key
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
    }, [user]);

    if (!user) {
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
        const genre = movie.genres || 'Unknown'; // Handle movies without a genre
        acc[genre] = acc[genre] || [];
        acc[genre].push(movie);
        return acc;
    }, {});

    const handleRemoveFromWatchlist = (movieId) => {
        const movie = watchlistMovies.find(movie => movie._id === movieId);
        if (!movie) {
            console.error('Movie not found in watchlist:', movieId);
            return;
        }

        // Remove movie from watchlist
        fetch(`http://localhost:5000/api/UserWatchlist/${user._id}/${movie._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ movieId: movieId }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to remove movie from watchlist');
            }
            return response.json();
        })
        .then(data => {
            console.log('Movie removed from watchlist:', data);
            // Remove movie from state
            setWatchlistMovies(watchlistMovies.filter(movie => movie._id !== movieId));
        })
    };

    return (
        <div className="watchlist">
            <h2>Your Watchlist</h2>
            {Object.entries(moviesByGenre).map(([genres, movies]) => (
                <section key={genres}>
                    <h3>{genres}</h3>
                    <div className="watchlist-genre">
                        {movies.map(movie => (
                            <div key={movie._id} className="watchlist-item">
                                <img src={movie.posterImage} alt={movie.title} className="watchlist-image" />
                                <div className="watchlist-info">
                                    <span className="watchlist-title">{movie.title}</span>
                                    <button onClick={() => handleRemoveFromWatchlist(movie._id)}>Remove</button>
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

