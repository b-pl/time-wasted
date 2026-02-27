'use client';

import {Card} from '@heroui/card';
import {Button} from '@heroui/react';
import {useEffect, useState} from 'react';
import Poster from '@/app/ui/Poster';
import {MovieData} from '@/app/lib/definitions';
import PosterUnavailable from '@/app/ui/PosterUnavailable';
import clsx from 'clsx';
import {tmdbSeasonDetails, tmdbSeriesDetails, tmdbMovieDetails} from '@/app/lib/data';
import {useWatchTime} from '@/app/contexts/WatchTimeContext';
import Spinner from '@/app/ui/Spinner';


export default function MoviePoster({movieData}: { movieData: MovieData }) {
    const {addWatchTime, subtractWatchTime} = useWatchTime();
    const isMovie = movieData.media_type === 'movie';
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [runtime, setRuntime] = useState<number | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getMovieRuntime = async ():Promise<number> => {
        if (runtime) return runtime;

        const movieDetailsResponse = await tmdbMovieDetails(movieData.id);
        if (!movieDetailsResponse.runtime) {
            return 0;
        }

        setRuntime(movieDetailsResponse.runtime);
        return movieDetailsResponse.runtime;
    }

    const getSeriesRuntime = async ():Promise<number> => {
        if (runtime) return runtime;

        const seriesDetailsResponse = await tmdbSeriesDetails(movieData.id);
        const numberOfEpisodes: number = seriesDetailsResponse.number_of_episodes;

        if (seriesDetailsResponse.episode_run_time.length) {
            const wholeShowRuntime: number = numberOfEpisodes * seriesDetailsResponse.episode_run_time[0];
            setRuntime(wholeShowRuntime);
            return wholeShowRuntime;
        }

        // tmdbSeriesDetails nie zawsze zwraca runtime, wtedy sprawdzamy runtime dla S01E01
        const seasonDetailsResponse = await tmdbSeasonDetails(movieData.id, 1);
        const wholeShowRuntime: number = seasonDetailsResponse.episodes[0].runtime * numberOfEpisodes;
        setRuntime(wholeShowRuntime);
        return wholeShowRuntime;
    }

    const updateLocalStorageData = (movieRuntime: number, remove: boolean):void => {
        const storageData:object =
            JSON.parse(localStorage.getItem('watchedMoviesData') || 'null') ||
            {movies: {}, series: {}};
        const type: 'movies' | 'series' = isMovie ? 'movies' : 'series';

        if (storageData[type][movieData.id]) {
            if (remove) delete storageData[type][movieData.id];
        } else {
            storageData[type][movieData.id] = {
                title: movieData.title,
                runtime: movieRuntime,
            }
        }

        localStorage.setItem('watchedMoviesData', JSON.stringify(storageData));
        return;
    }

    const checkWatchedOnLoad = () => {
        const storageData: object | null =
            JSON.parse(localStorage.getItem('watchedMoviesData') || 'null') ||
            null;
        const type: 'movies' | 'series' = isMovie ? 'movies' : 'series';

        if (storageData[type][movieData.id]) {
            setIsChecked((true));
        }
    }

    const handleMovieClick = async ():Promise<void> => {
        const newIsChecked = !isChecked;

        setIsLoading(true);
        const movieRuntime: number = isMovie ? await getMovieRuntime() : await getSeriesRuntime();
        setIsChecked(newIsChecked);
        updateLocalStorageData(movieRuntime, isChecked);
        setIsLoading(false);
        newIsChecked ? addWatchTime(movieRuntime) : subtractWatchTime(movieRuntime);
    }

    useEffect(() => {
        checkWatchedOnLoad();
    }, []);

    return (
        <div className={"cardWrapper relative w-full h-full"}>
            {/* movie card */}
            <Card
                radius="lg"
                onPress={() => setIsChecked(!isChecked)}
                className={clsx(
                    "w-full h-full hover:scale-110 border-2 border-transparent",
                    isChecked && "border-success-400",
                )}
            >
                {isLoading &&
                    <div className={"absolute inset-0 bg-black/50 flex items-center justify-center z-50"}>
                        <Spinner size={"lg"}/>
                    </div>
                }

                {/* movie title */}
                <div
                    className={"p-1 h-auto w-full items-center overflow-hidden color-inherit subpixel-antialiased " +
                        "absolute flex flex-col gap-1 bg-black/25 z-10"}
                >
                        <span className="px-2 bg-black text-gray-400 font-medium rounded-lg text-center">
                            {movieData.title}
                        </span>
                    {
                        movieData.original_title && (movieData.original_title !== movieData.title) &&
                        <span className="px-2 bg-black text-gray-400 text-tiny text-center font-medium rounded-lg">
                                ({movieData.original_title})
                        </span>
                    }

                </div>

                {/* movie poster */}
                {movieData.poster_path ?
                    <Poster url={movieData.poster_path} title={movieData.title}/> :
                    <PosterUnavailable/>
                }

                {/* action buttons */}
                <div
                    className="p-3 h-auto w-full items-center overflow-hidden color-inherit subpixel-antialiased
                 rounded-b-large absolute bottom-0.5 flex gap-2"
                >
                    {/*Todo - W późniejszym etapie zrobić sumowanie sezonów pojedynczo*/}
                    {/*{!isMovie &&*/}
                    {/*    <Button*/}
                    {/*        className="text-tiny text-white bg-black/60 flex-1 border-1 border-white/30"*/}
                    {/*        color="default"*/}
                    {/*        radius="lg"*/}
                    {/*        size="sm"*/}
                    {/*        variant="flat"*/}
                    {/*        onPress={() => setIsChecked(!isChecked)}*/}
                    {/*    >*/}
                    {/*        Add by season*/}
                    {/*    </Button>*/}
                    {/*}*/}

                    <Button
                        className="text-tiny text-white bg-black/60 flex-1 border-1 border-white/30"
                        color="default"
                        radius="lg"
                        size="sm"
                        variant="flat"
                        onPress={handleMovieClick}

                    >
                        {!isChecked ? "Add" : "Remove"}
                        {/*Todo - W późniejszym etapie zrobić sumowanie sezonów pojedynczo, poniżej button content*/}
                        {/*{isMovie ? "Add" : "Add all seasons"}*/}
                    </Button>
                </div>
            </Card>
        </div>
    )
}