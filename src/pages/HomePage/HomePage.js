import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './HomePage.css';

const dummyMovies = [
  { id: 1, title: "Movie 1", poster: "https://via.placeholder.com/150", smallPoster: "https://via.placeholder.com/100" },
  { id: 2, title: "Movie 2", poster: "https://via.placeholder.com/150", smallPoster: "https://via.placeholder.com/100" },
  // ... more dummy movies
];

// MovieCarousel Component
function MovieCarousel({ movies, onMovieClick }) {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,    // Show one slide at a time
    slidesToScroll: 1,  // Scroll one slide at a time
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      // More breakpoints can be added if needed
    ],
  };

  return (
    <div className="movie-carousel" style={{ marginBottom: '20px' }}>
      <h2>Recently Added Movies</h2>
      <Slider {...carouselSettings}>
        {movies.map((movie) => (
          <div key={movie.id} className="movie" style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}onClick={() => onMovieClick(movie.id)}>
            <img src={movie.poster} alt={movie.title} style={{ width: '100px', height: '150px' }} />
            <h3>{movie.title}</h3>
            {/* Add a button/link to view the trailer */}
          </div>
        ))}
      </Slider>
    </div>
  );
}

// FeaturedToday Component
function FeaturedToday({ featuredMovies }) {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="featured-today">
      <h2>Featured Today</h2>
      <Slider {...carouselSettings}>
        {featuredMovies.map((movie) => (
          <div key={movie.id} className="movie">
            <img src={movie.smallPoster} alt={movie.name} />
            <h3>{movie.name}</h3>
            {/* Add a link to see more about the movie */}
          </div>
        ))}
      </Slider>
    </div>
  );
}

// ComingSoon Component
function ComingSoon({ comingSoonMovies }) {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="coming-soon">
      <h2>Coming Soon</h2>
      <Slider {...carouselSettings}>
        {comingSoonMovies.map((movie) => (
          <div key={movie.id} className="movie">
            <img src={movie.poster} alt={movie.title} />
            <h3>{movie.title}</h3>
            {/* Add a link to the movie detail page */}
          </div>
        ))}
      </Slider>
    </div>
  );
}


// TopBoxOffice Component
function TopBoxOffice({ topMovies }) {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="top-box-office">
      <h2>Top Box Office</h2>
      <Slider {...carouselSettings}>
        {topMovies.map((movie) => (
          <div key={movie.id} className="movie">
            <img src={movie.poster} alt={movie.title} />
            <h3>{movie.title}</h3>
            {/* Additional movie info */}
          </div>
        ))}
      </Slider>
    </div>
  );
}

// HomePage Component
function HomePage() {
  const [searchTerm, setSearchTerm] = useState(''); // Search term state
  const navigate = useNavigate(); // Define the navigate function

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
