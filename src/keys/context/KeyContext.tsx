import { createContext, useContext, useEffect } from "react";
import { ChildrenProps, KeyState } from "../interfaces/interfaces";
import { Action, useKeys } from "../hooks/useKeys";
import { fetchGetKey } from "../helpers/fetchKeys";


interface KeyContextProps extends Action {

}

export const KeyContext = createContext({} as KeyContextProps);



export const KeyProvider = ({ children }: ChildrenProps) => {

    const { keyState, loadKeys, createKey, deleteKey, onSelectKey, onDeselectKey, updateKey, changeStateKey } = useKeys();
    
    /**
     * Carga las llaves de la base de datos al iniciar la aplicación
     */
    useEffect(() => {
        fetchGetKey()
            .then(keys => loadKeys(keys));
    }, []);

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