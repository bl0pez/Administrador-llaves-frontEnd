import { useReducer } from 'react';
import { Key, KeyState } from '../interfaces/interfaces';
import { keyReducer } from "@/keys/reducers";

/**
 * Estado inicial del reducer que administra las llaves
*/
const INITIAL_STATE: KeyState = {
    keys: [],
    isLoading: false,
    error: "",
    activeKey: null,
}

export type Action = {
    keyState: KeyState;
    createKey: (key: Key) => void;
    loadKeys: (keys: Key[]) => void;
    onSelectKey: (key: Key) => void;
    deleteKey: (id: string) => void;
    onDeselectKey: () => void;
    updateKey: (key: Key) => void;
    changeStateKey: (id: string) => void;
}

export const useKeys = (): Action => {

    //Reducer
    const [keyState, dispatch] = useReducer(keyReducer, INITIAL_STATE);

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

return {
    //State
    keyState,

    //Metodos
    createKey,
    loadKeys,
    onSelectKey,
    deleteKey,
    onDeselectKey,
    updateKey,
    changeStateKey,
}

}
