import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { BorrowedKey, ChildrenProps, KeyHistory } from '../interfaces';
import { keyApi } from '@/api/keyApi';
import { INITIAL_STATE, KeyHistoryReducer, KeyHistoryInitialState } from '../reducers';


interface KeyHistoryContextProps extends KeyHistoryInitialState {
    addKeyHistory: (key: BorrowedKey) => void;
}

const KeyHistoryContext = createContext({} as KeyHistoryContextProps);

//Cargamos el historial de llaves devueltas
const getKeysHistory = async(): Promise<KeyHistory> => {
    try {
        const { data } = await keyApi.get<KeyHistory>('/keyHistory');
        return data;
    } catch (error : any) {
        throw new Error(error);
    }
}

export const KeyHistoryProvider = ({ children }: ChildrenProps) => {


    const [KeyHistoryState, dispatch] = useReducer(KeyHistoryReducer, INITIAL_STATE);

    useEffect(() => {
        getKeysHistory()
            .then((keys) => dispatch({ type: 'loadKeysHistory', payload: {keys: keys.keys, count: keys.count}}));
    }, []);

    const addKeyHistory = (key: BorrowedKey) => {
        dispatch({ type: 'addKeyHistory', payload: key });
    }

    return (
        <KeyHistoryContext.Provider value={{
            keysHistory: KeyHistoryState.keysHistory,
            count: KeyHistoryState.count,
            isLoading: KeyHistoryState.isLoading,
            error: KeyHistoryState.error,
            totalPage: KeyHistoryState.totalPage,
            addKeyHistory,
        }}>
            {children}
        </KeyHistoryContext.Provider>
    )
}


export const useKeyHistoryContext = () => useContext(KeyHistoryContext);