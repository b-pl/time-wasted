'use client';

import {Card} from '@heroui/card';
import {Button} from '@heroui/react';
import {useState} from 'react';
import Poster from '@/app/ui/Poster';
import {MovieData} from '@/app/lib/definitions';
import PosterUnavailable from '@/app/ui/PosterUnavailable';
import clsx from 'clsx';
import {tmdbSeasonDetails, tmdbSeriesDetails, tmdbMovieDetails} from '@/app/lib/data';
import {useWatchTime} from '@/app/contexts/WatchTimeContext';


export default function MoviePoster({movieData}: { movieData: MovieData }) {
    const { addWatchTime, subtractWatchTime } = useWatchTime();
    const isMovie = movieData.media_type === 'movie';
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [runtime, setRuntime] = useState<number | undefined>(undefined);

    const getMovieRuntime = async () => {
        if (runtime) return runtime;

        const movieDetailsResponse = await tmdbMovieDetails(movieData.id);
        if (!movieDetailsResponse.runtime) {
            return 0;
        }

        setRuntime(movieDetailsResponse.runtime);
        return movieDetailsResponse.runtime;
    }

    const getSeriesRuntime = async () => {
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

    const handleMovieClick = async () => {
        const newIsChecked = !isChecked;
        setIsChecked(newIsChecked);

        const movieRuntime: number = isMovie ? await getMovieRuntime() : await getSeriesRuntime();
        newIsChecked ? addWatchTime(movieRuntime) : subtractWatchTime(movieRuntime);
    }

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
                    <Poster url={movieData.poster_path}/> :
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