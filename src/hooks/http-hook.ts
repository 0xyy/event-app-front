import { useCallback, useState } from 'react';
import { CreateEventRequest, EditEventRequest } from 'types';

export type RequestBody = CreateEventRequest | EditEventRequest | null;

export const useHttp = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>();

    let statusError = 500;

    const sendRequest = useCallback(async (
        url: string,
        method = 'GET',
        body: RequestBody = null,
        headers = {
            'Content-Type': 'application/json',
        },
    ) => {
        try {
            setIsLoading(true);

            const res = await fetch(`http://localhost:3001${url}`, {
                method,
                body: body ? JSON.stringify(body) : null,
                headers,
            });

            const data = await res.json();

            setIsLoading(false);

            if (!data.isSuccess) {
                setError(data.message);
                return data;
            }

            return data;
        } catch (err: any) {
            setError(statusError === 500 ? 'Przepraszamy, spróbuj ponownie później.' : err.message);
            setIsLoading(false);
            throw err;
        }
    },[]);

    const clearError = () => {
        setError(null);
    };

    return {
        sendRequest,
        error,
        setError,
        clearError,
        isLoading,
        setIsLoading,
    };
};