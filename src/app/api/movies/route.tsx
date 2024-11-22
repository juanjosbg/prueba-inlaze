import { NextResponse } from 'next/server';
import { fetchMoviesByGenre, fetchMoviesByPopularity, fetchMoviesByTitle } from '@/app/services/movieService';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url); // Obtener parámetros de la URL
  const genre = searchParams.get('genre'); // Género (opcional)
  const title = searchParams.get('title'); // Título (opcional)
  const popular = searchParams.get('popular'); // Popularidad (opcional)

  try {
    let data;

    if (genre) {
      // Filtrar por género
      data = await fetchMoviesByGenre(Number(genre));
      return NextResponse.json(data);
    }

    if (title) {
      // Buscar películas por título
      data = await fetchMoviesByTitle(title);
      return NextResponse.json(data);
    }

    if (popular) {
      // Obtener películas populares (si el parámetro "popular" está presente, no importa su valor)
      data = await fetchMoviesByPopularity();
      return NextResponse.json(data);
    }

    // Si no se envían parámetros, retorna un error
    return NextResponse.json({ error: 'No filters applied' }, { status: 400 });
  } catch (error) {
    console.error('Error fetching movies:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
