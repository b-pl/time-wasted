import Search from '@/app/ui/Search';
import MoviePostersGrid from '@/app/ui/MoviePostersGrid';
import PageNavbar from '@/app/ui/PageNavbar';
import Counter from '@/app/ui/Counter';

export default async function Home(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>
}) {
    const searchParams = await props.searchParams;
    const query: string = searchParams?.query || '';
    const currentPage: number = Number(searchParams?.page) || 1;

    return (
        <div className="flex flex-col min-h-screen items-center justify-center font-sans bg-slate-700">

            <PageNavbar/>
            <main
                className="flex min-h-screen w-7xl max-w-full flex-col items-center py-8 px-8 lg:py-32 lg:px-16 bg-slate-700 sm:items-start">

                <Counter/>
                <Search/>
                <MoviePostersGrid currentPage={currentPage} query={query} />

            </main>
        </div>
    );
}
