import { useState, useEffect } from 'react';
import Layout from '../app/layout';
import AddMovie from '../components/AddMovie';
import MovieList from '../components/MovieList';

const MoviePage = () => {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `/api/movies`;
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        setMovies(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    console.error("Error fetching movies:", error);
    return <p>Error fetching movies</p>;
  }

  return (
    <Layout> 
      <main className="flex min-h-screen flex-col justify-between p-24">
        <div>
          <AddMovie />
        </div>
        <div className="overflow-y-auto max-h-[400px]">
          {movies ? <MovieList movie={movies} /> : <p>No movies found</p>}
        </div>
      </main>
    </Layout>
  );
};

export default MoviePage;
