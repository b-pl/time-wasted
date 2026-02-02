'use client';

import {Button} from '@heroui/react';
import {MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight} from "react-icons/md";
import {PositionProps} from '@/app/lib/definitions';
import {usePathname, useSearchParams} from 'next/dist/client/components/navigation';
import {Link} from '@heroui/link';

export default function PaginationArrows({position, pagesCount}: PositionProps) {
    const paginationButtonClass = `
        border-primary/50
        text-3xl text-primary/75
        data-[hover=true]:border-primary
        data-[hover=true]:text-primary
        data-[hover=true]:!bg-slate-700
    `
    const paddingValue: string = position === 'top' ? "pb-6" : "pt-6";

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const createPageURL = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    }

    return (
        <div
            className={"flex gap-x-2 self-end " + paddingValue}
        >
            {/*prev*/}
            <Link
                href={createPageURL(currentPage - 1)}
                isDisabled={currentPage <= 1}
            >
                <Button
                    isIconOnly
                    aria-label="previous"
                    color="default"
                    variant="ghost"
                    className={paginationButtonClass}
                >
                    <MdOutlineKeyboardArrowLeft/>
                </Button>
            </Link>

            {/*next*/}
            <Link
                href={createPageURL(currentPage + 1)}
                isDisabled={currentPage >= pagesCount}
            >
                <Button
                    isIconOnly
                    aria-label="next"
                    color="default"
                    variant="ghost"
                    className={paginationButtonClass}
                >
                    <MdOutlineKeyboardArrowRight/>
                </Button>
            </Link>
        </div>
    )
}