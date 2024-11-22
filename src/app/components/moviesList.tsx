import React, { useState, useEffect } from "react";
import CardsMovie from "./cardsMovies";
import { fetchMoviesByPopularity } from "@/app/services/movieService";

export default function MoviesList() {
  const [movies, setMovies] = useState<any[]>([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [loading, setLoading] = useState(true);

  const generes = [
    "All",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Music",
    "Mystery",
  ];

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const data = await fetchMoviesByPopularity();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [selectedGenre]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="flex flex-row h-screen">
      <div className="w-1/6 bg-[#262626] p-4 overflow-y-auto">
      <div className="mt-2">
          <label className="text-xl font-bold">Search</label>
          <div className="bg-white dark:bg-[#262626] relative pointer-events-auto py-1 mb-7">
            <button type="button" className="hidden w-full lg:flex items-center text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700">
              <svg width="24" height="24" fill="none" aria-hidden="true" className="mr-3 flex-none">
                <path d="m19 19-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></circle>
              </svg>Quick search...
              <span className="ml-auto pl-3 flex-none text-xs font-semibold">Ctrl K</span>
            </button>
          </div>
        </div>

        <h2 className="text-white text-xl font-bold mb-4">Generes</h2>
        <ul>
          {generes.map((genre) => (
            <li
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`cursor-pointer py-2 px-3 rounded
                ${selectedGenre === genre ? "text-white" : "text-gray-400 hover:bg-[#181818] hover:text-white"}`}
              >
              {genre}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 bg-[#444444] p-6 overflow-y-auto">
        <h2 className="text-white text-xl font-bold mb-4">Popular</h2>
        <CardsMovie movies={movies} />
      </div>
    </section>
  );
}
