import { createContext, useContext, useEffect, useReducer } from 'react';

import { AuthReducer } from '../reducers';
import { AuthState, User } from '../interfaces';
import { checkAuthStatusService } from '../services';

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
    roles: [],
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
                uid: user.id,
                name: user.fullName,
                email: user.email,
                roles: user.roles
            }});
    }

    const handleChecking = async() => {
        try {

            const { token, user } = await checkAuthStatusService();

            //Guardamos el token en el localstorage
            localStorage.setItem('token', token);

            dispatch({ type: 'login', payload: {
                uid: user.id,
                name: user.fullName,
                email: user.email,
                roles: user.roles
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