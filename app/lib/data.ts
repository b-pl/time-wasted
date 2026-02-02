import {BACKDROP_PREFIX, MovieApiResponse, MovieData, POSTER_PREFIX} from '@/app/lib/definitions';

const auth = `Bearer ${process.env.TMDB_AUTH_TOKEN}`;
const fetchOptions = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: auth
    },
    next: {
        revalidate: 3600
    }
}

// export async function tmdbAuthenticate(): Promise<any[]> {
//     const url = 'https://api.themoviedb.org/3/authentication';
//
//     fetch(url, fetchOptions)
//         .then(res => res.json())
//         .then(json => console.log(json))
//         .catch(err => console.error(err));
// }

export async function tmdbSearch(title: string, currentPage?: number): Promise<MovieApiResponse> {
    const query = encodeURIComponent(title.toLowerCase());
    const page = encodeURIComponent(currentPage) || '1';
    const url = `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=${page}`;

    console.group('tmdbSearch()');
        console.log('title: ', title);
        console.log('query: ', query);
        console.log('page: ', page);
    console.groupEnd('tmdbSearch()');

    try {
        const res = await fetch(url, fetchOptions);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        return res.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return [];
    }
}

export const parseMovieDataResponse = (res: Object): MovieData[] => {
    const resArray: any = [];
    res?.results.forEach((result: any) => {
        if (!result.title && !result.name) return;
        if (result.media_type !== 'tv' && result.media_type !== 'movie') return;

        resArray.push({
            id: result.id,
            media_type: result.media_type,
            title: result.title || result.name,
            original_title: result.original_title || result.original_name,
            backdrop_path: (result.backdrop_path && `${BACKDROP_PREFIX}${result.backdrop_path}`) || null,
            poster_path: (result.poster_path && `${POSTER_PREFIX}${result.poster_path}`) || null,
        });
    });

    console.log(resArray);
    return resArray;
}