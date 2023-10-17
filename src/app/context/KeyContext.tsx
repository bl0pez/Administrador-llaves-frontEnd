import { createContext, useContext, useEffect, useReducer } from 'react';
import { EReducerTypes, IChildrenProps, IGetAllKeys, IKey, IKeyStateReducer } from '../interfaces';
import { keyReducer } from '../reducer/KeyReducer';
import { findAllKeysService } from '../services/keyCreationService';


export type KeyContextProps = {
    stateKeys: IKeyStateReducer;
    createKey: (key: IKey) => void;
    loadKeys: ({count, keys}: IGetAllKeys) => void;
    onSelectKey: (key: IKey) => void;
    deleteKey: (id: string) => void;
    onDeselectKey: () => void;
    updateKey: (key: IKey) => void;
    changeStateKey: (id: string) => void;
}

export const KeyContext = createContext({} as KeyContextProps);

const INITIAL_STATE: IKeyStateReducer = {
    keys: [],
    isLoading: false,
    count: 0,
}

export const KeyProvider = ({ children }: IChildrenProps) => {

    const [stateKeys, dispatch] = useReducer(keyReducer, INITIAL_STATE);

    
    
    const getKeys = async() => {
        const data = await findAllKeysService();
        loadKeys(data);
    }
    
    
    useEffect(() => {
        getKeys();
    }, []);

    const loadKeys = async({count, keys}: IGetAllKeys) => {
        dispatch({ type: EReducerTypes.LOAD_KEYS, payload: {count, keys} });
    }

    const createKey = (key: IKey) => {
        dispatch({type: EReducerTypes.ADD_KEY, payload: key });
    }

    //Elimina una key
    const deleteKey = (id: string) => {
        dispatch({type: 'deleteKey', payload: {id} });
    }

    //Selecciona una llave
    const onSelectKey = (key: IKey) => {
        dispatch({ type: 'onSetActiveKey', payload: key });
    }

    //Deseclecciona una llave
    const onDeselectKey = () => {
        dispatch({ type: 'onSetInactiveKey' });
    }

    const updateKey = (key: IKey) => {
        dispatch({type: 'updateKey', payload: key });
    }

    const changeStateKey = (id: string) =>  {
        dispatch({type:'changeStatus', payload: id });
    }

    return (
        <KeyContext.Provider value={{
            stateKeys,
            createKey,
            deleteKey,
            onSelectKey,
            onDeselectKey,
            updateKey,
            changeStateKey,
            loadKeys,
        }}>
            {children}
        </KeyContext.Provider>
    )

}


export const useKeyContext = () => useContext(KeyContext);