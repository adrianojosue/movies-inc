import Image from 'next/image';
import { getMovieCredits, getMovieDetails, getSimilarMovies } from '@/app/actions/tmdb';
import { notFound } from 'next/navigation';
import { IoStar, IoChevronBackOutline } from 'react-icons/io5';
import MovieCard from '@/app/components/MovieCard';
import CastList from '@/app/components/CastList';
import Link from 'next/link';
import RateMovie from '@/app/components/RateMovie';

export default async function MovieDetailsPage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;

  if (!id) {
    notFound();
  }

  const movie = await getMovieDetails(id);
  const similarMovies = await getSimilarMovies(id);
  const cast = await getMovieCredits(id, 4);

  return (
    <>
      <nav className="flex flex-row w-full justify-start items-start mb-8">
        <ul>
          <li>
            <Link href="/" className="group">
              <div className="flex flex-row gap-1 items-center bg-gray-700 p-4 rounded-full hover:scale-105 transition-transform duration-300 ease-in-out">
                <IoChevronBackOutline className="transform group-hover:-translate-x-1 transition-transform duration-300" />
                <span>All movies</span>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
      <article className="flex flex-col gap-16">
        <section className="flex flex-col sm:flex-row gap-8">
          <div className='flex-shrink-0'>
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie && movie.poster_path}`}
              alt={movie ? movie.title : 'Movie poster'}
              width={300}
              height={450}
              className="rounded-3xl shadow-lg w-full sm:w-[250px] bg-black/50 object-cover aspect-square sm:aspect-[9/16]"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold line-clamp-2">
              { movie && movie.title }
            </h1>
            <p className="opacity-60 text-sm">Released: { movie && movie.release_date}</p>
            <div className="flex flex-col justify-start items-start mt-1 text-amber-400 gap-4">
                  <i className="inline-flex justify-center items-center mr-1 text-amber-400">
                      <IoStar className='inline-block mr-1' />
                      <span className="inline-block">{ movie ? Math.round(movie.vote_average) : 0 } / 10</span>
                  </i>
                  {
                    movie && <RateMovie movieId={movie.id} />
                  }
            </div>
            <p className="opacity-80 my-4 line-clamp-6">{ movie && movie.overview}</p>
            <div className="flex flex-wrap gap-2">
              {movie && movie.genres.map((genre: { id: number; name: string }) => (
                <span
                  key={genre.id}
                  className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <section className='flex flex-col justify-start items-start gap-4 w-full'>
              {cast && cast.length > 0 ? (
              <CastList cast={cast} />
              ) : (
              <p className="text-gray-400 mt-8">No cast information available.</p>
              )}
            </section>
          </div>
        </section>
        <section className='flex flex-col gap-4'>
            <h2 className="text-white text-2xl font-bold mb-4">Recomended</h2>
            {
              similarMovies && similarMovies.length > 0
              ? <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
                  {similarMovies.map((similarMovie: { id: string; title: string; release_date: string; vote_average: number; poster_path: string }) => (
                    <MovieCard
                      key={similarMovie.id}
                      title={similarMovie.title}
                      id={similarMovie.id}
                      releaseDate={similarMovie.release_date}
                      votes={similarMovie.vote_average}
                      posterPath={`https://image.tmdb.org/t/p/w500${similarMovie.poster_path}`}
                    />
                  ))}
                </div>
              : <p className="text-lg">No similar movies found 😔</p>
            }
        </section>
      </article>
    </>
  );
}