import {fakeFetch} from '@/app/lib/data';
import Poster from '@/app/ui/Poster';

// MoviePosterServer.tsx - BEZ 'use client'!
export default async function MoviePosterServer({ posterURL }: { posterURL: string }) {
    const data = await fakeFetch();  // 5s delay!

    return (
        <div className="poster-inner">
            <Poster url={posterURL} />
        </div>
    );
}