import React, { useEffect, useState } from 'react';
import { useAuth } from '../../FireBase/AuthContext.js';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
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
    const navigate = useNavigate();

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

    const handleMovieClick = (movieId) => {
        navigate(`/movie/${movieId}`); // Navigate to MovieDetailPage
    };

    // Group movies by genre
    const moviesByGenre = watchlistMovies.reduce((acc, movie) => {
        const genre = movie.genres || 'Unknown'; // Handle movies without a genre
        acc[genre] = acc[genre] || [];
        acc[genre].push(movie);
        return acc;
    }, {});

    const handleRemoveFromWatchlist = (event, movieId) => {
        event.stopPropagation(); // Prevent event from bubbling up to the parent
    
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

    const handleAddToTopPicks = async (movieId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/UserTopPicks/${user._id}`, {
                method: 'POST', // or PUT if you create a specific endpoint for adding a movie
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ movieId })
            });

            if (!response.ok) {
                throw new Error('Failed to add movie to top picks');
            }
            // Optionally, refresh top picks in the UI or display a success message
        } catch (error) {
            console.error('Error adding movie to top picks:', error);
            // Optionally, display an error message to the user
        }
    };

     return (
        <div className="watchlist">
            <h2>Your Watchlist</h2>
            <div className="watchlist-movies">
                {watchlistMovies.map(movie => (
                    <div key={movie._id} className="watchlist-item" onClick={() => handleMovieClick(movie._id)}>
                        <img src={movie.posterImage} alt={movie.title} className="watchlist-image" />
                        <div className="watchlist-info">
                            <span className="watchlist-title">{movie.title}</span>
                            <button onClick={(e) => {e.stopPropagation(); handleRemoveFromWatchlist(movie._id);}}>Remove</button>
                            <button onClick={(e) => {e.stopPropagation(); handleAddToTopPicks(movie._id);}}>Add to Top Picks</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Watchlist;

