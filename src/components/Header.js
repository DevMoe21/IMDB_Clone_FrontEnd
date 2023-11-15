// src/components/Header.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../pages/UserContext.js'; // Adjust the path as necessary
import './Header.css';

function Header() {
  const { user } = useContext(UserContext);

  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">FilmHub</Link>
      </div>
      <nav className="header-nav">
        {user ? (
          <>
            <Link to="/user-profile" className="nav-link">Profile</Link>
            {/* Add the user information section */}
            <div className="user-info">
              <img
                src={user.profilePicture} // Replace with the actual source of the user's profile picture
                alt={`${user.username}'s profile`}
                className="user-avatar"
              />
              <span className="user-username">{user.username}</span>
            </div>
          </>
        ) : (
          <>
            <Link to="/signin" className="nav-link">Sign In</Link>
            <Link to="/signup" className="nav-link">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
