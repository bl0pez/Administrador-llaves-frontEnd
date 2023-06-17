import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PrivateRouter } from './PrivateRouter';
import { Login } from '../auth/pages/Login';
import { PublicRouter } from './PublicRouter';
import { Keys, LoadKeys } from '../keys/pages';

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
                element: <LoadKeys />
            },
             {
                path: '*',
                element: <Navigate to="/" />
            }
        ]
    }
]);