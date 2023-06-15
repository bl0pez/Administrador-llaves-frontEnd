import { createContext, useContext, useEffect } from "react";
import { KeyState } from "../interfaces/interfaces";
import { useKeys } from "../hooks/useKeys";
import { fetchGetKey } from "../helpers/fetchKeys";
import { Key } from "../interfaces/fetchAllKeys";

export type KeyContextProps = {
    keyState : KeyState;
    createKey: (key: Key) => void;
    deleteKey: (id: string) => void;
    onSelectKey: (key: Key) => void;
    onDeselectKey: () => void;
    updateKey: (key: Key) => void;
}

export const KeyContext = createContext({} as KeyContextProps);

interface Props {
    children: JSX.Element | JSX.Element[];
}


export const KeyProvider = ({ children }: Props) => {

    const { keyState, loadKeys, createKey, deleteKey, onSelectKey, onDeselectKey, updateKey } = useKeys();
    
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
            updateKey
        }}>
            {children}
        </KeyContext.Provider>
    )

}


export const useKeyContext = () => useContext(KeyContext);