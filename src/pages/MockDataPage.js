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

export default mockMovieDetails;