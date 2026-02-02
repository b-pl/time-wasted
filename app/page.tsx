import Search from '@/app/ui/Search';
import MoviePostersGrid from '@/app/ui/MoviePostersGrid';
import {parseMovieDataResponse, tmdbSearch} from '@/app/lib/data';
import Navigation from '@/app/ui/Navbar';
import {MovieApiResponse} from '@/app/lib/definitions';


export default async function Home(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>
}) {
    const searchParams = await props.searchParams;
    const query: string = searchParams?.query || '';
    const currentPage: number = Number(searchParams?.page) || 1;
    const response: MovieApiResponse = await tmdbSearch(query, currentPage);
    console.log(response);
    const allPages: number = response.total_pages;

    return (
        <div className="flex flex-col min-h-screen items-center justify-center font-sans bg-slate-700">

            <Navigation/>

            <main
                className="flex min-h-screen w-7xl flex-col items-center py-32 px-16 bg-slate-700 sm:items-start">

                <Search/>
                <MoviePostersGrid moviesData={parseMovieDataResponse(response)} pagesCount={allPages}/>

            </main>
        </div>
    );
}
