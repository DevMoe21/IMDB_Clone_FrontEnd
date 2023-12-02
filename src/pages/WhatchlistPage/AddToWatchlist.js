import React, { useState, useEffect } from 'react';
import { useAuth } from '../../FireBase/AuthContext.js'; // Update the path as necessary

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


function AddToWatchlist({ onAddToWatchlist }) {
  const [movieId, setMovieId] = useState('');
  const user = useUser();

  const handleAddClick = () => {
    // Call the onAddToWatchlist function with the selected movieId
    onAddToWatchlist(movieId);

    // Make a POST request to the /users/:userId/UserWatchlist endpoint
    fetch(`http://localhost:5000/api/UserWatchlist/users/${user._id}/UserWatchlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        movieId: movieId,
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Movie added to watchlist:', data);
      // Clear the input field after adding to watchlist
      setMovieId('');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };
  const handleInputChange = (event) => {
    setMovieId(event.target.value);
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
