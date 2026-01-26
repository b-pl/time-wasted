import {Input} from '@heroui/input';

export default function Search() {
    return (
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pb-16">
            <Input
                label="Search for TV Show or Movie..."
                type="search"
                className="light"
                />
        </div>
    )
}