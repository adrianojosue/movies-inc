export const revalidate = 60

import { getNowPlayingMovies } from '@/app/actions/tmdb';
import MovieCard from './components/MovieCard';

export default async function Home() {

  const movies = await getNowPlayingMovies();

  return (
    <section className="flex flex-col gap-8">
        <h1 className="text-4xl text-left font-bold">Now on Theaters</h1>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
            {
              movies!
              .sort((a: { title: string }, b: { title: string }) => a.title.localeCompare(b.title))
              .map((movie: { id: string; title: string; release_date: string; vote_average: number; poster_path: string }) => (
              <MovieCard
                key={movie.id}
                title={movie.title}
                id={movie.id}
                releaseDate={movie.release_date}
                votes={movie.vote_average}
                posterPath={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              />
              ))
            }
        </div>
    </section>
  );
}
