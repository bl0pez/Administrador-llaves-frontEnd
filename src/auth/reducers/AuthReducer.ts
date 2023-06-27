import { AuthState } from "../interfaces"

type AuthAction =
    | { type: 'checking' }
    | { type: 'logout' }
    | { type: 'login', payload: { uid: string, name: string, email:string, role: string } }

export const AuthReducer = (stateAuth: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case "checking": {
            return {
                uid: "",
                role: "",
                name: "",
                email: "",
                errorMsj: "",
                status: 'checking'
            }
        }
        case "logout": {
            return {
                uid: "",
                role: "",
                name: "",
                email: "",
                errorMsj: "",
                status: 'not-authenticated',
            }
        }
    
        case "login": {
            return {
                ...stateAuth,
                status: 'authenticated',
                uid: action.payload.uid,
                name: action.payload.name,
                email: action.payload.email,
                role: action.payload.role
            }
        }
        default:
            return stateAuth;

    }
}