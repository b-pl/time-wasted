import {useState} from 'react';
import Image from "next/image";
import {POSTER_PREFIX} from '@/app/lib/definitions';
import type {Poster} from '@/app/lib/definitions';
import {Skeleton} from '@heroui/react';

export default function Poster({
                                   width = 300,
                                   height = 450,
                                   url
                               }: Poster) {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    // todo
    // change alt to movie name
    return (
        <Skeleton isLoaded={isImageLoaded}>
            <Image
                src={`${POSTER_PREFIX}${url}`}
                alt="no poster available"
                width={width}
                height={height}
                onLoad={() => setIsImageLoaded(true)}
            />
        </Skeleton>
    )
}