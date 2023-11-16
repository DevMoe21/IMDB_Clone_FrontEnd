import React, { useContext } from 'react';
import { UserContext } from '../UserContext.js';
import './UserProfilePage.css';
import Header from '../../components/Header'; // Import the Header component

function UserProfilePage() {
  const { user } = useContext(UserContext);
  console.log(user);
  // Check if the user exists
  if (!user) {
    return <div>Loading user data...</div>; // Or handle the user not found scenario appropriately
  }

  return (
    <>
      <Header /> {/* Include the Header component */}
      <div className="user-profile-container">
        <div className="user-info">
          <img src={user.profilePicture} alt="Profile" className="profile-picture" />
          <h1>{user.username}</h1>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Date of Birth:</strong> {user.dob}</p>
          <p><strong>Country:</strong> {user.country}</p>
          <p><strong>Joined:</strong> {user.joinDate}</p>
          <button className="edit-profile-btn">Edit Profile</button>
        </div>

        <div className="user-activity">
          <section className="user-ratings">
            <h2>Ratings</h2>
            {/* Map through user's ratings and display them */}
          </section>

          <section className="user-top-picks">
            <h2>Top Picks</h2>
            {/* Map through user's top picks and display them */}
          </section>

          <section className="user-reviews">
            <h2>Recent Reviews</h2>
            {/* Map through user's recent reviews and display them */}
          </section>
        </div>
      </div>
    </>
  );
}

export default UserProfilePage;

