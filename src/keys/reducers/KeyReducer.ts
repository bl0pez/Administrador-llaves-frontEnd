import { Key, KeyState } from "../interfaces"

type KeyAction =
    | { type: 'loadKeys', payload: Key[] }
    | { type: 'onSetActiveKey', payload: Key}
    | { type: 'onSetInactiveKey'}
    | { type: 'newKey', payload: Key }
    | { type: 'updateKey', payload: Key }
    | { type: 'deleteKey', payload: { id: string } }
    | { type: 'setError', payload: string }

// En los reducer siempre se debe de retornar un nuevo estado
// y no una mutación del estado anterior
export const keyReducer = (stateKeys: KeyState, action: KeyAction): KeyState => {
    switch (action.type) {
        case "loadKeys": {
            return {
                ...stateKeys,
                keys: [...action.payload],
                isLoading: true,
            }
        }
        case "newKey": {
            return {
                ...stateKeys,
                keys: [action.payload, ...stateKeys.keys],
                isLoading: true,
                error: ""
            }
        }
        case "onSetActiveKey": {
            return {
                ...stateKeys,
                activeKey: action.payload,
            }
        }
        case "onSetInactiveKey": {
            return {
                ...stateKeys,
                activeKey: null,
            }
        }
        case "updateKey": {
            return {
                ...stateKeys,
                keys: stateKeys.keys.map(key => key._id === action.payload._id ? action.payload : key),
                isLoading: true,
                error: ""
            }
        }
        case "deleteKey": {
            return {
                ...stateKeys,
                keys: stateKeys.keys.filter(key => key._id !== action.payload.id),
            }
        }
        case "setError": {
            return {
                ...stateKeys,
                error: action.payload,
                isLoading: true
            }
        }
        default:
            return stateKeys;
    }
}