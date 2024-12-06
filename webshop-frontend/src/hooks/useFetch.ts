import {useState, useEffect} from 'react';

interface FetchOptions {
    method?: string;
    headers?: HeadersInit;
    body?: any;
}

export const useFetch = <T>(url: string, options?: FetchOptions) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(url, {
                    method: options?.method || 'GET',
                    headers: options?.headers || {
                        'Content-Type': 'application/json',
                        ...options?.headers
                    },
                    body: options?.body ? JSON.stringify(options.body) : undefined
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                const json = await response.json();
                setData(json);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, options]);

    return { data, loading, error };
}