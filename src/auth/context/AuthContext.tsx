import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { AuthState } from '../../keys/interfaces/interfaces';
import { AuthReducer } from './AuthReducer';
import { keyApi } from '../../api/keyApi';
import { Auth } from '../../keys/interfaces/authFetch';
import { FormValues } from '../../hooks';

interface AuthContextProps {
    authstate: AuthState;
    handleLogin: (data:FormValues) => void;
    handleLogout: () => void;
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

    useEffect(() => {

        if(!localStorage.getItem('token')) return;

        handleChecking();

    }, []);

    const handleLogin = async(data:FormValues) => {

        dispatch({ type: 'checking'});

        try {
            
            const resp = await keyApi.post<Auth>('/login', data);

            //Guardamos el token en el localstorage
            localStorage.setItem('token', resp.data.token);

            dispatch({ type: 'login', payload: {
                uid: resp.data.user._id,
                name: resp.data.user.name,
                email: resp.data.user.email
            }});


        } catch (error) {
            dispatch({ type: 'logout'});
        }

    }

    const handleChecking = async() => {

        dispatch({ type: 'checking'});

        try {

            const resp = await keyApi.get<Auth>('/validate');

            //Guardamos el token en el localstorage
            localStorage.setItem('token', resp.data.token);

            dispatch({ type: 'login', payload: {
                uid: resp.data.user._id,
                name: resp.data.user.name,
                email: resp.data.user.email
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