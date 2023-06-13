import { AuthState } from "../../keys/interfaces/interfaces"

type AuthAction =
    | { type: 'checking' }
    | { type: 'logout' }
    | { type: 'login', payload: { uid: string, name: string, email:string } }

export const AuthReducer = (stateAuth: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case "checking": {
            return {
                ...stateAuth,
                status: 'checking'
            }
        }
        case "logout": {
            return {
                ...stateAuth,
                status: 'not-authenticated',
                errorMsj: '',
            }
        }
        case "login": {
            return {
                ...stateAuth,
                status: 'authenticated',
                uid: action.payload.uid,
                name: action.payload.name,
                email: action.payload.name,
            }
        }
        default:
            return stateAuth;

    }
}