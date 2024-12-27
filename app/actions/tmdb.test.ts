import {
    getNowPlayingMovies,
    getMovieDetails,
    getSimilarMovies,
    getMovieCredits,
    postMovieRating,
  } from './tmdb';
  
  describe('E2E Tests for TMDB API Integration', () => {
    beforeAll(() => {
      if (!process.env.TMDB_API_KEY) {
        throw new Error('TMDB_API_KEY is not set in the environment variables.');
      }
    });
  
    it('should fetch now-playing movies', async () => {
      const movies = await getNowPlayingMovies();
      expect(movies).toBeDefined();
      expect(Array.isArray(movies)).toBe(true);
      if (movies && movies.length > 0) {
        const movie = movies[0];
        expect(movie).toHaveProperty('id');
        expect(movie).toHaveProperty('title');
        expect(movie).toHaveProperty('overview');
        expect(movie).toHaveProperty('poster_path');
        expect(movie).toHaveProperty('release_date');
      }
    });
  
    it('should fetch movie details by ID', async () => {
      const nowPlaying = await getNowPlayingMovies();
      if (nowPlaying && nowPlaying.length > 0) {
        const movieId = nowPlaying[0].id;
        const movieDetails = await getMovieDetails(movieId);
        expect(movieDetails).toBeDefined();
        if (movieDetails) {
          expect(movieDetails).toHaveProperty('id', movieId);
          expect(movieDetails).toHaveProperty('genres');
        }
      } else {
        console.warn('No now-playing movies available for testing movie details.');
      }
    });
  
    it('should fetch similar movies for a given movie ID', async () => {
      const nowPlaying = await getNowPlayingMovies();
      if (nowPlaying && nowPlaying.length > 0) {
        const movieId = nowPlaying[0].id;
        const similarMovies = await getSimilarMovies(movieId);
        expect(similarMovies).toBeDefined();
        expect(Array.isArray(similarMovies)).toBe(true);
      } else {
        console.warn('No now-playing movies available for testing similar movies.');
      }
    });
  
    it('should fetch movie credits for a given movie ID', async () => {
      const nowPlaying = await getNowPlayingMovies();
      if (nowPlaying && nowPlaying.length > 0) {
        const movieId = nowPlaying[0].id;
        const credits = await getMovieCredits(movieId);
        expect(credits).toBeDefined();
        expect(Array.isArray(credits)).toBe(true);
        if (credits && credits.length > 0) {
          const cast = credits[0];
          expect(cast).toHaveProperty('id');
          expect(cast).toHaveProperty('name');
          expect(cast).toHaveProperty('character');
        }
      } else {
        console.warn('No now-playing movies available for testing movie credits.');
      }
    });
  
    it('should submit a movie rating', async () => {
      const nowPlaying = await getNowPlayingMovies();
      if (nowPlaying && nowPlaying.length > 0) {
        const movieId = nowPlaying[0].id;
        const rating = 8.5;
        const response = await postMovieRating(movieId, rating);
        expect(response).toBeDefined();
        expect(response).toHaveProperty('status_code');
      } else {
        console.warn('No now-playing movies available for testing movie ratings.');
      }
    });
  });
  