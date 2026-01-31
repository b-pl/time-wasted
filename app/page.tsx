import Search from '@/app/ui/Search';
import MoviePostersGrid from '@/app/ui/MoviePostersGrid';
import {parseMovieDataResponse, tmdbSearch} from '@/app/lib/data';
import {Suspense} from 'react';
import { RiMovie2Fill } from "react-icons/ri";


export default async function Home(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    // const currentPage = Number(searchParams?.page) || 1;
    const response = await tmdbSearch(query);
    console.log(response);

    return (
        <div className="flex min-h-screen items-center justify-center font-sans bg-slate-700">
            <main
                className="flex min-h-screen w-7xl flex-col items-center py-32 px-16 bg-slate-700 sm:items-start">

                <Search />

                {/*todo: moviePosters GRID component*/}
                {/*
                    https://nextjs.org/docs/app/getting-started/fetching-data
                */}

                    <Suspense>
                        <MoviePostersGrid moviesData={parseMovieDataResponse(response)} />
                    </Suspense>
            </main>
        </div>
    );
}
