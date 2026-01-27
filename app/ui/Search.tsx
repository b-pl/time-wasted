'use client';

import {Input} from '@heroui/input';
import { FaSearch } from "react-icons/fa";
import {useSearchParams, usePathname, useRouter} from 'next/dist/client/components/navigation';

/**
 * Todo:
 * Dodać "chip" do searcha i keyboard skrót focusujący search
 */

export default function Search() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams);

        if (term) params.set('query', term);
        else params.delete('query');

        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pb-16">
            <Input
                isClearable
                label="Search for TV Show or Movie..."
                type="search"
                className="light"
                classNames={{
                    clearButton: "text-default-600"
                }}
                startContent={<FaSearch className={"text-default-600"} />}
                onChange={(e) => { handleSearch(e.target.value); }}
                defaultValue={searchParams.get('query')?.toString()}
                />
        </div>
    )
}