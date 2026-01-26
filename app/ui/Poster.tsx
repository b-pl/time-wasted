import Image from "next/image";
import {POSTER_PREFIX} from '@/app/lib/definitions';

export default function Poster({
    width = 300,
    height = 450,
    url
} : Poster) {

    return (
        <Image
            src={`${POSTER_PREFIX}${url}`}
            alt="placeholder movie poster"
            width={width}
            height={height}
        />
    )
}