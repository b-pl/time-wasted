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
    // fetch(url, fetchOptions)
    //     .then(res => res.json())
    //     .then(json => console.log(json.results[0]))
    //     .catch(err => console.error(err));
}

export async function tmdbSearch(title: string): Promise<any[]> {
    const query = encodeURIComponent(title.toLowerCase());
    const url = `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`;

    fetch(url, fetchOptions)
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.error(err));
}

