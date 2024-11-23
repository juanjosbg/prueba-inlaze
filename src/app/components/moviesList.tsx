import React, { useState, useEffect } from "react";
import CardsMovie from "./cardsMovies";
import { fetchMoviesByGenre, fetchMoviesByTitle, fetchMoviesByPopularity } from "@/app/services/movieService";

export default function MoviesList() {
  const [movies, setMovies] = useState<any[]>([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const genres = [
    { name: "All", id: null },
    { name: "Adventure", id: 12 },
    { name: "Animation", id: 16 },
    { name: "Comedy", id: 35 },
    { name: "Crime", id: 80 },
    { name: "Documentary", id: 99 },
    { name: "Drama", id: 18 },
    { name: "Family", id: 10751 },
    { name: "Fantasy", id: 14 },
    { name: "History", id: 36 },
    { name: "Horror", id: 27 },
    { name: "Music", id: 10402 },
    { name: "Mystery", id: 9648 },
  ];

  const fetchMovies = async () => {
    setLoading(true);
    try {
      let data = [];
      if (searchQuery) {
        data = await fetchMoviesByTitle(searchQuery);
      } else if (selectedGenre !== "All") {
        const genre = genres.find((g) => g.name === selectedGenre);
        if (genre?.id) {
          data = await fetchMoviesByGenre(genre.id);
        }
      } else {
        data = await fetchMoviesByPopularity();
      }
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [selectedGenre, searchQuery]);

  return (
    <section className="flex flex-row h-screen">
      <div className="w-1/6 bg-[#262626] p-4 overflow-y-auto">
        <div className="mb-4">
          <label className="text-xl font-bold text-white">Search</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title..."
            className="w-full p-2 mt-2 rounded bg-gray-800 text-white"
          />
        </div>

        <h2 className="text-white text-xl font-bold mb-4">Genres</h2>
        <ul>
          {genres.map((genre) => (
            <li
              key={genre.name}
              onClick={() => {
                setSearchQuery("");
                setSelectedGenre(genre.name);
              }}
              className={`cursor-pointer py-2 px-3 rounded ${
                selectedGenre === genre.name
                  ? "text-white"
                  : "text-gray-400 hover:bg-[#181818] hover:text-white"
              }`}
            >
              {genre.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 bg-[#444444] p-6 overflow-y-auto">
        <h2 className="text-white text-xl font-bold mb-4">Movies</h2>
        {loading ? (
          <div className="text-white">Loading...</div>
        ) : (
          <CardsMovie movies={movies} />
        )}
      </div>
    </section>
  );
}
