import React from 'react';
import Movie from './Movie';

const MovieList = ({ movie }) => {
    console.log("I am in MovieList", movie);
    
    if (!Array.isArray(movie)) {
        console.error('MovieList received a non-array value for movie:', movie);
        return null; 
    }

    return (
        <ul>
            {movie.map((movie) => (
                <Movie movie={movie} key={movie.id} />
            ))}
        </ul>
    );
};

export default MovieList;
