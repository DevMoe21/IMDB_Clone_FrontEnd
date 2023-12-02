import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CastAndDirectorPage.css';

const CastAndDirectorPage = () => {
    const { id } = useParams();
    const [castAndDirector, setCastAndDirector] = useState({ director: '', cast: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCastAndDirector = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/movies/${id}`);
                if (!res.ok) throw new Error('Failed to fetch cast and director');
                const data = await res.json();
                setCastAndDirector({ director: data.director, cast: data.cast });
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError(err);
                setLoading(false);
            }
        };

        fetchCastAndDirector();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading data: {error.message}</p>;

    return (
        <div className="cast-director-page">
            <h1>Director and Cast</h1>
            <div className="director-card">
                {/* Assuming director data contains name and image path */}
                <img src={castAndDirector.director.imagePath} alt={castAndDirector.director.name} />
                <p>{castAndDirector.director.name}</p>
            </div>
            <div className="cast-container">
                {castAndDirector.cast.map(actor => (
                    <div key={actor.name} className="cast-card">
                        <img src={actor.imagePath} alt={actor.name} />
                        <p>{actor.name} as {actor.character}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CastAndDirectorPage;
