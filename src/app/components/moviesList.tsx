import React, { useState } from "react";
import CardsMovie from "./cardsMovies";

export default function MoviesList() {
  const [selectedGenere, setselectedGenere] = useState("All");

  const movies = [
    { title: "Shrek 5", date: "August 1, 2024", rating: 75, image: "/shrek.jpg", genre: "Animation" },
    { title: "Gladiator II", date: "August 16, 2024", rating: 60, image: "/gladiator.jpg", genre: "Action" },
    { title: "One Fast Move", date: "August 8, 2024", rating: 85, image: "/one-fast-move.jpg", genre: "Action" },
    { title: "The Wild Robot", date: "August 2, 2024", rating: 50, image: "/wild-robot.jpg", genre: "Family" },
    { title: "Deadpool Wolverine", date: "August 5, 2024", rating: 95, image: "/deadpool.jpg", genre: "Action" },
    { title: "The Wild Robot", date: "August 2, 2024", rating: 50, image: "/wild-robot.jpg", genre: "Family" },
    { title: "Deadpool Wolverine", date: "August 5, 2024", rating: 95, image: "/deadpool.jpg", genre: "Action" },
    { title: "Deadpool Wolverine", date: "August 5, 2024", rating: 95, image: "/deadpool.jpg", genre: "Action" },
    { title: "The Wild Robot", date: "August 2, 2024", rating: 50, image: "/wild-robot.jpg", genre: "Family" },
    { title: "Deadpool Wolverine", date: "August 5, 2024", rating: 95, image: "/deadpool.jpg", genre: "Action" },
  ];

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

  const filteredMovies = selectedGenere === "All" ? movies : movies.filter((movie) => movie.genre === selectedGenere);

  return (
    <section className="flex flex-row h-screen">
      <div className="w-1/6 bg-[#262626] p-4 overflow-y-auto">
        <div className="">
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

        <h2 className="text-white text-xl font-bold mb-4">generes</h2>
        <ul>
          {generes.map((genre) => (
            <li
              key={genre}
              onClick={() => setselectedGenere(genre)}
              className={`cursor-pointer py-2 px-3 rounded ${selectedGenere === genre ? " text-white" : "text-gray-400 hover:bg-[#181818] hover:text-white"
                }`}
            >
              {genre}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 bg-[#444444] p-6 overflow-y-auto">
        <h2 className="text-white text-xl font-bold mb-4">Popular</h2>
        <CardsMovie movies={filteredMovies} />
      </div>
    </section>
  );
}