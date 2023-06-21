import { createContext, useContext, useReducer } from 'react';
import { BorrowedKey, BorrowrdKeyState, ChildrenProps } from '../interfaces';
import { BorrowrdKeyReducer } from '../reducers/BorrowrdKeyReducer';

interface ContextProps {
    borrowrdKeyState: BorrowrdKeyState;
    loadBorrowedKeys: (borrowrdKeys: BorrowedKey[]) => void;
    newBorrowrdKey: (borrowrdKey: BorrowedKey) => void;
    startLoading: () => void;
    errorBorrowrdKey: () => void;
    updateBorrowrdKey: (borrowrdKey: BorrowedKey) => void;
}

const BorrowedKeyContext = createContext({} as ContextProps);

const INITIAL_STATE: BorrowrdKeyState = {
    borrowedKeys: [],
    isLoading: true,
    error: false,
}

export const BorrowedKeyProvider = ({ children }: ChildrenProps) => {

    const [borrowrdKeyState, dispatch] = useReducer(BorrowrdKeyReducer, INITIAL_STATE);
    
    const startLoading = () => {
        dispatch({ type: 'startLoadingBorrowrdKeys'})
    }

    const loadBorrowedKeys = (borrowrdKeys: BorrowedKey[]) => {
        dispatch({ type: 'loadBorrowrdKeys', payload: borrowrdKeys})
    }

    const newBorrowrdKey = (borrowrdKey: BorrowedKey) => {
        dispatch({ type: 'addBorrowrdKey', payload: borrowrdKey });
    }

    const updateBorrowrdKey = (borrowrdKey: BorrowedKey) => {
        dispatch({ type: 'updateStateBorrowedKey', payload: borrowrdKey });
    }

    const errorBorrowrdKey = () => {
        dispatch({ type: 'errorBorrowrdKeys' });
    }



    return (
        <BorrowedKeyContext.Provider value={{
            //States
            borrowrdKeyState,

            //Functions
            startLoading,
            newBorrowrdKey,
            loadBorrowedKeys,
            errorBorrowrdKey,
            updateBorrowrdKey,
        }}>
            {children}
        </BorrowedKeyContext.Provider>
    )
}

export const useBorrowedKeyContext = () => useContext(BorrowedKeyContext);