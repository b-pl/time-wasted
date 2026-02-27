import {useState} from 'react';
import Image from "next/image";
import {POSTER_PREFIX} from '@/app/lib/definitions';
import type {Poster} from '@/app/lib/definitions';
import {Skeleton} from '@heroui/react';

export default function Poster({
                                   width = 300,
                                   height = 450,
                                   url,
                                   title
                               }: Poster) {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    return (
        <Skeleton isLoaded={isImageLoaded}>
            <Image
                src={`${POSTER_PREFIX}${url}`}
                alt={`${title} poster` || 'no data'}
                width={width}
                height={height}
                onLoad={() => setIsImageLoaded(true)}
            />
        </Skeleton>
    )
}