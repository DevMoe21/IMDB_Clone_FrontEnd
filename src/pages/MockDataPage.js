const mockMovieDetails = {
    id: "123",
    title: "Inception",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
    releaseDate: "2010-07-16",
    genre: "Action, Adventure, Sci-Fi",
    director: "Christopher Nolan",
    cast: [
      { name: "Leonardo DiCaprio", character: "Cobb" },
      { name: "Joseph Gordon-Levitt", character: "Arthur" },
      { name: "Elliot Page", character: "Ariadne" }
    ],
    posters: ["path/to/poster1.jpg", "path/to/poster2.jpg"],
    trailers: [
      { id: "trailer1", link: "path/to/trailer1.mp4", title: "Inception Trailer 1" },
      { id: "trailer2", link: "path/to/trailer2.mp4", title: "Inception Trailer 2" }
    ],
    reviews: [
      { id: "review1", author: "Alice", content: "Mind-bending masterpiece!", rating: 5 },
      { id: "review2", author: "Bob", content: "Intriguing and captivating!", rating: 4.5 }
    ]
};

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

export default mockMovieDetails;