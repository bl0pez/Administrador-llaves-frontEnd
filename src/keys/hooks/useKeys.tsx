import { useReducer } from 'react';
import { KeyState } from "../interfaces/interfaces"
import { keyReducer } from "../context/KeyReducer";
import { Key } from '../interfaces/fetchAllKeys';

const INITIAL_STATE: KeyState = {
    keys: [],
    isLoading: false,
    error: "",
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

return {
    keyState,

    //Metodos
    createKey,
    loadKeys,
    deleteKey
}

}
