'use client';

import {Button} from '@heroui/react';
import {MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight} from "react-icons/md";
import {PositionProps} from '@/app/lib/definitions';
import {usePathname, useSearchParams, useRouter} from 'next/dist/client/components/navigation';

export default function PaginationArrows({position, pagesCount}: PositionProps) {
    const paginationButtonClass = `
        border-primary/50
        text-3xl text-primary/75
        data-[hover=true]:border-primary
        data-[hover=true]:text-primary
        data-[hover=true]:!bg-slate-700
    `
    const paddingValue: string = position === 'top' ? "pb-6" : "pt-6";

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const handlePageChange = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        const url = `${pathname}?${params.toString()}`;

        router.push(url, {scroll: position === 'top' ? false : true});
    }

    return (
        <div
            className={"flex gap-x-2 self-end " + paddingValue}
        >
            {/*prev*/}
            <Button
                isIconOnly
                aria-label="previous"
                color="default"
                variant="ghost"
                className={paginationButtonClass}
                isDisabled={currentPage <= 1}
                onPress={() => handlePageChange(currentPage - 1)}
            >
                <MdOutlineKeyboardArrowLeft/>
            </Button>

            {/*next*/}
            <Button
                isIconOnly
                aria-label="next"
                color="default"
                variant="ghost"
                className={paginationButtonClass}
                isDisabled={currentPage >= pagesCount}
                onPress={() => handlePageChange(currentPage + 1)}
            >
                <MdOutlineKeyboardArrowRight/>
            </Button>
        </div>
    )
}