import CardsMovie from "./cardsMovies";
import Slider from "./sliderPortMovies";
import {Movie} from '@/app/types/movieDescription';
import React, { useState, 
  useEffect, 
  useCallback 
} from "react";

import { 
  fetchMoviesByGenre, 
  fetchMoviesByTitle, 
  fetchMoviesByPopularity
} from "@/app/services/movieService";



export default function MoviesList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const genres = [
    { name: "All", id: "" },
    { name: "Adventure", id: "12" },
    { name: "Animation", id: "16" },
    { name: "Comedy", id: "35" },
    { name: "Crime", id: "80" },
    { name: "Documentary", id: "99" },
    { name: "Drama", id: "18" },
    { name: "Family", id: "10751" },
    { name: "Fantasy", id: "14" },
    { name: "History", id: "36" },
    { name: "Horror", id: "27" },
    { name: "Music", id: "10402" },
    { name: "Mystery", id: "9648" },
  ];

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let data: Movie[] = [];
      
      if (searchQuery) {
        const moviesFromApi = await fetchMoviesByTitle(searchQuery);
        data = moviesFromApi.map((movie) => ({
          ...movie,
          id: movie.id ?? 0,
          poster_path: movie.poster_path ?? '',
          genre_ids: movie.genre_ids ?? [],
          release_date: movie.release_date ?? '',
          vote_average: movie.vote_average ?? 0,
        }));
      } else if (selectedGenre !== "All") {
        const genre = genres.find((g) => g.name === selectedGenre);
        if (genre?.id) {
          const moviesFromApi = await fetchMoviesByGenre(genre.id);
          data = moviesFromApi.map((movie) => ({
            ...movie,
            id: movie.id ?? 0,
            poster_path: movie.poster_path ?? '',
            genre_ids: movie.genre_ids ?? [],
            release_date: movie.release_date ?? '',
            vote_average: movie.vote_average ?? 0,
          }));
        }
      } else {
        const moviesFromApi = await fetchMoviesByPopularity();
        data = moviesFromApi.map((movie) => ({
          ...movie,
          id: movie.id ?? 0,
          poster_path: movie.poster_path ?? '',
          genre_ids: movie.genre_ids ?? [],
          release_date: movie.release_date ?? '',
          vote_average: movie.vote_average ?? 0,
        }));
      }

      setMovies(data);
    } catch (error) {
      setError("Failed to load movies. Please try again later.");
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedGenre]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMovies();
    }, 500);

    return () => clearTimeout(timer);
  }, [fetchMovies]);

  return (
    <section>
      {/* Slider */}
      <Slider />

      <div className="flex flex-row h-screen">
        <div className="w-1/6 bg-[#262626] p-4 overflow-y-auto">
          {/* Search */}
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

          {/* Genres */}
          <h2 className="text-white text-xl font-bold mb-4">Genres</h2>
          <ul>
            {genres.map((genre) => (
              <li
                key={genre.name}
                onClick={() => {
                  setSearchQuery(""); // Limpiar búsqueda al cambiar género
                  setSelectedGenre(genre.name);
                }}
                className={`cursor-pointer py-2 px-3 rounded ${
                  selectedGenre === genre.name
                    ? "text-white bg-[#444444]"
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
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {loading ? (
            <div className="text-white">Loading...</div>
          ) : (
            <CardsMovie movies={movies} />
          )}
        </div>
      </div>
    </section>
  );
}
