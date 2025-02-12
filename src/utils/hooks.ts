import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { useEffect, useState } from 'react';

// Este hook se comporta igual que useSelector, pero ya trae el tipado de RootState
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


interface FetchState<T> {
    data: T | [];
    loading: boolean;
    error: unknown;
    setData: React.Dispatch<React.SetStateAction<T | []>>;
}

export function useFetch<T>(fetchFunction: () => Promise<T>, reload: boolean): FetchState<T>{
    const [data, setData] = useState<T | []>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        setLoading(true);

        fetchFunction()
            .then((result) => {
                setData(result);
                setError(null);
            })
            .catch((err) => {
                setError(err);
                setData([]);
            })
            .finally(() => {
                setLoading(false)
            })
    }, [fetchFunction, reload]);

    return {data, loading, error, setData}
}