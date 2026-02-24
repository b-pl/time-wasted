'use client';
import { useState, useEffect } from 'react';

export function useDataLoaded(fetchFn: () => Promise<any>) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchFn()
            .then((result) => {
                setData(result);
                setIsLoaded(true);  // ✅ DANE GOTOWE!
            })
            .catch(console.error);
    }, []);

    return { isLoaded, data };
}
