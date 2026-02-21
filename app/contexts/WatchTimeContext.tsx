'use client';
import {createContext, useContext, ReactNode, useState} from 'react';

type WatchTimeContextType = {
    totalWatchTime: number;
    addWatchTime: (minutes: number) => void;
    subtractWatchTime: (minutes: number) => void;
    resetWatchTime: () => void;
};

const WatchTimeContext = createContext<WatchTimeContextType | undefined>(undefined);

export function WatchTimeProvider({children}: { children: ReactNode }) {
    // Pobierz czas z localStorage lub 0
    const getStoredTotal = (): number => {
        if (typeof window === 'undefined') return 0;
        try {
            return parseInt(localStorage.getItem('totalWatchTime') || '0', 10);
        } catch {
            return 0;
        }
    };

    // Zresetuj watch time
    const resetWatchTime = () => {
        setTotalWatchTime(0);
        localStorage.setItem('totalWatchTime', '0');
    }

    // Dodaj watch time
    const addWatchTime = (minutes: number) => {
        const newTotal = totalWatchTime + minutes;

        setTotalWatchTime(newTotal);
        localStorage.setItem('totalWatchTime', newTotal.toString());
    }

    // Odejmij watch time
    const subtractWatchTime = (minutes: number) => {
        const newTotal = totalWatchTime - minutes;

        setTotalWatchTime(newTotal);
        localStorage.setItem('totalWatchTime', newTotal.toString());
    }

    const [totalWatchTime, setTotalWatchTime] = useState<number>(getStoredTotal());

    return (
        <WatchTimeContext.Provider value={{
            totalWatchTime,
            addWatchTime,
            subtractWatchTime,
            resetWatchTime
        }}>
            {children}
        </WatchTimeContext.Provider>
    );
}

export const useWatchTime = () => {
    const context = useContext(WatchTimeContext);
    if (!context) {
        throw new Error('useWatchTime must be used inside WatchTimeProvider');
    }
    return context;
};