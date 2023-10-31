import { createContext, useContext, useEffect, useReducer } from 'react';
import { BorrowedKey, BorrowedKeyContextProps, BorrowedKeyState, BorrowedKeyTypes } from '../interfaces';
import { BorrowedKeyReducer } from '../reducer/BorrowedKeyReducer';
import { ChildrenProps } from '@/common/interfaces';
import { getBorrowedKeysService } from '../services/borrowdKey.service';

export const BorrowedKeyContext = createContext({} as BorrowedKeyContextProps);

const INITIAL_STATE: BorrowedKeyState = {
    borrowedKeys: [],
    isLoading: true,
    itemCount: 0,
    limit: 5,
    offset: 0,
    page: 0,
    search: '',
}

export const BorrowedKeyProvider = ({ children }: ChildrenProps) => {

    const [stateKeys, dispatch] = useReducer(BorrowedKeyReducer, INITIAL_STATE);
    const { itemCount, limit, offset, page, search, borrowedKeys, isLoading } = stateKeys;

    const loadBorrowedKeys = async () => {
        const response = await getBorrowedKeysService({ limit, offset, search }); 
        dispatch({type: BorrowedKeyTypes.LOAD_BORROWED_KEYS, payload: response })
    }

    const handleChangePage = (newPage: number) => {
        dispatch({ type: BorrowedKeyTypes.CHANGE_PAGE, payload: newPage });
        loadBorrowedKeys();
    }

    const handleChangeLimit = (newLimit: number) => {
        dispatch({ type: BorrowedKeyTypes.CHANGE_LIMIT, payload: newLimit });
        loadBorrowedKeys();
    }

    const createBorrowedKey = async (borrowedKey: BorrowedKey) => {
        dispatch({ type: BorrowedKeyTypes.ADD_BORROWED_KEY, payload: borrowedKey });
        loadBorrowedKeys();
    }

    const closeBorrowedKey = async (borrowedKeyId: string) => {        
        dispatch({ type: BorrowedKeyTypes.CLOSE_BORROWED_KEY, payload: borrowedKeyId})
        loadBorrowedKeys();
    }

    const searchBorrowedKey = (value: string) => {
        dispatch({ type: BorrowedKeyTypes.SEARCH_BORROWED_KEY, payload: value });
    }


    useEffect(() => {
      loadBorrowedKeys();
    }, [search])

    return (
        <BorrowedKeyContext.Provider value={{
            borrowedKeys,
            itemCount,
            page,
            limit,
            isLoading,
            closeBorrowedKey,
            createBorrowedKey,
            handleChangeLimit,
            handleChangePage,
            searchBorrowedKey,
        }}>
            {children}
        </BorrowedKeyContext.Provider>
    )

}


export const useBorrowedKeyContext = () => useContext(BorrowedKeyContext);