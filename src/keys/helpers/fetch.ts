import { useState } from 'react';
import { BorrowedKey, BorrowedKeys } from '../interfaces';
import { keyApi } from '@/api/keyApi';

type FetchAction = {
    isLoading: boolean;
    error: boolean;
    items?: BorrowedKey | BorrowedKey[];
    fetchApi: (url: string, method: string) => any;
}

export const fetch = (): FetchAction => {

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [items, setItems] = useState<BorrowedKey | BorrowedKey[]>([]);

    const fetchApi = async (url: string, method: string) => {
        try {
            const resp = await keyApi({url, method});
            setIsLoading(false);
            setItems(resp.data.borrowedKeys);
        } catch (error) {
            setIsLoading(false);
            setError(true);
        }
    }

    return {
        fetchApi,
        isLoading,
        error,
        items,
    }
}
