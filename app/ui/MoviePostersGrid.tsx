import MoviePoster from '@/app/ui/MoviePoster';
import {MovieApiResponse, MovieData} from '@/app/lib/definitions';
import PaginationArrows from '@/app/ui/PaginationArrows';
import {parseMovieDataResponse, tmdbSearch} from '@/app/lib/data';

export default async function MoviePostersGrid({query, currentPage}: {
    currentPage: number;
    query: string;
}) {
    const response: MovieApiResponse = await tmdbSearch(query, currentPage);
    const moviesData = parseMovieDataResponse(response);
    const pagesCount: number = response.total_pages;

    return (
        <>
            {moviesData.length > 0 && <PaginationArrows position="top" pagesCount={pagesCount} />}

            <ul
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">

                {moviesData.map((movieData: MovieData) => (
                    <li key={`${movieData.media_type}_${movieData.id}`}><MoviePoster movieData={movieData}/></li>
                ))}

            </ul>

            {moviesData.length > 0 && <PaginationArrows position="bottom" pagesCount={pagesCount} />}
        </>
    )
}