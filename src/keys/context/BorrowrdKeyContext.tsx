import { createContext, useContext, useEffect } from 'react';
import { BorrowedKey, BorrowrdKeyState, ChildrenProps } from '../interfaces';
import { useBorrowrdKeys } from '../hooks';
import { Action } from '../hooks/useBorrowrdKeys';

type ContextProps = {
    borrowrdKeyState: BorrowrdKeyState;
}

const BorrowedKeyContext = createContext({} as ContextProps);

type BorrowedKeyContextProps = {
    state: BorrowedKey[];
}


export const BorrowedKeyProvider = ({ children }: ChildrenProps) => {

    const { getBorrowedKeys, borrowrdKeyState } = useBorrowrdKeys();

    useEffect(() => {
        getBorrowedKeys();
    }, [])


    return (
        <BorrowedKeyContext.Provider value={{
            borrowrdKeyState
        }}>
            {children}
        </BorrowedKeyContext.Provider>
    )
}

export const useBorrowedKeyContext = () => useContext(BorrowedKeyContext);