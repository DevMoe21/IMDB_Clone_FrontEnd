import React, { useState } from 'react';

function AddToWatchlist({ onAddToWatchlist }) {
  const [movieId, setMovieId] = useState('');

  const handleInputChange = (e) => {
    setMovieId(e.target.value);
  };

  const handleAddClick = () => {
    // Call the onAddToWatchlist function with the selected movieId
    onAddToWatchlist(movieId);
    // Clear the input field after adding to watchlist
    setMovieId('');
  };

  return (
    <div>
      <h2>Add to Watchlist</h2>
      <div>
        <input
          type="text"
          placeholder="Enter Movie ID"
          value={movieId}
          onChange={handleInputChange}
        />
        <button onClick={handleAddClick}>Add to Watchlist</button>
      </div>
    </div>
  );
}

export default AddToWatchlist;
