import React from "react";

const CardsMovie = ({ movies }: { movies: { title: string; date: string; rating: number; image: string }[] }) => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-6">
      {movies.map((movie, index) => (
        <div key={index} className="bg-[#fff] rounded-lg shadow-md p-4 w-64">
          {/* <img src={movie.image} alt={movie.title} className="rounded-lg w-full h-40 object-cover mb-4" /> */}
          <h3 className="text-white text-lg font-semibold">{movie.title}</h3>
          <p className="text-gray-400 text-sm mb-2">{movie.date}</p>
          <div className="flex justify-between items-center">
            <span
              className={`text-sm font-bold ${
                movie.rating >= 75 ? "text-green-400" : movie.rating >= 50 ? "text-yellow-400" : "text-red-400"
              }`}
            >
              {movie.rating}%
            </span>
            <button className="text-gray-400 hover:text-white transition">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardsMovie;