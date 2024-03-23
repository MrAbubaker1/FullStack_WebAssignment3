import AddMovie from "./components/AddMovie";
import MovieList from "./components/MovieList";

async function getData() {
  const res = await fetch('http://localhost:3000/api/movies', { cache: "no-cache" });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const page = async () => {
  try {
    const movies = await getData();
    console.log(movies);

    return (
      <main className="flex min-h-screen flex-col justify-between p-24">
        <AddMovie />
        {Array.isArray(movies) ? <MovieList movie={movies} /> : <p>No movies found</p>}
      </main>
    );
  } catch (error) {
    console.error("Error fetching movies:", error);
    return <p>Error fetching movies</p>;
  }
}

export default page;
