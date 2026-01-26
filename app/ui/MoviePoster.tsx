'use client';

import {Card, CardFooter} from '@heroui/card';
import {Button} from '@heroui/react';
import {useState, useRef} from 'react';
import {FaCheckCircle} from 'react-icons/fa';
import Poster from '@/app/ui/Poster';

export default function MoviePoster({ posterURL }: { posterURL: string }) {
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const ref = useRef(null);

    return (
        <div className={"cardWrapper relative"}>
            <Card
                isPressable
                radius="lg"
                onPress={() => setIsChecked(!isChecked)}
            >
                <FaCheckCircle
                    size={20}
                    className={`
                    text-success absolute top-2 right-2 transition-all duration-300 ease-in-out
                    ${isChecked
                        ? 'opacity-100 scale-100 translate-y-0 rotate-0'
                        : 'opacity-0 scale-75 -translate-y-2 -rotate-12'
                    }
                `}

                />

                <Poster url={posterURL} />
            </Card>
            {/* Kontener udaje CardFooter. Unikamy zagnieżdżania buttona w buttonie */}
            <div
                className="p-3 h-auto w-full items-center overflow-hidden color-inherit subpixel-antialiased rounded-b-large absolute bottom-0.5 flex"
            >
                <Button
                    className="text-tiny text-white bg-black/60 flex-1"
                    color="default"
                    radius="lg"
                    size="sm"
                    variant="flat"
                    onPress={() => setIsChecked(!isChecked)}
                >
                    Add by season
                </Button>
                <Button
                    className="text-tiny text-white bg-black/60 flex-1"
                    color="default"
                    radius="lg"
                    size="sm"
                    variant="flat"
                    onPress={() => setIsChecked(!isChecked)}

                >
                    Add all seasons
                </Button>
            </div>
        </div>
    )
}