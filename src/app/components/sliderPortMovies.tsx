import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { fetchMoviesByPopularity } from "@/app/services/movieService";
import MovieDescription from "@/app/types/movieDescription";

const MovieSlider = () => {
  const [movies, setMovies] = useState<
    { id: number; title: string; rating: number; image: string; description: string; release_date: string }[] // Actualizar estructura
  >([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const moviesData = await fetchMoviesByPopularity();
        const trendingMovies = moviesData
          .sort((a, b) => b.rating - a.rating)
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
        {movies.map((movie, index) => (
          <SwiperSlide key={movie.id || index}>
            <div
              className="relative h-full bg-cover bg-center flex items-end p-4 w-full"
              style={{ backgroundImage: `url(${movie.image})` }}
            >
              <div className="bg-black bg-opacity-80 text-white p-4 rounded-md w-full">
                <h2 className="text-lg font-bold uppercase">{movie.title}</h2>
                <p className="text-sm mt-2 text-gray-300">
                  {movie.description && movie.description.length > 0
                    ? movie.description.length > 200
                      ? movie.description.slice(0, 100) + "..."
                      : movie.description
                    : "Descripción no disponible"}
                </p>
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full">
                  {movie.rating}%
                </div>
              </div>
            </div>

            <MovieDescription
              movie={{
                id: movie.id,
                title: movie.title,
                poster_path: movie.image,
                genre_ids: [],
                release_date: movie.release_date,
                vote_average: movie.rating,
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieSlider;
