'use client';

import {useEffect, useRef, useCallback} from 'react';
import {Card, CardBody} from '@heroui/card';
import { CountUp } from 'countup.js';
import {useWatchTime} from '@/app/contexts/WatchTimeContext';

interface CountUpInstance {
    update: (endVal: number) => void;
    error: string | null;
    start: (callback?: (args?: any) => any) => void;
    destroy: () => void;
}

export default function Counter() {
    const { totalWatchTime, addWatchTime, resetWatchTime } = useWatchTime();
    const timeRef = useRef<HTMLHeadingElement>(null);
    const timeAnimation = useRef<CountUpInstance | null>(null);
    const isInitialized = useRef(false);

    const initCountUp = useCallback(async () => {
        if (timeRef.current && !isInitialized.current) {
            timeAnimation.current = new CountUp(timeRef.current, 0);

            if (!timeAnimation.current.error) {
                timeAnimation.current.start();
                isInitialized.current = true;

                timeAnimation.current.update(totalWatchTime);
            }
        }
    }, []);

    useEffect(() => {
        initCountUp();

        return () => {
            timeAnimation.current?.destroy?.();  // Cleanup
        };
    }, [initCountUp]);

    useEffect(() => {
        if (timeAnimation.current && isInitialized.current) {
            timeAnimation.current.update(totalWatchTime);
        }
    }, [totalWatchTime]);

    return (
        <div
            className={`flex items-center justify-center w-full mb-6 lg:mb-12` +
                        ` flex-col`}
        >
            <Card className={"w-full"}>
                <CardBody
                    className={`flex flex-col items-center justify-center w-full gap-y-2`}
                >
                    <span className={"text-3xl"}>You've wasted</span>
                    <span ref={timeRef} className={"text-5xl lg:text-9xl text-red-500"} suppressHydrationWarning>
                        {totalWatchTime}
                    </span>
                    <span className={"text-3xl"}>minutes watching tv</span>
                </CardBody>
            </Card>
        </div>
    )
}