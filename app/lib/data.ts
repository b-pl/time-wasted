import {BACKDROP_PREFIX, MovieData, POSTER_PREFIX} from '@/app/lib/definitions';

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

export async function tmdbAuthenticate(): Promise<any[]> {
    const url = 'https://api.themoviedb.org/3/authentication';

    fetch(url, fetchOptions)
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.error(err));
}

export async function tmdbSearchMovie(title: string): Promise<any[]> {
    const query = encodeURIComponent(title.toLowerCase());
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;

    const data = await fetch(url, fetchOptions);
    const dataJson = await data.json();
    console.log(dataJson.results[0]);

    return dataJson.results[0];
}

export async function tmdbSearch(title: string): Promise<any[]> {
    console.log('title: ', title);
    const query = encodeURIComponent(title.toLowerCase());
    console.log('query: ', query);
    const url = `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`;

    try {
        const res = await fetch(url, fetchOptions);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = res.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return [];
    }
}

export const fakeFetch = async () => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log('await')
    return;
}

// todo: pobierać też title i wyświetlać w przypadku PosterUnavailable pod original_title
export const parseMovieDataResponse = (res: Object): MovieData[] => {
    const resArray = [];
    res?.results.forEach((result) => {
        if (!result.original_title) return;

        resArray.push({
            id: result.id,
            media_type: result.media_type,
            original_title: result.original_title,
            backdrop_path: result.backdrop_path ? `${BACKDROP_PREFIX}${result.backdrop_path}` : null,
            poster_path: result.poster_path ? `${POSTER_PREFIX}${result.poster_path}` : null,
        });
    });

    console.log(resArray);
    return resArray;
}