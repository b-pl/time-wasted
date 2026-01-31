import {Navbar, NavbarBrand} from '@heroui/navbar';
import Image from 'next/image';
import {Link} from '@heroui/link';

export default function Navigation() {
    return (
        <Navbar
            classNames={{
                wrapper: [
                    "max-w-7xl h-16",
                    "px-16"
                ],
                brand: [
                    "h-full"
                ]
            }}
            position={"static"}
        >
            <NavbarBrand>
                <Link
                    isExternal
                    href="https://www.themoviedb.org/"
                    className={"h-full flex flex-col justify-center"}
                >
                    <div className={"relative h-10 w-full"}>
                        <Image
                            src="tmdb-logo.svg"
                            alt="xD"
                            fill
                            className={"object-contain"}
                        />
                    </div>
                    <span className={"text-tiny"}>Powered by</span>
                </Link>
            </NavbarBrand>
        </Navbar>
    );
}