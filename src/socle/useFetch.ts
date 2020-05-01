import { useState, useEffect } from 'react';

export const useFetch = <T>(url: string): [T | undefined, boolean] => {
    const [data, setData] = useState<T>();
    const [loading, setLoading] = useState(true);
    const fetchUrl = async (): Promise<void> => {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setLoading(false);
    };
    useEffect(() => {
        fetchUrl();
    }, [url]);
    return [data, loading];
};
