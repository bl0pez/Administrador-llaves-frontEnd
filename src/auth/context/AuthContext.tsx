import { createContext, useContext, useReducer, useState } from 'react';
import { AuthState } from '../../keys/interfaces/interfaces';
import { AuthReducer } from './AuthReducer';

interface AuthContextProps {
    authstate: AuthState;
}

interface Props {
    children: JSX.Element | JSX.Element[];
}

const AuthContext = createContext({} as AuthContextProps);

//Estado inicial del reducer de autenticación
const INITIAL_STATE: AuthState = {
    status: 'not-authenticated', // 'authenticated' | 'not-authenticated' | 'checking'
    uid: null,
    name: null,
    email: null,
    errorMsj: null
}


export const AuthProvider = ({ children }: Props) => {

    const [authstate, dispatch] = useReducer(AuthReducer, INITIAL_STATE);


    return (
        <AuthContext.Provider value={{
            authstate
        }}>
            {children}
        </AuthContext.Provider>)

}

export const useAuth = () => useContext(AuthContext);