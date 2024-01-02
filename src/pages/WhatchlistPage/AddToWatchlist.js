import React, { useEffect, useState } from 'react';
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

function AddToWatchlist({ movieId }) {
  const user = useUser();
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    // Ensure we have the user and movieId before making the request
    if (user && user._id && movieId) {
      fetch(`http://localhost:5000/api/UserWatchlist/${user._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ movieId: movieId }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add movie to watchlist');
        }
        return response.json();
      })
      .then(data => {
        setStatusMessage('Movie successfully added to watchlist!');
      })
      .catch((error) => {
        console.error('Error:', error);
        setStatusMessage('Failed to add movie to watchlist.');
      });
    }
  }, [user, movieId]);

  return (
    <div>
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
}

export default AddToWatchlist;
