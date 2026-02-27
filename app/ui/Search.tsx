'use client';

import {Input} from '@heroui/input';
import {FaSearch} from "react-icons/fa";
import {useSearchParams, usePathname, useRouter} from 'next/dist/client/components/navigation';
import {useDebouncedCallback} from 'use-debounce';
import {useRef, useEffect, useState} from 'react';
import {Kbd} from "@heroui/kbd";

export default function Search() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const inputRef = useRef(null);
    const [value, setValue] = useState(searchParams.get('query') || '');
    const [isFocused, setFocused] = useState(false);

    const isMac = navigator.platform.toUpperCase().includes('MAC');
    const searchKbd = isFocused ?
        <Kbd className={"hidden md:flex"}>ESC</Kbd> :
        <Kbd keys={isMac ? ["command"] : ["ctrl"]} className={"light hidden md:flex"}>K</Kbd>

    useEffect(() => {
        const handleKeyDown = (event: any) => {
            // CMD + K -> activate search
            const searchShortcutPressed =
                (isMac && event.metaKey && event.key.toLowerCase() === 'k') ||
                (!isMac && event.ctrlKey && event.key.toLowerCase() === 'k');
            if (searchShortcutPressed) {
                event.preventDefault();
                if (inputRef.current) {
                    inputRef.current.focus();
                    inputRef.current.select();
                }
            }

            // Escape -> deactivate search
            if (isFocused && event.key === 'Escape') {
                event.preventDefault();

                if (inputRef.current) {
                    inputRef.current.blur();
                    setFocused(false);
                }
            }

            // Enter -> MOBILE ONLY - deactivate keyboard (input blur)
            if (event.key === 'Enter') {
                event.preventDefault();
                if (window.innerWidth >= 768) return false;

                if (inputRef.current) {
                    inputRef.current.blur();
                    setFocused(false);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isFocused]);

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');

        if (term) params.set('query', term);
        else params.delete('query');

        const url = `${pathname}?${params.toString()}`;
        router.push(url, {scroll: false});
    }, 300);

    return (
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pb-6 lg:pb-16 relative">
            <Input
                ref={inputRef}
                value={value}
                onValueChange={setValue}
                label="Search for TV Show or Movie..."
                type="text"
                className="light"
                classNames={{
                    clearButton: "text-default-600 opacity-70",
                    input: "cursor-pointer",
                    inputWrapper: "data-[hover=true]:!cursor-pointer border-2 border-primary/50 focus-within:border-primary",
                }}
                startContent={<FaSearch className={"text-default-600"} />}
                endContent={searchKbd}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                minLength={2}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}

            />
        </div>
    )
}