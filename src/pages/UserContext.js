import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Initially, no user is logged in
    
    // Simulate a user login
    const loginUser = () => {
        const userData = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            picture: '/path/to/default/profile/picture.jpg', // Default profile picture
            watchlist: [] // Initial empty watchlist
        };
        console.log("Logging in user:", userData);
        setUser(userData);
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

    useEffect(() => {
        loginUser(); // This will set the user data when the provider mounts
    }, []);

    return (
        <UserContext.Provider value={{ user, loginUser, logoutUser, updateUserPicture, addToWatchlist, removeFromWatchlist }}>
            {children}
        </UserContext.Provider>
    );
};

