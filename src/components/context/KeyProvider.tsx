import { useEffect, useReducer } from 'react';
import { KeyContext } from './KeyContext';
import { keyReducer } from './KeyReducer';
import { Key, KeyState } from '../../interfaces/interfaces';
import { keyApi } from '../../api/keyApi';

const INITIAL_STATE: KeyState = {
    keys: [],
    isLoading: false,
    error: "",
}


interface Props {
    children: JSX.Element | JSX.Element[];
}

export const KeyProvider = ({ children }: Props) => {

    const [keyState, dispatch] = useReducer(keyReducer, INITIAL_STATE);

    const onGetKeys = async() => {

        try {
            
            const { data } = await keyApi.get('/keys');
            dispatch({ type: 'loadKeys', payload: data.keys });

        } catch (error) {
            
            console.log(error);
            dispatch({ type: 'setError', payload: 'Error al cargar las llaves' });

        }

    }

    const filterKeys = (name: string) => {
        if (name.length === 0) {
            onGetKeys();
        }else{
            dispatch({ type: 'filterKeys', payload: name });
        }
        
    }

    useEffect(() => {
        onGetKeys();
    }, []);

    return (
        <KeyContext.Provider value={{
            keyState,
            filterKeys
        }}>
            {children}
        </KeyContext.Provider>
    )

}