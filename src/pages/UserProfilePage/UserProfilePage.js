import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../FireBase/AuthContext.js';
import './UserProfilePage.css';
import defaultProfilePic from '../../components/default-profile-picture.jpg';
import { getAuth, signOut } from 'firebase/auth';

const useUser = () => {
    const [user, setUser] = useState(null);
    const { currentUser } = useAuth();

    useEffect(() => {
        if (currentUser && currentUser.email) {
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

function UserProfilePage() {
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const user = useUser();
    const [editFormData, setEditFormData] = useState({ username: '', gender: '' });
    const auth = getAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setUserData(user);
            setEditFormData({ username: user.username, gender: user.gender });
            fetch(`http://localhost:5000/api/UserTopPicks/${user._id}`)
                .then(response => response.json())
                .then(data => {
                    if (data && data.movies) {
                        setUserData({...userData, topPicks: data.movies});
                    }
                })
                .catch(error => console.error('Error fetching top picks:', error));
        }
    }, [user]);

    const formatDate = (dateString) => {
        let date = new Date(dateString);
        return !isNaN(date) ? date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'Unknown';
    };

    if (!userData) {
        return <div>Loading user data...</div>;
    }

    const handleEditProfile = () => setIsEditing(true);
    const goToWatchlist = () => navigate('/watchlist');

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await fetch(`http://localhost:5000/api/users/${user._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editFormData)
        });

        if (!response.ok) {
            throw new Error('Failed to update user data');
        }

        const updatedUser = await response.json();
        setUserData(updatedUser); // Update state with new data
        setIsEditing(false);

        // If you are using a context or global state, update it here as well
        // For example: updateUserContext(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
    }
};


  const handleInputChange = (event) => {
    setEditFormData({
      ...editFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/signin'); // Redirect to sign-in page after logout
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  const handleChangeProfilePicture = (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append('profilePicture', file);
  
    updateProfilePicture(formData);
  };

  const updateHeaderInfo = (newProfilePicture, newUsername) => {
    // Here, you can update the header directly
    // For simplicity, you can access the header elements by their IDs (assuming they have IDs)
    const profilePictureElement = document.getElementById('header-profile-picture');
    const usernameElement = document.getElementById('header-username');

    if (profilePictureElement) {
        profilePictureElement.src = newProfilePicture;
    }

    if (usernameElement) {
        usernameElement.textContent = newUsername;
    }
};
  
  const updateProfilePicture = async (formData) => {
    try {
      await fetch(`http://localhost:5000/api/users/${user._id}/profile-picture`, {
        method: 'POST',
        body: formData // No need to set Content-Type header
      });
      // Handle successful update
      updateHeaderInfo(formData.get('profilePicture'), user.username);
    } catch (error) {
        console.error('Error updating profile picture:', error);
    }
  };

    const renderTopPicks = () => {
      return userData.topPicks && userData.topPicks.length > 0 ? (
          userData.topPicks.map((movie, index) => (
              <div key={index} className="top-pick-item">
                  <img src={movie.posterImage} alt={movie.title} className="top-pick-image" />
                  <div className="top-pick-info">
                      <h4>{movie.title}</h4>
                      {/* Other movie info if needed */}
                  </div>
              </div>
          ))
      ) : <p>No top picks available</p>;
  };

  return (
    <div className="user-profile-page">
      <div className="user-profile-container">
        {isEditing ? (
          <form onSubmit={handleFormSubmit} className="edit-form">
            <div className="edit-profile-picture">
              <label htmlFor="profilePicture">Profile Picture:</label>
              <input
                type="file"
                id="profilePicture"
                name="profilePicture"
                onChange={handleChangeProfilePicture}
                accept='image/*'
              />
            </div>
            <div className="edit-username">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={editFormData.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="edit-gender">
              <label htmlFor="gender">Gender:</label>
              <input
                type="text"
                id="gender"
                name="gender"
                value={editFormData.gender}
                onChange={handleInputChange}
              />
            </div>
            {/* Add other fields for editing */}
            <button type="submit" className="btn save-btn">
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="btn cancel-btn"
            >
              Cancel
            </button>
          </form>
        ) : (
          <div className="user-info">
            <img
              src={user.profilePicture || defaultProfilePic}
              alt="Profile"
              className="profile-picture"
              onClick={handleChangeProfilePicture}
            />
            <h1 className="username">{user.username || 'Anonymous'}</h1>
            <p className="gender">{user.gender}</p>
            <p className="dob">Date of Birth: {user.dateOfBirth}</p>
            <p className="country">Country: {user.country}</p>
            <p className="join-date">Joined: {formatDate(user.accountCreationDate)}</p>
            <div className="button-group">
              <button className="btn edit-profile-btn" onClick={handleEditProfile}>
                Edit Profile
              </button>
              <button className="btn watchlist-btn" onClick={goToWatchlist}>
                View Watchlist
              </button>
            </div>
          </div>
        )}

        <div className="user-activity">
          <section className="user-ratings">
            <h2>Ratings</h2>
            {user.ratings && user.ratings.length > 0 ? (
              user.ratings.map((rating) => (
                <p key={rating.id}>
                  {rating.movieTitle}: {rating.score}/5
                </p>
              ))
            ) : (
              <p>No ratings available</p>
            )}
          </section>

          <section className="user-top-picks">
            <h2>Top Picks</h2>
             <div className="top-picks-container">
                    {renderTopPicks()}
                </div>
          </section>

          <section className="user-reviews">
            <h2>Recent Reviews</h2>
            {user.reviews && user.reviews.length > 0 ? (
              user.reviews.map((review) => (
                <p key={review.id}>
                  {review.movieTitle}: {review.content}
                </p>
              ))
            ) : (
              <p>No recent reviews available</p>
            )}
          </section>
          <button className="btn logout-btn" onClick={handleLogout}>
                Logout
              </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage;
