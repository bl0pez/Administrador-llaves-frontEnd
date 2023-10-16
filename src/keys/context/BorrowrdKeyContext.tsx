import { createContext, useContext, useEffect, useReducer } from 'react';
import { BorrowedKey, BorrowedKeys, BorrowrdKeyState, ChildrenProps } from '../interfaces';
import { BorrowrdKeyReducer } from '../reducers/BorrowrdKeyReducer';
import { keyApi } from '@/api/keyApi';

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

    useEffect(() => {
        loadBorrowedKeys();
    }, [])
    
    const startLoading = () => {
        dispatch({ type: 'startLoadingBorrowrdKeys'})
    }

    //Cargamos las llaves prestadas
    const loadBorrowedKeys = async():Promise<void> => {        
        try {
            const { data } = await keyApi.get<BorrowedKeys>('/borrowedKeys');
            dispatch({ type: 'loadBorrowrdKeys', payload: data.borrowedKeys});
        } catch (error) {
            errorBorrowrdKey();
        }
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