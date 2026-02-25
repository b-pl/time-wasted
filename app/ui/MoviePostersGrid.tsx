import MoviePoster from '@/app/ui/MoviePoster';
import {MovieApiResponse, MovieData} from '@/app/lib/definitions';
import PaginationArrows from '@/app/ui/PaginationArrows';
import {parseMovieDataResponse, tmdbSearch} from '@/app/lib/data';
import MovieNotFound from '@/app/ui/MovieNotFound';

export default async function MoviePostersGrid({query, currentPage}: {
    currentPage: number;
    query: string;
}) {
    const response: MovieApiResponse = await tmdbSearch(query, currentPage);
    const moviesData = parseMovieDataResponse(response);
    const pagesCount: number = response.total_pages;

    if (!query) return null;

    // todo - wyszukaj DFD -> zła wielkość kafli
    return (
        <>
            {moviesData.length > 0 && <PaginationArrows position="top" pagesCount={pagesCount}/>}

            {
                moviesData.length > 0
                    ? <ul
                        className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch auto-rows-fr gap-8 max-w-7xl mx-auto">
                        {moviesData.map((movieData: MovieData) => (
                            <li key={`${movieData.media_type}_${movieData.id}`}>
                                <MoviePoster movieData={movieData}/>
                            </li>
                        ))}
                      </ul>
                    : <div className={"w-full h-[300px] flex justify-center"}>
                        <MovieNotFound/>
                      </div>
            }

            {moviesData.length > 0 && <PaginationArrows position="bottom" pagesCount={pagesCount}/>}
        </>
    )
}