import React from 'react';
import mockMovieDetails from '../MockDataPage.js' 
import './CastAndDirectorPage.css'; // Import CSS for styling

const CastAndDirectorPage = () => {
    const { director, cast } = mockMovieDetails;

    return (
        <div className="cast-director-page">
            <h1>Director and Cast</h1>
            <div className="director-card">
                <img src="path/to/director_image.jpg" alt={director} />
                <p>{director}</p>
            </div>
            <div className="cast-container">
                {cast.map(actor => (
                    <div key={actor.name} className="cast-card">
                        <img src={`path/to/${actor.name.replace(' ', '_')}_image.jpg`} alt={actor.name} />
                        <p>{actor.name} as {actor.character}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CastAndDirectorPage;
