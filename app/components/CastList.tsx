import React from 'react';
import Image from 'next/image';

interface Cast {
    id: string;
    name: string;
    character: string;
    profile_path: string;
    [key: string]: unknown;
}

interface CastListProps {
    cast: Cast[] | null;
}

const CastList: React.FC<CastListProps> = ({ cast }) => (
    <article className='flex flex-col gap-4'>
        <h2 className="text-white text-2xl font-bold mt-8">Cast</h2>
        <section className="flex flex-row gap-4 justify-center">
            {cast!.map((member) => (
                <div key={member.id} className="flex flex-col justify-center items-center">
                    <Image
                        src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                        alt={member.name}
                        width={64}
                        height={64}
                        className="flex bg-black/50 rounded-full shadow-md aspect-square object-cover flex-shrink-0"
                    />
                    <p className="text-sm font-bold mt-2 line-clamp-1">{member.name}</p>
                    <p className="opacity-60 text-xs line-clamp-1">{member.character}</p>
                </div>
            ))}
        </section>
    </article>
);

export default CastList;