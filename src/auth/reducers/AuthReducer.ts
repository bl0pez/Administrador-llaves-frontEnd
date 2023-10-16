import { AuthState } from "../interfaces"

type AuthAction =
    | { type: 'checking' }
    | { type: 'logout' }
    | { type: 'login', payload: { uid: string, name: string, email:string, roles: string[] } }

export const AuthReducer = (stateAuth: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case "checking": {
            return {
                status: 'checking',
                uid: "",
                roles: [],
                name: "",
                email: "",
                errorMsj: "",
            }
        }
        case "logout": {
            return {
                uid: "",
                roles: [],
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
                roles: action.payload.roles,
            }
        }
        default:
            return stateAuth;

    }
}