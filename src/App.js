import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieDetailsPage from './pages/MovieDetailsPage/MovieDetailsPage.js';
import { UserProvider } from './pages/UserContext.js';
import UserProfilePage from './pages/UserProfilePage/UserProfilePage.js';
import HomePage from './pages/HomePage/HomePage.js';
import SignInPage from './pages/SignInPage/SignInPage.js';
import SignUpPage from './pages/SignUpPage/SignUpPage.js';
import Header from './components/Header';
import Footer from './components/Footer';
import CastAndDirectorPage from './pages/CastPage/CastAndDirectorPage.js';
import Watchlist from './pages/WhatchlistPage/Watchlist.js';

function App() {
  return (
    <UserProvider> {/* Wrap your components with UserProvider */}
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie" element={<MovieDetailsPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/user-profile" element={<UserProfilePage/>} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/cast-and-director" element={<CastAndDirectorPage/>}/>
        </Routes>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
