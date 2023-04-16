import { createContext, useEffect } from "react";
import { KeyState } from "../interfaces/interfaces";
import { useKeys } from "../hooks/useKeys";
import { fetchAllKeys } from "../helpers/fetchAllKeys";
import { Key } from "../interfaces/fetchAllKeys";

export type KeyContextProps = {
    keyState : KeyState;
    createKey: (key: Key) => void;
}

export const KeyContext = createContext({} as KeyContextProps);

interface Props {
    children: JSX.Element | JSX.Element[];
}


export const KeyProvider = ({ children }: Props) => {

    const { keyState, loadKeys, createKey } = useKeys();
    
    useEffect(() => {
        fetchAllKeys()
            .then(keys => loadKeys(keys));
    }, []);

    return (
        <KeyContext.Provider value={{
            keyState,
            createKey
        }}>
            {children}
        </KeyContext.Provider>
    )

}