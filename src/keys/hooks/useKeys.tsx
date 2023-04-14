import { useReducer, useEffect } from 'react';
import { KeyState } from "../interfaces/interfaces"
import { keyReducer } from "../context/KeyReducer";
import { fetchAllKeys } from '../helpers/fetchAllKeys';

const INITIAL_STATE: KeyState = {
    keys: [],
    isLoading: false,
    error: "",
}

export const useKeys = () => {

    const [keyState, dispatch] = useReducer(keyReducer, INITIAL_STATE);

    useEffect(() => {
        fetchAllKeys()
            .then(keys => dispatch({ type: 'loadKeys', payload: keys }))
    }, []);

    
    

    return {
        keyState,
    }

}
