import { createContext, useContext, useEffect } from 'react';
import { BorrowedKey, BorrowrdKeyState, ChildrenProps } from '../interfaces';
import { useBorrowrdKeys } from '../hooks';
import { Action } from '../hooks/useBorrowrdKeys';

interface ContextProps extends Action {

}

const BorrowedKeyContext = createContext({} as ContextProps);

export const BorrowedKeyProvider = ({ children }: ChildrenProps) => {

    const { getBorrowedKeys, borrowrdKeyState, createBorrowedKey, updateStatusBorrowedKey } = useBorrowrdKeys();


    return (
        <BorrowedKeyContext.Provider value={{
            getBorrowedKeys,
            borrowrdKeyState,
            createBorrowedKey,
            updateStatusBorrowedKey
        }}>
            {children}
        </BorrowedKeyContext.Provider>
    )
}

export const useBorrowedKeyContext = () => useContext(BorrowedKeyContext);