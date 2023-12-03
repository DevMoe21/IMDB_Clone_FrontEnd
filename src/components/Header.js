import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import defaultProfilePic from './default-profile-picture.jpg';
import FilmHubLogo from './FilmHubLogo.png';
import { useAuth } from '../FireBase/AuthContext.js';
import { getAuth } from 'firebase/auth';

function Header() {
    const { currentUser } = useAuth();
    const auth = getAuth();

    const [profilePicture, setProfilePicture] = useState(defaultProfilePic);
    const [username, setUsername] = useState('User');

    useEffect(() => {
        if (currentUser && currentUser.email) {
            fetch(`http://localhost:5000/api/users/email/${currentUser.email}`)
                .then(response => response.json())
                .then(data => {
                    setProfilePicture(data.profilePicture || defaultProfilePic);
                    setUsername(data.username || 'User');
                    console.log('Fetched user data:', data); // Debugging log
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        } else {
            console.log('No currentUser found'); // Debugging log
        }
    }, [currentUser]);

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
                            <div className="header-user-info">
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
