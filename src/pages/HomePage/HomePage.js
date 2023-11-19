import React, { useState, useEffect } from 'react';
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

//FeaturedToday Component
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
            <img src={movie.smallPoster} alt={movie.title} />
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

function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [recentlyAddedMovies, setRecentlyAddedMovies] = useState([]);
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [comingSoonMovies, setComingSoonMovies] = useState([]);
  const [topBoxOfficeMovies, setTopBoxOfficeMovies] = useState([]);

  useEffect(() => {
    // Fetch recently added movies
    const fetchRecentlyAddedMovies = async () => {
      try {
        const response = await fetch('/movies'); // Adjust URL as needed
        if (!response.ok) throw new Error('Network response was not ok for recently added movies');
        const data = await response.json();
        setRecentlyAddedMovies(data);
      } catch (error) {
        console.error('There was a problem fetching recently added movies:', error);
      }
    };

    // Fetch featured today movies
    const fetchFeaturedTodayMovies = async () => {
      try {
        const response = await fetch('/api/featuredToday'); // Adjust URL as needed
        if (!response.ok) throw new Error('Network response was not ok for featured today');
        const data = await response.json();
        setFeaturedMovies(data);
      } catch (error) {
        console.error('There was a problem fetching featured today movies:', error);
      }
    };

    // Fetch coming soon movies
    const fetchComingSoonMovies = async () => {
      // Implement similar logic as above

    };

    // Fetch top box office movies
    const fetchTopBoxOfficeMovies = async () => {
      // Implement similar logic as above
    };

    fetchRecentlyAddedMovies();
    fetchFeaturedTodayMovies();
    fetchComingSoonMovies();
    fetchTopBoxOfficeMovies();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMovies = dummyMovies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

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
      <MovieCarousel movies={filteredMovies} onMovieClick={handleMovieClick} /* other props */ />
      <FeaturedToday featuredMovies={featuredMovies} onMovieClick={handleMovieClick}/* other props */ />
      <ComingSoon comingSoonMovies={comingSoonMovies} onMovieClick={handleMovieClick}/* other props */ />
      <TopBoxOffice topMovies={topBoxOfficeMovies} onMovieClick={handleMovieClick}/* other props */ />
    </div>
  );
}

export default HomePage;
