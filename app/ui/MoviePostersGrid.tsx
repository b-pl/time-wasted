'use client';

import {use} from 'react';
import MoviePoster from '@/app/ui/MoviePoster';
import {MovieData} from '@/app/lib/definitions';

export default function MoviePostersGrid({ moviesData }: { moviesData: MovieData[] }) {
    return (
        <ul
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">

            {moviesData.map((movieData: MovieData) => (
                <li key={`${movieData.media_type}_${movieData.id}`}><MoviePoster movieData={movieData} /></li>
            ))}

        </ul>
    )
}