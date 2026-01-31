export const POSTER_PREFIX = `https://image.tmdb.org/t/p/w300_and_h450_face/`;
export const BACKDROP_PREFIX = `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/`;

export interface Poster {
    width?: number;
    height?: number;
    url?: string;
}

// API returns title / name
export interface MovieData {
    id: number;
    media_type: string;
    title?: string;
    name?: string;
    original_title?: string;
    original_name?: string;
    backdrop_path?: string;
    poster_path?: string;
}