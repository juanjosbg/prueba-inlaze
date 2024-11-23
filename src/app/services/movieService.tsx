import axios from 'axios';

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const apiMovies = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN_MOVIE_URL}`,
  },
});

apiMovies.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

/**
 * Procesar los datos de las películas.
 * @param movies - Lista de películas
 * @returns Películas procesadas con título, fecha, calificación e imagen
 */
export const processMovieData = (movies: any[]) => {
  return movies.map((movie) => ({
    title: movie.title,
    date: movie.release_date,
    rating: Math.round(movie.vote_average * 10) || 0,
    image: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : "https://via.placeholder.com/500",
    description: movie.overview,
  }));
};

/**
 * Fetch movies by genre ID.
 * @param genreId - ID del género
 * @returns Lista de películas
 */
export const fetchMoviesByGenre = async (genreId: number) => {
  try {
    const response = await apiMovies.get('/discover/movie', {
      params: { with_genres: genreId },
    });
    return processMovieData(response.data.results); // Procesar datos
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    throw error;
  }
};

/**
 * Fetch popular movies.
 * @returns Lista de películas populares
 */
export const fetchMoviesByPopularity = async () => {
  try {
    const response = await apiMovies.get('/discover/movie', {
      params: {
        include_adult: false,
        include_video: false,
        language: 'en-US',
        page: 1,
        sort_by: 'popularity.desc',
      },
    });
    return processMovieData(response.data.results); // Procesar datos
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

/**
 * Fetch movies by title.
 * @param query - Título de la película
 * @returns Lista de películas por título
 */
export const fetchMoviesByTitle = async (query: string) => {
  try {
    const response = await apiMovies.get('/search/movie', {
      params: { query },
    });
    return processMovieData(response.data.results); // Procesar datos
  } catch (error) {
    console.error('Error fetching movies by title:', error);
    throw error;
  }
};
