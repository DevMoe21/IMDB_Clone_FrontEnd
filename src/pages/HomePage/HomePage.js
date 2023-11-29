import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import Slider from 'react-slick';
import { useRef} from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './HomePage.css';

const dummyMovies = [
  {
    id: 1,
    title: "Movie 1",
    poster: "https://via.placeholder.com/150",
    smallPoster: "https://via.placeholder.com/100",
    rating: 8.5,
    review: "Great movie!",
    youtubeId: "s_76M4c4LTo", // YouTube Video ID
    description: "This is a description for Movie 1 it talks aboiut the movie and how it is a great movie. It is a great movie.This is a description for Movie 1 it talks aboiut the movie and how it is a great movie. It is a great movie.This is a description for Movie 1 it talks aboiut the movie and how it is a great movie. It is a great movie.This is a description for Movie 1 it talks aboiut the movie and how it is a great movie. It is a great movie. "
  }
  ,
  {id: 2,
    title: "Movie 2",
    poster: "https://via.placeholder.com/150",
    smallPoster: "https://via.placeholder.com/100",
    rating: 8.5,
    review: "Great movie!",
    youtubeId: "s_76M4c4LTo", // YouTube Video ID
    description: "This is a description for Movie 2."
   }
  
];

// MovieCarousel Component

function MovieCarousel({ onMovieClick, onAddToWatchlist }) {
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('/api/recentlyAddedMovies');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setMovies(data);
        setSelectedMovieId(data[0]?.id); // Set the first movie as selected
      } catch (error) {
        console.error('Error fetching movies:', error);
        // Handle error or show a message to the user
      }
    };

    fetchMovies();
  }, []); // Empty dependency array means this runs once after the component mounts

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
    return <div>Loading movies...</div>; // You can customize this loading state
  }

  return (
    <div className="movie-carousel">
      <h2 className="section-title">Recently Added Movies</h2>
      <div className="carousel-container">
        <div className="carousel-track">
          {movies.map((movie) => (
            <div key={movie.tmdbId} className="movie-slide" onClick={() => selectMovie(movie.tmdbId)}>
              {selectedMovieId === movie.tmdbId && (
                <div className="trailer-container">
                  <iframe
                    key={selectedMovieId}
                    src={`https://www.youtube.com/embed/${movie.trailerUrl}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0`}
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
              <img src={movie.poster} alt={movie.title} className="movie-poster" />
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
function FeaturedToday({ onMovieClick, onAddToWatchlist }) {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/featuredToday') // Replace with your actual backend URL
      .then(response => response.json())
      .then(data => setFeaturedMovies(data))
      .catch(error => console.error('Error:', error));
  }, []); // Empty dependency array ensures this runs once when the component mounts

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
          <div key={movie.tmdbId} className="movie" onClick={() => onMovieClick(movie.tmdbId)}>
            <img src={movie.posterImage} alt={movie.title} />
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>Rating: {movie.rating}/10</p>
              <p>Review: {movie.review}</p>
              <button className="addToWatchlist" onClick={(e) => {
                e.stopPropagation(); // Prevents the movie click event
                onAddToWatchlist(movie.tmdbId);
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
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();
  const [recentlyAddedMovies, setRecentlyAddedMovies] = useState([]);
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [comingSoonMovies, setComingSoonMovies] = useState([]);
  const [topBoxOfficeMovies, setTopBoxOfficeMovies] = useState([]);

  useEffect(() => {
    // Fetch recently added movies
    const fetchRecentlyAddedMovies = async () => {
    };

    // Fetch featured today movies
    const fetchFeaturedTodayMovies = async () => {
    };

    // Fetch coming soon movies
    const fetchComingSoonMovies = async () => {
      // Implement similar logic as above

    };

    // Fetch top box office movies
    const fetchTopBoxOfficeMovies = async () => {
      // Implement similar logic as above
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredMovies = dummyMovies.filter(movie => {
    const matchTitle = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === 'All' || movie.category === selectedCategory;
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
      <MovieCarousel movies={filteredMovies} onMovieClick={handleMovieClick} /* other props */ />
      <FeaturedToday featuredMovies={featuredMovies} onMovieClick={handleMovieClick}/* other props */ />
      <ComingSoon comingSoonMovies={comingSoonMovies} onMovieClick={handleMovieClick}/* other props */ />
      <TopBoxOffice topMovies={topBoxOfficeMovies} onMovieClick={handleMovieClick}/* other props */ />
    </div>
  );
}

export default HomePage;