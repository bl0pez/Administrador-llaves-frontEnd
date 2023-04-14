import { Key } from "../interfaces/fetchAllKeys"
import { KeyState } from "../interfaces/interfaces"

type KeyAction = 
//Carga las llaves
    | { type: 'loadKeys', payload: Key[]}
//Agrega una llave
    | { type: 'addKey', payload: Key }
    | { type: 'setError', payload: string }
    | { type: 'toggleKey', payload: { id: string } }

// En los reducer siempre se debe de retornar un nuevo estado
// y no una mutación del estado anterior
export const keyReducer = ( state: KeyState, action: KeyAction ): KeyState => {
    switch ( action.type) {
        case "loadKeys":
            return {
                ...state,
                keys: [ ...action.payload ],
                isLoading: true,
            }
        case "addKey":
            return {
                ...state,
                keys: [ ...state.keys, action.payload ]
            }
        case "setError":
            return {
                ...state,
                error: action.payload,
                isLoading: true
            }
        default:
            return state;
    }
}