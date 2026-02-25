import {Navbar, NavbarBrand} from '@heroui/navbar';
import Image from 'next/image';
import {Link} from '@heroui/link';

export default function PageNavbar() {
    return (
        <Navbar
            classNames={{
                wrapper: [
                    "max-w-full lg:max-w-7xl h-16",
                    "px-8 lg:px-16"
                ],
                brand: [
                    "h-full"
                ]
            }}
            position={"static"}
        >
            <NavbarBrand
                className={`max-w-full whitespace-normal`}
            >
                <Link
                    isExternal
                    href="https://www.themoviedb.org/"
                    className={"h-full flex flex-col justify-center"}
                >
                    <div className={"relative h-10 w-full min-w-[100px]"}>
                        <Image
                            src="tmdb-logo.svg"
                            alt="xD"
                            fill
                            className={"object-contain relative"}
                        />
                    </div>
                </Link>
                <span
                    className={
                        "text-tiny px-2 flex items-end " +
                        "h-full flex-col justify-center " +
                        "sm:h-10 sm:flex-row sm:justify-end "
                    }
                >
                    This product uses the TMDB API but is not endorsed or certified by TMDB.
                </span>
            </NavbarBrand>
        </Navbar>
    );
}

//{/*     h-full flex flex-col justify-center*/}