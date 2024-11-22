import axios from 'axios';

const apiMovies = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Base URL desde .env
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
 * Fetch movies by genre ID.
 * @param genreId - ID del género
 * @returns Lista de películas
 */
export const fetchMoviesByGenre = async (genreId: number) => {
  try {
    const response = await apiMovies.get('/discover/movie', {
      params: { with_genres: genreId },
    });
    return response.data;
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
    console.log('sirvee')
    const response = await apiMovies.get('/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc');
    return response.data;
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
    return response.data;
  } catch (error) {
    console.error('Error fetching movies by title:', error);
    throw error;
  }
};
