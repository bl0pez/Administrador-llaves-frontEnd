import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PrivateRouter } from './PrivateRouter';
import { PublicRouter } from './PublicRouter';
import { KeyHistory, Keys } from '@/keys/pages';
import { BorrowrdKey } from '@/keys/pages/BorrowrdKey';
import Login from '@/auth/pages/Login';


export const router = createBrowserRouter([
    {
        path: '/auth',
        element: <PublicRouter />,
        children: [{
            path: 'login',
            element: <Login />
        },
        {
            path: '*',
            element: <Navigate to="/auth/login" />
        }]
    },
    {
        path: '/',
        element: <PrivateRouter />,
        children: [
            {
                path: '/',
                element: <Keys />
            },
            {
                path: 'load-keys',
                element: (<BorrowrdKey />)
            },
            {
                path: 'history',
                element: <KeyHistory />
            },
             {
                path: '*',
                element: <Navigate to="/" />
            }
        ]
    }
]);