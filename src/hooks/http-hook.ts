import { useCallback, useState } from 'react';

export const useHttp = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [info, setInfo] = useState<string | null>();

    let statusError = 500;

    const sendRequest = useCallback(async (
        url: string,
        method = 'GET',
        body: any,
        headers = {},
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
                setInfo(data.message);
                return data;
            }

            return data;
        } catch (err: any) {
            setInfo(statusError === 500 ? 'Sorry, try again later.' : err.message);
            setIsLoading(false);
            throw err;
        }
    },[]);

    const clearInfo = () => {
        setInfo(null);
    };

    return {
        sendRequest,
        info,
        setInfo,
        clearInfo,
        isLoading,
        setIsLoading,
    };
};