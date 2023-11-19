import React, { useContext } from 'react';
import { UserContext } from '../UserContext';


const Watchlist = () => {
    const { user, removeFromWatchlist } = useContext(UserContext);

    if (!user) return <div>Please log in</div>;

    return (
        <div className="watchlist">
            <h2>Your Watchlist</h2>
            {user.watchlist.map(movie => (
                <div key={movie.id} className="watchlist-item">
                    <span className="watchlist-title">{movie.title}</span>
                    <button onClick={() => removeFromWatchlist(movie.id)}>Remove</button>
                </div>
            ))}
        </div>
    );
};

export default Watchlist;
