import { Key } from "../interfaces/fetchAllKeys"
import { KeyState } from "../interfaces/interfaces"

type KeyAction = 
//Carga las llaves
    | { type: 'loadKeys', payload: Key[]}
//Agrega una llave
    | { type: 'newKey', payload: Key }
    | { type: 'setError', payload: string }
    | { type: 'toggleKey', payload: { id: string } }

// En los reducer siempre se debe de retornar un nuevo estado
// y no una mutación del estado anterior
export const keyReducer = ( stateKeys: KeyState, action: KeyAction ): KeyState => {
    switch ( action.type ) {
        case "newKey":{
            return {
                keys: [ action.payload, ...stateKeys.keys ],
                isLoading: true,
                error: ""
            }
        }
        case "loadKeys":{
            return {
                ...stateKeys,
                keys: [ ...action.payload ],
                isLoading: true,
            }
        }
        case "setError":{
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