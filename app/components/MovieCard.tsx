import React from 'react';
import Image from 'next/image';
import { IoStar } from 'react-icons/io5';
import Link from 'next/link';

interface MovieCardProps {
    title: string;
    id: string;
    releaseDate: string;
    votes: number;
    posterPath: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, id, releaseDate, votes, posterPath }) => {
    return (
        <Link href={`/${id}`}>
            <article className="bg-white bg-opacity-10 shadow-lg rounded-3xl overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out">
                <Image
                    src={posterPath}
                    width={300}
                    height={450}
                    alt={`${title} poster`}
                    className="rounded-t-3xl bg-black/50 object-cover aspect-square"
                />
                <section className="flex flex-col justify-start items-start p-4 min-h-36">
                    <h2 className="text-xl font-bold line-clamp-2">{title}</h2>
                    <p className="opacity-60">{releaseDate}</p>
                    <p className="flex flex-row justify-center mt-1 items-center text-amber-400">
                        <IoStar className='inline-flex mr-1' />
                        <span>{Math.round(votes)} / 10</span>
                    </p>
                </section>
            </article>
        </Link>
    );
};

export default MovieCard;