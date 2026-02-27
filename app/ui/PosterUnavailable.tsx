import {RiMovie2Fill} from 'react-icons/ri';

export default function PosterUnavailable() {
    return (
        <div
            className={
                "w-full h-full bg-gray-800 " +
                "flex flex-col items-center justify-center " +
                "rounded-lg border-2 border-dashed border-gray-600 " +
                "aspect-[2/3]"
            }>
            <RiMovie2Fill className="w-[150px] h-[150px]"/>
        </div>
    )
}