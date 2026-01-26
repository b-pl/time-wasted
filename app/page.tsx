// 'use client';

import Search from '@/app/ui/search';
import {tmdbAuthenticate, tmdbSearch, tmdbSearchMovie} from '@/app/lib/data';
import PosterPlaceholder from '@/app/ui/Poster';
import MoviePoster from '@/app/ui/MoviePoster';

export default async function Home() {
    // const test = await tmdbAuthenticate();
    const movieTest = await tmdbSearchMovie('Fight Club');
    console.log('movieTest:', movieTest);
    // const movieTest2 = await tmdbSearchMovie('Podziemny Krąg');
    // const multiSearch = await tmdbSearch('Star Wars');

    return (
        <div className="flex min-h-screen items-center justify-center font-sans bg-slate-700">
            <main
                className="flex min-h-screen max-w-7xl flex-col items-center py-32 px-16 bg-slate-700 sm:items-start">

                <Search />

                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">

                    <MoviePoster posterURL={movieTest.poster_path} />

                </div>
            </main>
        </div>
    );
}
