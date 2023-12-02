import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../FireBase/AuthContext.js';
import './UserProfilePage.css';
import defaultProfilePic from '../../components/default-profile-picture.jpg';
import { getAuth, signOut } from 'firebase/auth';

function UserProfilePage() {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null); // State to store fetched user data
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    username: '',
    gender: '',
    // Initialize other fields as needed
  });

  
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${currentUser.uid}`);
        const data = await response.json();
        setUserData(data); // Set fetched data to state
        setEditFormData({ // Initialize form data with fetched data
          username: data.username,
          gender: data.gender,
          // Initialize other fields as needed
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (currentUser) {
      fetchUserData();
    }
  }, [currentUser]);


  const formatDate = (dateString) => {
    let date;
    if (dateString?.toDate) { // Check if it's a Firebase Timestamp
      date = dateString.toDate();
    } else if (typeof dateString === 'string' || dateString instanceof String) {
      date = new Date(dateString); // Parse date string
    }
  
    if (!isNaN(date)) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    } else {
      return 'Unknown'; // Or any default text
    }
  };

  if (!userData) {
    return <div>Loading user data...</div>;
  }

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const goToWatchlist = () => {
    navigate('/watchlist');
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/users/${currentUser.uid}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editFormData)
      });
      const updatedUser = await response.json();
      setUserData(updatedUser); // Update state with new data
      setIsEditing(false);
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

  const handleChangeProfilePicture = () => {


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
              src={currentUser.profilePicture || defaultProfilePic}
              alt="Profile"
              className="profile-picture"
              onClick={handleChangeProfilePicture}
            />
            <h1 className="username">{currentUser.username || 'Anonymous'}</h1>
            <p className="gender">{currentUser.gender}</p>
            <p className="dob">Date of Birth: {currentUser.dob}</p>
            <p className="country">Country: {currentUser.country}</p>
            <p className="join-date">Joined: {formatDate(currentUser.joinDate)}</p>
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
          <button className="btn logout-btn" onClick={handleLogout}>
                Logout
              </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage;
