import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CastAndDirectorPage.css';

const CastAndDirectorPage = () => {
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState({ director: null, cast: [], writers: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data by ID
    const fetchDataById = async (endpoint, id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/${endpoint}/${id}`);
            const data = await response.json();
            return data; // Assuming this returns the object with _id and other details
        } catch (error) {
            console.error(`Failed to fetch ${endpoint}:`, error);
            return null;
        }
    };

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/movies/${id}`);
                if (!res.ok) throw new Error('Failed to fetch movie details');
                const data = await res.json();
                setMovieDetails({ director: data.director, cast: data.cast, writers: data.writers });
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError(err);
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading data: {error.message}</p>;

    return (
        <div className="cast-director-page">
            <h1>Director, Cast, and Writers</h1>
            <div className="director-card">
                {movieDetails.director && (
                    <>
                        <img src={movieDetails.director.imagePath} alt={movieDetails.director.name} />
                        <p>Director: {movieDetails.director.name}</p>
                    </>
                )}
            </div>
            <div className="cast-container">
                {movieDetails.cast.map((actor, index) => (
                    <div key={index} className="cast-card">
                        <img src={actor.imagePath} alt={actor.name} />
                        <p>{actor.name} as {actor.character}</p>
                    </div>
                ))}
            </div>
            <div className="writers-container">
                {movieDetails.writers.map((writer, index) => (
                    <p key={index}>Writer: {writer.name}</p>
                ))}
            </div>
        </div>
    );
};

export default CastAndDirectorPage;
