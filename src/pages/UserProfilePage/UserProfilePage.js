import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../FireBase/AuthContext.js'; // Update this path as necessary
import './UserProfilePage.css';
import defaultProfilePic from '../../components/default-profile-picture.jpg';


function UserProfilePage() {
  const { currentUser, updateUser } = useAuth(); // Using Firebase Auth user
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    // Add other fields as needed
   // Initialize with currentUser data if available
   username: currentUser?.displayName, // or another property based on your setup
   // Add other fields as needed
 });

  const navigate = useNavigate(); // Updated to use navigate

  if (!currentUser) {
    return <div>Loading user data...</div>;
  }

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const goToWatchlist = () => {
    navigate('/watchlist');
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    updateUser(editFormData);
    setIsEditing(false);
  };

  const handleInputChange = (event) => {
    setEditFormData({
      ...editFormData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="user-profile-page">
      <div className="user-profile-container">
        {isEditing ? (
          <form onSubmit={handleFormSubmit} className="edit-form">
            <div className="edit-profile-picture">
              <label htmlFor="profilePicture">Profile Picture:</label>
              <input
                type="text"
                id="profilePicture"
                name="profilePicture"
                value={editFormData.profilePicture}
                onChange={handleInputChange}
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
              src={currentUser.profilePicture || defaultProfilePic}
              alt="Profile"
              className="profile-picture"
            />
            <h1 className="username">{currentUser.username}</h1>
            <p className="gender">{currentUser.gender}</p>
            {/* Display other user details */}
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
            {currentUser.ratings && currentUser.ratings.length > 0 ? (
              currentUser.ratings.map((rating) => (
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
            {currentUser.topPicks && currentUser.topPicks.length > 0 ? (
              currentUser.topPicks.map((pick) => <p key={pick.id}>{pick.movieTitle}</p>)
            ) : (
              <p>No top picks available</p>
            )}
          </section>

          <section className="user-reviews">
            <h2>Recent Reviews</h2>
            {currentUser.reviews && currentUser.reviews.length > 0 ? (
              currentUser.reviews.map((review) => (
                <p key={review.id}>
                  {review.movieTitle}: {review.content}
                </p>
              ))
            ) : (
              <p>No recent reviews available</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage;
