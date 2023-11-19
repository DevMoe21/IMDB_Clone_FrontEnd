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
                        {/* <Link to="/user-profile" className="nav-link">Profile</Link> Link to UserProfilePage */}
                        <Link to={`/user/${user.username}`} className="user-info">
                            <img
                                src={user.profilePicture} // Replace with the actual source of the user's profile picture
                                alt={`${user.username}'s profile`}
                                className="user-avatar"
                            />
                            <span className="user-username">{user.username}</span>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/signin" className="nav-link">Sign In</Link>
                        <Link to="/signup" className="nav-link">Sign Up</Link>
                    </>
                )}
                <Link to="/movie" className="nav-link">Movie Details</Link> {/* Mock link to a MovieDetailsPage */}
                <Link to="/user-profile" className="nav-link">User Profile</Link> {/* Button for UserProfilePage */}
            </nav>
        </header>
    );
}

export default Header;

