import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import defaultProfilePic from './default-profile-picture.jpg';
import FilmHubLogo from './FilmHubLogo.png';
import { useAuth } from '../FireBase/AuthContext.js';
import { getAuth, signOut } from 'firebase/auth';

function Header() {
    const { currentUser } = useAuth();
    const auth = getAuth();

    const [profilePicture, setProfilePicture] = useState(currentUser?.profilePicture || defaultProfilePic);
    const [username, setUsername] = useState(currentUser?.username || 'User');

    const updateHeaderInfo = (newProfilePicture, newUsername) => {
        setProfilePicture(newProfilePicture);
        setUsername(newUsername);
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
                            <div className="user-info">
                                <img
                                    src={profilePicture}
                                    alt={`${username}'s profile`}
                                    className="user-avatar"
                                />
                                <span className="user-username">{username}</span>
                            </div>
                        </Link>
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
