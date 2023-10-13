import { createContext, useContext, useEffect, useReducer } from 'react';

import { AuthReducer } from '../reducers';
import { keyApi } from '@/api/keyApi';
import { FormValues } from '@/hooks';
import { AuthState, FetchAuth, User } from '../interfaces';

interface AuthContextProps {
    authstate: AuthState;
    handleLogin: (user: User) => void;
    handleLogout: () => void;
}

interface Props {
    children: JSX.Element | JSX.Element[];
}

const AuthContext = createContext({} as AuthContextProps);

//Estado inicial del reducer de autenticación
const INITIAL_STATE: AuthState = {
    status: 'checking', // 'authenticated' | 'not-authenticated' | 'checking'
    uid: "",
    name: "",
    email: "",
    role: "",
    errorMsj: ""
}

export const AuthProvider = ({ children }: Props) => {

    const [authstate, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        if(!localStorage.getItem('token')){
            return handleLogout();
        };

        handleChecking();

    }, []);

    const handleLogin = async(user: User) => {         
            dispatch({ type: 'login', payload: {
                uid: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }});
    }

    const handleChecking = async() => {
        try {

            const resp = await keyApi.get<FetchAuth>('/validate');

            //Guardamos el token en el localstorage
            localStorage.setItem('token', resp.data.token);

            dispatch({ type: 'login', payload: {
                uid: resp.data.user._id,
                name: resp.data.user.name,
                email: resp.data.user.email,
                role: resp.data.user.role
            }});

            
        } catch (error) {
            handleLogout();
        }

    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch({ type: 'logout'});
    }


    return (
        <AuthContext.Provider value={{
            authstate,
            handleLogin,
            handleLogout,
        }}>
                {children}    
        </AuthContext.Provider>)

}

export const useAuth = () => useContext(AuthContext);