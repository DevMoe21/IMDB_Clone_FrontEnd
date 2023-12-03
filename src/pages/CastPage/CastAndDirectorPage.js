import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CastAndDirectorPage.css';

const CastAndDirectorPage = () => {
    const { id } = useParams();
    const [director, setDirector] = useState(null);
    const [cast, setCast] = useState([]);
    const [writers, setWriters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data by ID
    const fetchDataById = async (endpoint, id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/${endpoint}/${id}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Failed to fetch ${endpoint}:`, error);
            return null;
        }
    };

    const enrichMovieData = async (movieData) => {
        const actors = Array.isArray(movieData.actor) ? movieData.actor : [movieData.actor];
        const writers = Array.isArray(movieData.writer) ? movieData.writer : [movieData.writer];

        const directorData = await fetchDataById('directors', movieData.director);
        const actorsData = await Promise.all(actors.map(id => fetchDataById('actors', id)));
        const writersData = await Promise.all(writers.map(id => fetchDataById('writers', id)));

        return { director: directorData, actors: actorsData, writers: writersData };
    };

    useEffect(() => {
        const fetchCastDirectorAndWriters = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/movies/${id}`);
                if (!res.ok) throw new Error('Failed to fetch movie data');
                const movieData = await res.json();
    
                const enrichedData = await enrichMovieData(movieData);
    
                setDirector(enrichedData.director);
                setCast(enrichedData.actors);
                setWriters(enrichedData.writers);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };
    
        fetchCastDirectorAndWriters();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading data: {error.message}</p>;

    return (
        <div className="cast-director-page">
            <h1>Director, Cast, and Writers</h1>
            <div className="director-card">
                {director ? (
                    <>
                        <img src={director.posterImage} alt={director.name} />
                        <p>Director: {director.name}</p>
                        <p>Born: {new Date(director.dateOfBirth).toLocaleDateString()}</p>
                        <p>Biography: {director.biography}</p>
                    </>
                ) : <p>Director information is not available.</p>}
            </div>
            <div className="cast-container">
                {cast && cast.length > 0 ? (
                cast.map((actor, index) => (
                    <div key={index} className="cast-card">
                    <img src={actor.posterImage || 'default_actor_image.png'} alt={actor.name} />
                    <p>{actor.name}</p>
                    <p>Born: {actor.dateOfBirth ? new Date(actor.dateOfBirth).toLocaleDateString() : 'Unknown'}</p>
                    <p>Bio: {actor.biography || 'Biography not available.'}</p>
                    </div>
                ))
                ) : (
                <p>No cast information available.</p>
                )}
            </div>

            {/* Writers container */}
            <div className="writers-container">
                {writers && writers.length > 0 ? (
                writers.map((writer, index) => (
                    <div key={index} className="writer-card">
                    <img src={writer.posterImage || 'default_writer_image.png'} alt={writer.name} />
                    <p>Writer: {writer.name}</p>
                    <p>Born: {writer.dateOfBirth ? new Date(writer.dateOfBirth).toLocaleDateString() : 'Unknown'}</p>
                    <p>Biography: {writer.biography || 'Biography not available.'}</p>
                    </div>
                ))
                ) : (
                <p>No writers information available.</p>
                )}
            </div>
            </div>
    );
};

export default CastAndDirectorPage;
