import { createBrowserRouter, Navigate } from 'react-router-dom';
import { CreateKeyPage } from '../keys/pages/CreateKeyPage';
import { KeysPage } from '../keys/pages/KeysPage';
import { PrivateRouter } from './PrivateRouter';
import { Login } from '../auth/pages/Login';
import { PublicRouter } from './PublicRouter';

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
                path: 'new',
                element: <CreateKeyPage />
            },
            {
                path: 'history',
                element: <div>a</div>
            },
            {
                path: 'keys',
                element: <KeysPage />
            }, {
                path: '*',
                element: <Navigate to="/new" />
            }
        ]
    }
]);