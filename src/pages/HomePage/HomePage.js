import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import Slider from 'react-slick';
import { useRef} from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './HomePage.css';

const dummyMovies = [
  { id: 1, title: "Movie 1", poster: "https://via.placeholder.com/150", smallPoster: "https://via.placeholder.com/100", rating: 8.5, review: "Great movie!" },
  { id: 2, title: "Movie 2", poster: "https://via.placeholder.com/150", smallPoster: "https://via.placeholder.com/100", rating: 7.3, review: "Enjoyable watch." },
  { id: 3, title: "Movie 3", poster: "https://via.placeholder.com/150", smallPoster: "https://via.placeholder.com/100", rating: 9.1, review: "Must watch!" },
  { id: 4, title: "Movie 4", poster: "https://via.placeholder.com/150", smallPoster: "https://via.placeholder.com/100", rating: 6.5, review: "Not bad." },
  { id: 5, title: "Movie 5", poster: "https://via.placeholder.com/150", smallPoster: "https://via.placeholder.com/100", rating: 8.2, review: "Great movie!" },
  { id: 6, title: "Movie 6", poster: "https://via.placeholder.com/150", smallPoster: "https://via.placeholder.com/100", rating: 7.9, review: "Enjoyable watch." },
  { id: 7, title: "Movie 7", poster: "https://via.placeholder.com/150", smallPoster: "https://via.placeholder.com/100", rating: 9.5, review: "Must watch!" },
  { id: 8, title: "Movie 8", poster: "https://via.placeholder.com/150", smallPoster: "https://via.placeholder.com/100", rating: 6.1, review: "Not bad." },
  { id: 9, title: "Movie 9", poster: "https://via.placeholder.com/150", smallPoster: "https://via.placeholder.com/100", rating: 8.7, review: "Great movie!" },
  { id: 10, title: "Movie 10", poster: "https://via.placeholder.com/150", smallPoster: "https://via.placeholder.com/100", rating: 7.8, review: "Enjoyable watch." },
  // ... more dummy movies
];

// MovieCarousel Component
function MovieCarousel({ movies, onMovieClick, onAddToWatchlist }) {
  // Function to slide to the next movie
  const slideToMovie = (offset) => {
    const carousel = document.querySelector('.carousel-track');
    const currentLeft = carousel.scrollLeft;
    carousel.scrollTo({ left: currentLeft + offset, behavior: 'smooth' });
  };

  return (
    <div className="movie-carousel">
      <h2 className="section-title">Recently Added Movies</h2>
      <div className="carousel-container">
        <div className="carousel-track">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-slide" onClick={() => onMovieClick(movie.id)}>
              <img src={movie.poster} alt={movie.title} className="movie-poster" />
              <div className="movie-info-overlay">
                <h3>{movie.title}</h3>
                <p>Rating: {movie.rating}/10</p>
                <p>Review: {movie.review}</p>
                <button className="addToWatchlist" onClick={(e) => {
                e.stopPropagation(); // Prevents the movie click event
                onAddToWatchlist(movie.id);
              }}>Add to Watchlist</button>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control left" onClick={() => slideToMovie(-window.innerWidth)}>❮</button>
        <button className="carousel-control right" onClick={() => slideToMovie(window.innerWidth)}>❯</button>
      </div>
    </div>
  );
}


// FeaturedToday Component
function FeaturedToday({ featuredMovies, onMovieClick, onAddToWatchlist }) {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({
      left: -200, // Or the width of a movie element
      behavior: 'smooth'
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({
      left: 200, // Or the width of a movie element
      behavior: 'smooth'
    });
  };

  return (
    <div className="featured-today">
      <h2>Featured Today</h2>
      <button className="scroll-button left" onClick={scrollLeft}>&lt;</button>
      <div className="movie-grid" ref={scrollContainerRef}>
        {featuredMovies.map((movie) => (
          <div key={movie.id} className="movie" onClick={() => onMovieClick(movie.id)}>
            <img src={movie.smallPoster} alt={movie.name} />
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>Rating: {movie.rating}/10</p>
              <p>Review: {movie.review}</p>
              <button className="addToWatchlist" onClick={(e) => {
                e.stopPropagation(); // Prevents the movie click event
                onAddToWatchlist(movie.id);
              }}>Add to Watchlist</button>
              </div>
          </div>
        ))}
      </div>
      <button className="scroll-button right" onClick={scrollRight}>&gt;</button>
    </div>
  );
}

// ComingSoon Component
function ComingSoon({ comingSoonMovies, onMovieClick, onAddToWatchlist }) {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({
      left: -200, // Or the width of a movie element
      behavior: 'smooth'
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({
      left: 200, // Or the width of a movie element
      behavior: 'smooth'
    });
  };
  return (
    <div className="coming-soon">
      <h2>Coming Soon</h2>
      <button className="scroll-button left" onClick={scrollLeft}>&lt;</button>
      <div className="movie-grid" ref={scrollContainerRef}>
        {comingSoonMovies.map((movie) => (
          <div key={movie.id} className="movie" onClick={() => onMovieClick(movie.id)}>
            <img src={movie.smallPoster} alt={movie.name} />
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>Rating: {movie.rating}/10</p>
              <p>Review: {movie.review}</p>
              <button className="addToWatchlist" onClick={(e) => {
                e.stopPropagation(); // Prevents the movie click event
                onAddToWatchlist(movie.id);
              }}>Add to Watchlist</button>
              </div>
          </div>
        ))}
      </div>
      <button className="scroll-button right" onClick={scrollRight}>&gt;</button>
    </div>
  );
}


// TopBoxOffice Component
function TopBoxOffice({ topMovies, onMovieClick, onAddToWatchlist }) {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({
      left: -200, // Or the width of a movie element
      behavior: 'smooth'
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({
      left: 200, // Or the width of a movie element
      behavior: 'smooth'
    });
  };

  return (
    <div className="top-box-office">
      <h2>Top Box Office</h2>
      <button className="scroll-button left" onClick={scrollLeft}>&lt;</button>
      <div className="movie-grid" ref={scrollContainerRef}>
        {topMovies.map((movie) => (
          <div key={movie.id} className="movie" onClick={() => onMovieClick(movie.id)}>
            <img src={movie.smallPoster} alt={movie.name} />
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>Rating: {movie.rating}/10</p>
              <p>Review: {movie.review}</p>
              <button className="addToWatchlist" onClick={(e) => {
                e.stopPropagation(); // Prevents the movie click event
                onAddToWatchlist(movie.id);
              }}>Add to Watchlist</button>
              </div>
          </div>
        ))}
      </div>
      <button className="scroll-button right" onClick={scrollRight}>&gt;</button>
    </div>
  );
}

// HomePage Component
function HomePage() {
  const [searchTerm, setSearchTerm] = useState(''); // Search term state
  const navigate = useNavigate(); // Define the navigate function
  
  //const [watchlist, setWatchlist] = useState([]); // State for the watchlist

  // Function to add a movie to the watchlist
  // const addToWatchlist = (movieId) => {
  //   if (!watchlist.includes(movieId)) {
  //     setWatchlist([...watchlist, movieId]);
  //   }
  // };
  
  // Function to update the search term
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter movies based on the search term
  const filteredMovies = dummyMovies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle movie click
  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`); // Navigate to MovieDetailsPage with movieId
  };

  // Mock Data (replace with actual data fetching)
  //const recentlyAddedMovies = dummyMovies; // Populate with movie data
  //const featuredMovies = dummyMovies; // Populate with movie data
  //const comingSoonMovies = dummyMovies; // Populate with movie data
  //const topBoxOfficeMovies =dummyMovies; // Populate with movie data

  return (
    <div className="homepage">
      <div className="title-section">
        <h1>Welcome to the Endless Void of Movies</h1>
        <input 
          type="text" 
          value={searchTerm} 
          onChange={handleSearchChange} 
          placeholder="Search for movies..."
          className="search-input"
        />
      </div>
      <MovieCarousel movies={filteredMovies} onMovieClick={handleMovieClick} />
      <FeaturedToday featuredMovies={filteredMovies} onMovieClick={handleMovieClick} />
      <ComingSoon comingSoonMovies={filteredMovies} onMovieClick={handleMovieClick} />
      <TopBoxOffice topMovies={filteredMovies} onMovieClick={handleMovieClick} />
    </div>
  );
}

export default HomePage;
