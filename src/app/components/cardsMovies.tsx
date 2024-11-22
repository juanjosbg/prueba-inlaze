import React from "react";
import Image from "next/image";

const CardsMovie = ({ 
  movies 
}: { 
  movies: { title: string; date: string; description: string; rating: number; image: string }[] 
}) => {
  // Función para truncar texto
  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie, index) => (
        <div key={index} className="bg-[#303030] rounded-lg shadow-md p-4 w-64">
          <div className="relative w-full h-40 mb-4">
            <Image
              src={movie.image}
              alt={movie.title}
              className="rounded-lg object-cover"
              fill // Hace que la imagen ocupe todo el contenedor definido con `relative` y dimensiones
              sizes="(max-width: 640px) 100vw, 25vw" // Mejora el comportamiento responsive
            />
          </div>
          <h3 className="text-left text-md font-semibold md:text-lg mb-4">{movie.title}</h3>
          <p className="text-gray-400 text-sm mb-2">{movie.date}</p>
          <p className="text-gray-400 text-sm mb-2">
            {truncateText(movie.description, 100)} {/* Limitar a 100 caracteres */}
          </p>
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
  );
};

export default CardsMovie;
