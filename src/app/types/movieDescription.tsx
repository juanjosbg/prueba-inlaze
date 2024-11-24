export interface Movie {
  id: number;
  title: string;
  overview?: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
  genre_ids: number[];
}

export const MovieDescription = ({ movie }: { movie: Movie }) => {
  return (
    <div>
      <h1>{movie.title}</h1>
      <p>Release Date: {movie.release_date}</p>
      <p>Rating: {movie.vote_average}</p>
    </div>
  );
};

