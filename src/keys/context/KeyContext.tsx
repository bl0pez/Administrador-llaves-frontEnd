import { createContext, useEffect } from "react";
import { KeyState } from "../interfaces/interfaces";
import { useKeys } from "../hooks/useKeys";
import { fetchAllKeys } from "../helpers/fetchAllKeys";

export type KeyContextProps = {
    keyState : KeyState,
}

export const KeyContext = createContext({} as KeyContextProps);

interface Props {
    children: JSX.Element | JSX.Element[];
}


export const KeyProvider = ({ children }: Props) => {

    const { keyState, loadKeys } = useKeys();
    
    useEffect(() => {
        fetchAllKeys()
            .then(keys => loadKeys(keys));
    }, []);

    return (
        <KeyContext.Provider value={{
            keyState,
        }}>
            {children}
        </KeyContext.Provider>
    )

}