import { createContext } from "react";
import { KeyState } from "../interfaces/interfaces";
import { useKeys } from "../hooks/useKeys";

export type KeyContextProps = {
    keyState : KeyState,
    filterKeys: (name: string) => void,
}

export const KeyContext = createContext({} as KeyContextProps);

interface Props {
    children: JSX.Element | JSX.Element[];
}


export const KeyProvider = ({ children }: Props) => {

    const { keyState, filterKeys } = useKeys();
    

    return (
        <KeyContext.Provider value={{
            keyState,
            filterKeys,
        }}>
            {children}
        </KeyContext.Provider>
    )

}