import { createContext, useContext, useEffect, useReducer } from 'react';
import { EBorrowedKeyTypes, EReducerTypes, IBorrowedKey, IChildrenProps } from '../interfaces';
import { BorrowedKeyReducer, IBorrowedKeyStateReducer } from '../reducer/BorrowedKeyReducer';
import { getBorrowedKeyRegistration } from '../services/borrowedKeys/getAllBorrowedKeys';


export type TBorrowedKeyContextProps = {
    borrowedKeys: IBorrowedKey[];
    itemCount: number;
    page: number;
    limit: number;
    isLoading: boolean;
    handleChangePage: (newPage: number) => void;
    handleChangeLimit: (newLimit: number) => void;
    createBorrowedKey: (borrowedKey: IBorrowedKey) => void;
    closeBorrowedKey: (borrowedKeyId: string) => void;
}

export const BorrowedKeyContext = createContext({} as TBorrowedKeyContextProps);

const INITIAL_STATE: IBorrowedKeyStateReducer = {
    borrowedKeys: [],
    isLoading: true,
    itemCount: 0,
    limit: 5,
    offset: 0,
    page: 0,
    search: '',
}

export const BorrowedKeyProvider = ({ children }: IChildrenProps) => {

    const [stateKeys, dispatch] = useReducer(BorrowedKeyReducer, INITIAL_STATE);
    const { itemCount, limit, offset, page, search, borrowedKeys, isLoading } = stateKeys;

    const loadBorrowedKeys = async () => {
        const response = await getBorrowedKeyRegistration({ limit, offset, search }); 
        dispatch({type: EBorrowedKeyTypes.LOAD_BORROWED_KEYS, payload: response })
    }

    const handleChangePage = (newPage: number) => {
        dispatch({ type: EBorrowedKeyTypes.CHANGE_PAGE, payload: newPage });
        loadBorrowedKeys();
    }

    const handleChangeLimit = (newLimit: number) => {
        dispatch({ type: EBorrowedKeyTypes.CHANGE_LIMIT, payload: newLimit });
        loadBorrowedKeys();
    }

    const createBorrowedKey = async (borrowedKey: IBorrowedKey) => {
        dispatch({ type: EBorrowedKeyTypes.ADD_BORROWED_KEY, payload: borrowedKey });
        loadBorrowedKeys();
    }

    const closeBorrowedKey = async (borrowedKeyId: string) => {        
        dispatch({ type: EBorrowedKeyTypes.CLOSE_BORROWED_KEY, payload: borrowedKeyId})
    }


    useEffect(() => {
      loadBorrowedKeys();
    }, [])

    return (
        <BorrowedKeyContext.Provider value={{
            borrowedKeys,
            itemCount,
            page,
            limit,
            isLoading,
            handleChangePage,
            handleChangeLimit,
            createBorrowedKey,
            closeBorrowedKey,
        }}>
            {children}
        </BorrowedKeyContext.Provider>
    )

}


export const useBorrowedKeyContext = () => useContext(BorrowedKeyContext);