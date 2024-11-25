import React, { useState } from "react";
import Image from "next/image";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"; // Librería de íconos

const CardsMovie = ({
  movies,
}: {
  movies: { title: string; date: string; description: string; rating: number; image: string }[];
}) => {
  const [favorites, setFavorites] = useState<string[]>([]); // Guarda los títulos de las favoritas

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const toggleFavorite = (title: string) => {
    if (favorites.includes(title)) {
      setFavorites(favorites.filter((fav) => fav !== title)); // Elimina si ya es favorita
    } else {
      setFavorites([...favorites, title]); // Agrega si no está en favoritos
    }
  };

  return (
    <section>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie, index) => (
          <div
            key={index}
            className="bg-[#303030] rounded-lg p-3 w-64 shadow-lg hover:bg-[#252525] relative"
          >
            {/* Imagen */}
            <div className="relative w-full md:h-72 mb-4">
              <Image
                src={movie.image}
                alt={movie.title}
                className="rounded-lg object-cover"
                fill
                sizes="(max-width: 640px) 100vw, 25vw"
              />
              <button
                onClick={() => toggleFavorite(movie.title)}
                className="absolute top-2 right-2 text-xl text-white"
              >
                {favorites.includes(movie.title) ? (
                  <AiFillHeart className="text-red-500" />
                ) : (
                  <AiOutlineHeart />
                )}
              </button>
            </div>

            {/* Información de la película */}
            <h3 className="text-left text-md font-semibold md:text-lg">{movie.title}</h3>
            <p className="text-gray-400 text-sm mb-2">{truncateText(movie.description, 100)}</p>
            <p className="text-white font-semibold text-sm mb-1">{movie.date}</p>
            <div className="flex justify-between items-center">
              <span
                className={`sm:text-sm md:text-2md font-bold ${
                  movie.rating >= 75
                    ? "text-green-400"
                    : movie.rating >= 50
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                {movie.rating}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CardsMovie;
