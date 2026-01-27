'use client';

import Search from '@/app/ui/Search';
import {useSearchParams} from 'next/dist/client/components/navigation';
import MoviePoster from '@/app/ui/MoviePoster';
import {Suspense} from 'react';

export default function Home() {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const query = params?.get('query') || '';
    const currentPage = Number(params?.get('page')) || 1;


    return (
        <div className="flex min-h-screen items-center justify-center font-sans bg-slate-700">
            <main
                className="flex min-h-screen max-w-7xl flex-col items-center py-32 px-16 bg-slate-700 sm:items-start">

                <Search />

                {/*todo: moviePosters GRID component*/}
                {/*
                    https://nextjs.org/docs/app/getting-started/fetching-data
                */}
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">

                    {/*<Suspense>*/}
                        <MoviePoster posterURL={'/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg'} />
                    {/*</Suspense>*/}

                </div>
            </main>
        </div>
    );
}
