'use client';

import {Input} from '@heroui/input';
import {FaSearch} from "react-icons/fa";
import {useSearchParams, usePathname, useRouter} from 'next/dist/client/components/navigation';
import {useDebouncedCallback} from 'use-debounce';
import {useRef, useEffect, useState} from 'react';
import {Kbd} from "@heroui/kbd";


/**
 * Todo:
 * Dodać "chip" do searcha i keyboard skrót focusujący search
 */

export default function Search() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();
    const inputRef = useRef(null);
    const [isFocused, setFocused] = useState(false);
    const isMac = navigator.platform.toUpperCase().includes('MAC');
    const searchKbd = isFocused ?
        <Kbd>ESC</Kbd> :
        <Kbd keys={isMac ? ["command"] : ["ctrl"]} className="light">K</Kbd>

    useEffect(() => {
        const handleKeyDown = (event: any) => {
            // CMD + K -> active search
            const searchShortcutPressed =
                (isMac && event.metaKey && event.key.toLowerCase() === 'k') ||
                (!isMac && event.ctrlKey && event.key.toLowerCase() === 'k');

            if (searchShortcutPressed) {
                event.preventDefault();
                if (inputRef.current) {
                    inputRef.current.focus();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);

        if (term) params.set('query', term);
        else params.delete('query');

        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pb-16 relative">
            <Input
                ref={inputRef}
                isClearable
                label="Search for TV Show or Movie..."
                type="text"
                className="light"
                classNames={{
                    clearButton: "text-default-600 opacity-70",
                    input: "cursor-pointer",
                    inputWrapper: "data-[hover=true]:!cursor-pointer",
                }}
                startContent={<FaSearch className={"text-default-600"} />}
                endContent={searchKbd}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                defaultValue={searchParams.get('query')?.toString()}
                minLength={2}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
        </div>
    )
}