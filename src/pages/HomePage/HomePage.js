import React, {  useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
//import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './HomePage.css';
import AddToWatchlist from '../WhatchlistPage/AddToWatchlist';

// MovieCarousel Component
function MovieCarousel({ onMovieClick, onAddToWatchlist }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [autoRotateIndex, setAutoRotateIndex] = useState(0);

  useEffect(() => {
    const rotateMovies = () => {
      if (movies.length > 0) {
        const nextIndex = (autoRotateIndex + 1) % movies.length;
        setSelectedMovieId(movies[nextIndex].tmdbId);
        setAutoRotateIndex(nextIndex);
      }
    };

    const intervalId = setInterval(rotateMovies, 10000); // Rotate every 10 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [movies, autoRotateIndex]);
  
  const isValidYoutubeVideoId = (videoId) => {
    // Check if the videoId is in a valid format (11 characters)
    return /^[a-zA-Z0-9_-]{11}$/.test(videoId);
  };


  // Function to fetch movies
  const fetchMoviesData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/recentlyAddMoives');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseText = await response.text();
      const moviesData = JSON.parse(responseText);
      setMovies(moviesData);
      setIsLoading(false);
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  };

  // Effect for fetching movies
  useEffect(() => {
    fetchMoviesData();
  }, []);

  if (isLoading) {
    return <div>Loading movies...</div>;
  }

  const slideToMovie = (offset) => {
    const carousel = document.querySelector('.carousel-track');
    const currentLeft = carousel.scrollLeft;
    carousel.scrollTo({ left: currentLeft + offset, behavior: 'smooth' });
  };

  const selectMovie = (movieId) => {
    if (movieId === selectedMovieId) return;
    setSelectedMovieId(movieId);
  };

  if (movies.length === 0) {
    return <div>Loading movies...</div>;
  }

  return (
    <div className="movie-carousel">
      <h2 className="section-title">Recently Added Movies</h2>
      <div className="carousel-container">
        <div className="carousel-track"> 
          {movies.map((movie) => (
            <div key={movie._id} className="movie-slide" onClick={() => selectMovie(movie._id)}>
              {selectedMovieId === movie._id && (
                <div className="trailer-container">
                  <iframe
                    key={selectedMovieId}
                    src={`https://www.youtube.com/embed/${movie.trailerUrl}`}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className="movie-trailer"
                  ></iframe>
                  <div className="movie-overlay">
                    <img src={movie.posterImage} alt={movie.title} className="movie-poster-overlay" />
                    <div className="movie-description">{movie.description}</div>
                  </div>
                </div>
              )}
              <img src={movie.posterImage} alt={movie.title} className="movie-poster" />
            </div>
          ))}
        </div>
        <button className="carousel-control left" onClick={() => slideToMovie(-window.innerWidth)}>❮</button>
        <button className="carousel-control right" onClick={() => slideToMovie(window.innerWidth)}>❯</button>
      </div>
    </div>
  );
}

function FeaturedToday({ onMovieClick, onAddToWatchlist }) {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    // Fetch data for FeaturedToday
    const fetchFeaturedTodayData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/featuredToday');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setFeaturedMovies(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchFeaturedTodayData();
  }, []);

  // Rest of the FeaturedToday component remains the same
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
          <div key={movie._id} className="movie" onClick={() => onMovieClick(movie._id)}>
            <img src={movie.posterImage} alt={movie.title} />
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>Rating: {movie.rating}/10</p>
              <button className="addToWatchlist" onClick={(e) => {
                e.stopPropagation(); // Prevents the movie click event
                onAddToWatchlist(movie._id);
              }}>Add to Watchlist</button>
            </div>
          </div>
        ))}
      </div>
      <button className="scroll-button right" onClick={scrollRight}>&gt;</button>
    </div>
  );
}

function ComingSoon({ onMovieClick, onAddToWatchlist }) {
  const [comingSoonMovies, setComingSoonMovies] = useState([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    // Fetch data for ComingSoon
    const fetchComingSoonData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/comingSoon');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setComingSoonMovies(data);
      } catch (error) {
        console.error('Failed to fetch coming soon movies:', error);
      }
    };

    fetchComingSoonData();
  }, []);

  // Rest of the ComingSoon component remains the same
  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({
      left: -200,
      behavior: 'smooth'
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({
      left: 200,
      behavior: 'smooth'
    });
  };

  return (
    <div className="coming-soon">
      <h2>Coming Soon</h2>
      <button className="scroll-button left" onClick={scrollLeft}>&lt;</button>
      <div className="movie-grid" ref={scrollContainerRef}>
        {comingSoonMovies.map((movie) => (
          <div key={movie._id} className="movie" onClick={() => onMovieClick(movie._id)}>
            <img src={movie.posterImage} alt={movie.name} />
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>Rating: {movie.rating}/10</p>
              <button className="addToWatchlist" onClick={(e) => {
                e.stopPropagation();
                onAddToWatchlist(movie._id);
              }}>Add to Watchlist</button>
            </div>
          </div>
        ))}
      </div>
      <button className="scroll-button right" onClick={scrollRight}>&gt;</button>
    </div>
  );
}

function TopBoxOffice({ onMovieClick, onAddToWatchlist }) {
  const [topMovies, setTopMovies] = useState([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    // Fetch data for TopBoxOffice
    const fetchTopBoxOfficeData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/boxOffice');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTopMovies(data);
      } catch (error) {
        console.error('Failed to fetch top box office movies:', error);
      }
    };

    fetchTopBoxOfficeData();
  }, []);

  // Rest of the TopBoxOffice component remains the same
  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({
      left: -200,
      behavior: 'smooth'
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({
      left: 200,
      behavior: 'smooth'
    });
  };

  return (
    <div className="top-box-office">
      <h2>Top Box Office</h2>
      <button className="scroll-button left" onClick={scrollLeft}>&lt;</button>
      <div className="movie-grid" ref={scrollContainerRef}>
        {topMovies.map((movie) => (
          <div key={movie._id} className="movie" onClick={() => onMovieClick(movie._id)}>
            <img src={movie.posterImage} alt={movie.name} />
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>Rating: {movie.rating}/10</p>
              <button className="addToWatchlist" onClick={(e) => {
                e.stopPropagation(); // Prevents the movie click event
                onAddToWatchlist(movie._id);
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
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();
  const [allMovies, setAllMovies] = useState([]);
  const [comingSoonMovies, setComingSoonMovies] = useState([]);
  const [topBoxOfficeMovies, setTopBoxOfficeMovies] = useState([]);
  const [featuredMovies, setFeaturedMovies] = useState([]);

  // Fetch data for allMovies
  useEffect(() => {
    const fetchAllMoviesData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/movies');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched movies:', data);
        // You can process data here
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchAllMoviesData();
  }, []);

  // Rest of the HomePage component remains the same
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredMovies = allMovies.filter(movie => {
    const matchTitle = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === 'All' || movie.genre === selectedCategory;
    return matchTitle && matchCategory;
});

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="homepage">
      <div className="title-section">
        <h1>Welcome to the Endless Void of Movies</h1>
        <div className="search-bar">
          <input 
            type="text" 
            value={searchTerm} 
            onChange={handleSearchChange} 
            placeholder="Search for movies..."
            className="search-input"
          />
          <select onChange={handleCategoryChange} className="category-select">
            <option value="All">All Genres</option>
            <option value="Action">Action</option>
            <option value="Drama">Drama</option>
            <option value="Comedy">Comedy</option>
            <option value="Romance">Romance</option>
            {/* Add more categories as needed */}
          </select>
        </div>
      </div>
      <MovieCarousel onMovieClick={handleMovieClick} onAddToWatchlist={AddToWatchlist} />
      <FeaturedToday featuredMovies={featuredMovies} onMovieClick={handleMovieClick}/* other props */ />
      <ComingSoon comingSoonMovies={comingSoonMovies} onMovieClick={handleMovieClick}/* other props */ />
      <TopBoxOffice topMovies={topBoxOfficeMovies} onMovieClick={handleMovieClick}/* other props */ />
    </div>
  );
}

export default HomePage;
