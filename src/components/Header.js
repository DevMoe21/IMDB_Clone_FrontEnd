import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../pages/UserContext.js'; // Adjust the path as necessary
import './Header.css';
import defaultProfilePic from './default-profile-picture.jpg'; // Make sure the path is correct
import FilmHubLogo from './FilmHubLogo.png'; // Update with the correct path
import { useAuth } from '../FireBase/AuthContext.js';
import { getAuth, signOut } from 'firebase/auth';

function Header() {
    const { currentUser } = useAuth();
    const auth = getAuth();

    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
            console.error('Logout Error:', error);
        });
    };

    const getProfilePicture = () => {
        return currentUser && currentUser.profilePicture ? currentUser.profilePicture : defaultProfilePic;
    };

    return (
        <header className="header">
            <div className="header-logo">
            <Link to="/">
                <img src={FilmHubLogo} alt="FilmHub" />
            </Link>
            </div>
            <nav className="header-nav">
                {currentUser ? (
                    <>
                        <Link to="/user-profile" className="nav-link">
                            <img
                                src={getProfilePicture()}
                                alt={`${currentUser.username || 'User'}'s profile`}
                                className="user-avatar"
                            />
                            <span className="user-username">{currentUser.username}</span>
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

