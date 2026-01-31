import {RiMovie2Fill} from 'react-icons/ri';

export default function PosterUnavailable({ title }: { title: string }) {
    return (
        <div
            className="w-full h-full bg-gray-800 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-600">
            <RiMovie2Fill className="w-[150px] h-[150px]"/>
            <span className="text-gray-400 text-sm font-medium">{title}</span>
        </div>
    )
}

// #4a5565 - border-color
// #1e2939 - bg