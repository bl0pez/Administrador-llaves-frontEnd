import { createContext, useContext, useEffect, useReducer } from 'react';
import { ChildrenProps, Key, KeyState } from "../interfaces/interfaces";
import { fetchGetKey } from "../helpers/fetchKeys";
import { keyReducer } from "../reducers";


export type KeyContextProps = {
    keyState: KeyState;
    createKey: (key: Key) => void;
    loadKeys: (keys: Key[]) => void;
    onSelectKey: (key: Key) => void;
    deleteKey: (id: string) => void;
    onDeselectKey: () => void;
    updateKey: (key: Key) => void;
    changeStateKey: (id: string) => void;
}

export const KeyContext = createContext({} as KeyContextProps);

const INITIAL_STATE: KeyState = {
    keys: [],
    isLoading: false,
    error: "",
    activeKey: null,
}

export const KeyProvider = ({ children }: ChildrenProps) => {

    const [keyState, dispatch] = useReducer(keyReducer, INITIAL_STATE);

    /**
     * Carga las llaves de la base de datos al iniciar la aplicación
     */
    useEffect(() => {
        fetchGetKey()
            .then(keys => loadKeys(keys));
    }, []);

    //Cargar llaves
    const loadKeys = async(keys: Key[]) => {
        dispatch({ type: 'loadKeys', payload: keys });
    }

    //Crea una nueva llave
    const createKey = (key: Key) => {
        dispatch({type: 'newKey', payload: key });
    }

    //Elimina una key
    const deleteKey = (id: string) => {
        dispatch({type: 'deleteKey', payload: {id} });
    }

    //Selecciona una llave
    const onSelectKey = (key: Key) => {
        dispatch({ type: 'onSetActiveKey', payload: key });
    }

    //Deseclecciona una llave
    const onDeselectKey = () => {
        dispatch({ type: 'onSetInactiveKey' });
    }

    const updateKey = (key: Key) => {
        dispatch({type: 'updateKey', payload: key });
    }

    const changeStateKey = (id: string) =>  {
        dispatch({type:'changeStatus', payload: id });
    }

    return (
        <KeyContext.Provider value={{
            keyState,
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