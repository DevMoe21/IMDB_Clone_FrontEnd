import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../pages/UserContext.js'; // Adjust the path as necessary
import './Header.css';
import defaultProfilePic from './default-profile-picture.jpg'; // Make sure the path is correct
import FilmHubLogo from './FilmHubLogo.png'; // Update with the correct path

function Header() {
    const { user } = useContext(UserContext);

    const getProfilePicture = () => {
        return user && user.profilePicture ? user.profilePicture : defaultProfilePic;
    };

    return (
        <header className="header">
            <div className="header-logo">
            <Link to="/">
                <img src={FilmHubLogo} alt="FilmHub" />
            </Link>
            </div>
            <nav className="header-nav">
                {user ? (
                    <>
                        <Link to="/user-profile" className="nav-link">
                            <img
                                src={getProfilePicture()}
                                alt={`${user.username || 'User'}'s profile`}
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
            </nav>
        </header>
    );
}

export default Header;

