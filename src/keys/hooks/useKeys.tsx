import { useReducer } from 'react';
import { KeyState } from "../interfaces/interfaces"
import { keyReducer } from "../context/KeyReducer";
import { Key } from '../interfaces/fetchAllKeys';

/**
 * Estado inicial del reducer que administra las llaves
 */
const INITIAL_STATE: KeyState = {
    keys: [],
    isLoading: false,
    error: "",
    activeKey: null,
}

export const useKeys = () => {

    const [keyState, dispatch] = useReducer(keyReducer, INITIAL_STATE);

    const loadKeys = (keys: Key[]) => {
        dispatch({ type: 'loadKeys', payload: keys });
    }

    //Crea una nueva key
    const createKey = (key: Key) => {
        dispatch({type: 'newKey', payload: key });
    }

    //Elimina una key
    const deleteKey = (id: string) => {
        dispatch({type: 'deleteKey', payload: {id} });
    }

    const onSelectKey = (key: Key) => {
        dispatch({ type: 'onSetActiveKey', payload: key });
    }

    const updateKey = (key: Key) => {
        dispatch({type: 'updateKey', payload: key });
    }

return {
    //State
    keyState,

    //Metodos
    createKey,
    loadKeys,
    onSelectKey,
    deleteKey,
    updateKey,
}

}
