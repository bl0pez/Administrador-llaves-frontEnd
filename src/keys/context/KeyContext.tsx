import { createContext, useEffect } from "react";
import { KeyState } from "../interfaces/interfaces";
import { useKeys } from "../hooks/useKeys";
import { getKeys } from "../helpers/fetchKeys";
import { Key } from "../interfaces/fetchAllKeys";

export type KeyContextProps = {
    keyState : KeyState;
    createKey: (key: Key) => void;
    deleteKey: (id: string) => void;
    onSelectKey: (key: Key) => void;
    onDeselectKey: () => void;
}

export const KeyContext = createContext({} as KeyContextProps);

interface Props {
    children: JSX.Element | JSX.Element[];
}


export const KeyProvider = ({ children }: Props) => {

    const { keyState, loadKeys, createKey, deleteKey, onSelectKey, onDeselectKey } = useKeys();
    
    /**
     * Carga las llaves de la base de datos al iniciar la aplicación
     */
    useEffect(() => {
        getKeys()
            .then(keys => loadKeys(keys));
    }, []);

    return (
        <KeyContext.Provider value={{
            keyState,
            createKey,
            deleteKey,
            onSelectKey,
            onDeselectKey,
        }}>
            {children}
        </KeyContext.Provider>
    )

}