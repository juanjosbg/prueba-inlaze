import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { fetchMoviesByPopularity } from "@/app/services/movieService";

const MovieSlider = () => {
  const [movies, setMovies] = useState<
    { id: number; title: string; description: string; rating: number; image: string }[]
  >([]);

  useEffect(() => {
    let isMounted = true;

    const loadMovies = async () => {
      try {
        const moviesData = await fetchMoviesByPopularity();
        const trendingMovies = moviesData
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 3);

        if (isMounted) {
          setMovies(trendingMovies);
        }
      } catch (error) {
        console.error("Error loading movies:", error);
      }
    };

    loadMovies();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation]}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        slidesPerView={1}
        className="h-[400px]"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div
              className="relative h-full bg-cover bg-center flex items-end p-4 w-full"
              style={{ backgroundImage: `url(${movie.image})` }}
            >
              <div className="bg-black bg-opacity-90 text-white p-5 rounded-md w-full">
                <h2 className="sm:text-md md:text-2xl font-bold uppercase">{movie.title}</h2>
                <p className="mt-2">{movie.description}</p>
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full">
                  {movie.rating}%
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieSlider;
