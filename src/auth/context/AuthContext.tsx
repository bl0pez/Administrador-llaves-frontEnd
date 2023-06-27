import { createContext, useContext, useEffect, useReducer } from 'react';
import Swal from 'sweetalert2';

import { AuthReducer } from '../reducers';
import { keyApi } from '@/api/keyApi';
import { FormValues } from '@/hooks';
import { AuthState, FetchAuth } from '../interfaces';

import { Spiner } from '@/keys/components';

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
    status: 'checking', // 'authenticated' | 'not-authenticated' | 'checking'
    uid: "",
    name: "",
    email: "",
    role: "",
    errorMsj: ""
}


const init = (initialState: AuthState) => {
    return initialState;
}

export const AuthProvider = ({ children }: Props) => {

    const [authstate, dispatch] = useReducer(AuthReducer, INITIAL_STATE, init);

    useEffect(() => {
        if(!localStorage.getItem('token')){
            return handleLogout();
        };

        handleChecking();

    }, []);

    const handleLogin = async(data:FormValues) => {

            dispatch({ type: 'checking'});

        try {
            
            const resp = await keyApi.post<FetchAuth>('/login', data);

            //Guardamos el token en el localstorage
            localStorage.setItem('token', resp.data.token);
            
            dispatch({ type: 'login', payload: {
                uid: resp.data.user._id,
                name: resp.data.user.name,
                email: resp.data.user.email,
                role: resp.data.user.role
            }});


        } catch (error : any) {
            const msj = error.response?.data.msg || 'Error al iniciar sesión';
            Swal.fire('Error', msj, 'error');
            dispatch({ type: 'logout'});   
        }

    }

    const handleChecking = async() => {

        dispatch({ type: 'checking'});

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
            { 
            
                authstate.status === 'checking'
                ? (<div className='h-screen flex items-center justify-center'>
                    <Spiner />
                </div>)
                : (children)
            
            }
        </AuthContext.Provider>)

}

export const useAuth = () => useContext(AuthContext);