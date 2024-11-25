/* eslint-disable @typescript-eslint/no-explicit-any */
// En MovieSlider.tsx
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { fetchMoviesByPopularity } from "@/app/services/movieService";
import { MovieSlider, MovieDescription } from "@/app/types/movieDescription";

const MovieSliderComponent = () => {
  const [movies, setMovies] = useState<MovieSlider[]>([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const moviesData = await fetchMoviesByPopularity();
        const trendingMovies = moviesData
          .map((movie: any) => ({
            id: movie.id,
            title: movie.title || "Título no disponible",
            image: movie.image ?? "/placeholder.jpg",
            overview: movie.overview || "Descripción no disponible",
            release_date: movie.release_date || "Fecha no disponible",
            vote_average: movie.vote_average || 0,
          }))
          .sort((a: MovieSlider, b: MovieSlider) => b.vote_average - a.vote_average)
          .slice(0, 3);

        setMovies(trendingMovies);
      } catch (error) {
        console.error("Error loading movies:", error);
      }
    };

    loadMovies();
  }, []);

  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation]}
        navigation
        loop={true}
        slidesPerView={1}
        className="h-[400px]"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="relative h-full bg-cover bg-center flex items-end w-full"
              style={{ backgroundImage: `url(${movie.image})` }}
            >
              <div className="bg-black bg-opacity-90 text-white p-6 w-full">
                <h2 className="text-lg font-bold uppercase md:text-3xl">
                  {movie.title || "Título no disponible"}
                </h2>

                <p className="text-sm mt-2 text-gray-300">
                  {movie.overview
                    ? movie.overview.length > 100
                      ? movie.overview.slice(0, 100) + "..."
                      : movie.overview
                    : "Descripción no disponible"}
                </p>

                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full">
                  {movie.vote_average !== undefined && movie.vote_average !== null
                    ? `${movie.vote_average}%`
                    : "Sin calificación"}
                </div>
              </div>
            </div>
            <MovieDescription movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieSliderComponent;


