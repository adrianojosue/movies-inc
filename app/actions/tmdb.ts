'use server';

import axios, { AxiosError } from 'axios';

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

if (!TMDB_API_KEY) {
    throw new Error('TMDB_API_KEY is not defined in environment variables.');
}

export interface Movie {
    id: string;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    genres: { id: number; name: string; [key: string]: unknown }[];
    [key: string]: unknown;
}
export interface Cast {
    id: string;
    name: string;
    character: string;
    profile_path: string;
    [key: string]: unknown;
}

export const tmdb = axios.create({
    baseURL: TMDB_BASE_URL,
    params: {
        api_key: TMDB_API_KEY,
    },
});

const isAxiosError = (error: unknown): error is AxiosError => axios.isAxiosError(error);

const handle404Error = (error: unknown) => {
    if (isAxiosError(error) && error.response?.status === 404) {
        console.log('Resource not found:', error.response.data);
        return null;
    }
    throw error;
};

export const getGuestSessionId = async (): Promise<string> => {
    try {
        const response = await tmdb.get('/authentication/guest_session/new');
        return response.data.guest_session_id;
    } catch (error) {
        console.error('Error fetching guest session ID:', error);
        throw error;
    }
};

export const getNowPlayingMovies = async (): Promise<Movie[] | null> => {
    try {
        const response = await tmdb.get('/movie/now_playing', {  params: { page: 1 } });
        return response.data.results;
    } catch (error) {
        return handle404Error(error);
    }
};

export const getMovieDetails = async (id: string): Promise<Movie | null> => {
    try {
        const response = await tmdb.get(`/movie/${id}`);
        return response.data;
    } catch (error) {
        return handle404Error(error);
    }
};

export const getSimilarMovies = async (id: string): Promise<Movie[] | null> => {
    try {
        const response = await tmdb.get(`/movie/${id}/similar`, { params: { page: 1 } });
        return response.data.results;
    } catch (error) {
        return handle404Error(error);
    }
};

export const getMovieCredits = async (id: string, limit = 4): Promise<Cast[] | null> => {
    try {
        const response = await tmdb.get(`/movie/${id}/credits`);
        return response.data.cast.slice(0, limit);
    } catch (error) {
        return handle404Error(error);
    }
};

export const postMovieRating = async (movieId: string, rating: number): Promise<unknown> => {
    try {
        const guestSessionId = await getGuestSessionId();

        const response = await tmdb.post(
            `/movie/${movieId}/rating`,
            {
            value: rating,
            },
            {
            params: {
                guest_session_id: guestSessionId,
            },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error submitting movie rating:', error);
        throw new Error(
            'Failed to submit rating. Please try again later.'
        );
    }
};