import React, { createContext, useState } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Initially, no user is logged in

    // Simulate a user login
    const loginUser = () => {
        setUser({
            name: 'John Doe',
            email: 'johndoe@example.com',
            picture: '/path/to/default/profile/picture.jpg', // Default profile picture
            watchlist: [] // Initial empty watchlist
        });
    };

    // Simulate a user logout
    const logoutUser = () => {
        setUser(null);
    };

    // Update user profile picture
    const updateUserPicture = (newPicture) => {
        setUser(prevUser => ({ ...prevUser, picture: newPicture }));
    };

    // Add a movie to the watchlist
    const addToWatchlist = (movie) => {
        setUser(prevUser => ({ ...prevUser, watchlist: [...prevUser.watchlist, movie] }));
    };

    // Remove a movie from the watchlist
    const removeFromWatchlist = (movieId) => {
        setUser(prevUser => ({
            ...prevUser,
            watchlist: prevUser.watchlist.filter(movie => movie.id !== movieId)
        }));
    };

    return (
        <UserContext.Provider value={{ user, loginUser, logoutUser, updateUserPicture, addToWatchlist, removeFromWatchlist }}>
            {children}
        </UserContext.Provider>
    );
};

