import { createContext, useContext, useEffect, useReducer } from 'react';
import { EReducerTypes, IChildrenProps, IGetAllKeys, IKey, IKeyStateReducer } from '../interfaces';
import { keyReducer } from '../reducer/KeyReducer';
import { findAllKeysService } from '../services/keyCreationService';


export type KeyContextProps = {
    stateKeys: IKeyStateReducer;
    loadKeys: (data: IGetAllKeys) => void;
    handleChangePage: (newPage: number) => void;
    handleChangeLimit: (newLimit: number) => void;
    createKey: (key: IKey) => void;
    handleSearch: (value: string) => void;
}

export const KeyContext = createContext({} as KeyContextProps);

const INITIAL_STATE: IKeyStateReducer = {
    keys: [],
    isLoading: true,
    count: 0,
    limit: 5,
    offset: 0,
    page: 0,
    search: '',
}

export const KeyProvider = ({ children }: IChildrenProps) => {

    const [stateKeys, dispatch] = useReducer(keyReducer, INITIAL_STATE);
    const { count, limit, offset, page, search } = stateKeys;
    
    const loadKeys = async(data: IGetAllKeys) => {
        dispatch({ type: EReducerTypes.LOAD_KEYS, payload: data });
    }

    const startLoading = () => {
        dispatch({ type: EReducerTypes.START_LOADING });
    }

    const handleChangePage = (newPage: number) => {
        dispatch({ type: EReducerTypes.CHANGE_PAGE, payload: newPage });
    }

    const handleChangeLimit = (newLimit: number) => {
        dispatch({ type: EReducerTypes.CHANGE_LIMIT, payload: newLimit });
    }

    const createKey = (key: IKey) => {
        dispatch({type: EReducerTypes.ADD_KEY, payload: key });
    }

    const handleSearch = (value: string) => {
        dispatch({type: EReducerTypes.SEARCH_KEY, payload: value });
    }

    const findAllKeys = async () => {
        startLoading();
        const data = await findAllKeysService({ limit, offset, search }); 
        loadKeys(data);
    }

    useEffect(() => {
      findAllKeys();
    }, [limit, offset, page, count, search])

    return (
        <KeyContext.Provider value={{
            stateKeys,
            loadKeys,
            handleChangePage,
            handleChangeLimit,
            createKey,
            handleSearch,
        }}>
            {children}
        </KeyContext.Provider>
    )

}


export const useKeyContext = () => useContext(KeyContext);