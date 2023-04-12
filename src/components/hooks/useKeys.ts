import { useContext } from "react"
import { KeyContext } from "../context/KeyContext";

export const useKeys = () => {
 
    const { keyState, filterKeys } = useContext(KeyContext);

    return {
        keys: keyState.keys,
        isLoading: keyState.isLoading,
        error: keyState.error,
        filterKeys
    }

}
