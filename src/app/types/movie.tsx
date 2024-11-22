export interface Movie {
    id: number;
    title: string;
    overview: string;
    genre_ids: number[];
    popularity: number;
    release_date: string;
    poster_path: string;
  }
  
  export interface MovieResponse {
    results: Movie[];
    page: number;
    total_results: number;
    total_pages: number;
  }
  