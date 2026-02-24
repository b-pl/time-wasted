import {RiMovie2Fill} from 'react-icons/ri';

export default function MovieNotFound() {
    return (
        <div
            className="w-full h-full flex flex-col items-center justify-center opacity-70">
            <RiMovie2Fill className="w-full h-full"/>
            <span className="text-2xl text-default-900">No results found :/</span>
        </div>
    )
}