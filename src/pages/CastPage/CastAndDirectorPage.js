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
            return data; // Assuming this returns the object with _id and other details
        } catch (error) {
            console.error(`Failed to fetch ${endpoint}:`, error);
            return null;
        }
    };

    useEffect(() => {
        const fetchCastDirectorAndWriters = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/movies/${id}`);
                if (!res.ok) throw new Error('Failed to fetch movie data');
                const movieData = await res.json();
    
                // Fetch director details
                const directorData = await fetchDataById('directors', movieData.director);
                setDirector(directorData);
                console.log("Director Data:", directorData); // Log director data
    
                // Fetch cast (actors) details
                const castData = await Promise.all(movieData.cast.map(actorId => fetchDataById('actors', actorId)));
                setCast(castData);
                console.log("Cast Data:", castData); // Log cast data
    
                // Fetch writers details
                const writersData = await Promise.all(movieData.writers.map(writerId => fetchDataById('writers', writerId)));
                setWriters(writersData);
                console.log("Writers Data:", writersData); // Log writers data
    
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError(err);
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
                {director && (
                    <>
                        <img src={director.posterImage} alt={director.name} />
                        <p>Director: {director.name}</p>
                        <p>Born: {director.dateOfBirth}</p>
                        <p>Biography: {director.biography}</p>
                    </>
                )}
            </div>
            <div className="cast-container">
                {cast.map((actor, index) => (
                    <div key={index} className="cast-card">
                        <img src={actor.posterImage} alt={actor.name} />
                        <p>{actor.name}</p>
                        <p>Born: {actor.dateOfBirth}</p>
                        <p>Bio: {actor.biography}</p>
                    </div>
                ))}
            </div>
            <div className="writers-container">
                {writers.map((writer, index) => (
                    <div key={index} className="writer-card">
                    <img src={writer.posterImage} alt={writer.name} />
                    <p key={index}>Writer: {writer.name}</p>
                    <p key={index}>Born: {writer.dateOfBirth}</p>
                    <p key={index}>Biography: {writer.biography}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CastAndDirectorPage;
