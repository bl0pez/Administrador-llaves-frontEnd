import { createContext, useContext, useEffect, useReducer } from 'react';

import { keyReducer } from '../reducer/KeyReducer';
import { GetKeys, Key, KeyContextProps, KeyState, KeyTypes } from '../interfaces';
import { ChildrenProps } from '@/common/interfaces';
import { getKeysService } from '../services/key.service';


export const KeyContext = createContext({} as KeyContextProps);

const INITIAL_STATE: KeyState = {
    keys: [],
    isLoading: true,
    itemCount: 0,
    limit: 5,
    offset: 0,
    page: 0,
    search: '',
}

export const KeyProvider = ({ children }: ChildrenProps) => {

    const [stateKeys, dispatch] = useReducer(keyReducer, INITIAL_STATE);
    const { limit, offset, search, page, itemCount } = stateKeys;
    
    const loadKeys = async(data: GetKeys) => {
        dispatch({ type: KeyTypes.LOAD_KEYS, payload: data });
    }

    const handleChangePage = (newPage: number) => {
        dispatch({ type: KeyTypes.CHANGE_PAGE, payload: newPage });
    }

    const handleChangeLimit = (newLimit: number) => {
        dispatch({ type: KeyTypes.CHANGE_LIMIT, payload: newLimit });
    }

    const createKey = (key: Key) => {
        dispatch({type: KeyTypes.ADD_KEY, payload: key });
    }

    const handleSearch = (value: string) => {
        dispatch({type: KeyTypes.SEARCH_KEY, payload: value });
    }

    const findAllKeys = async () => {
        const data = await getKeysService({ limit, offset, search }); 
        loadKeys(data);
    }

    useEffect(() => {
      findAllKeys();
    }, [search, page, limit, itemCount])

    return (
        <KeyContext.Provider value={{
            ...stateKeys,
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