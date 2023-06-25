import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PrivateRouter } from './PrivateRouter';
import { PublicRouter } from './PublicRouter';
import { KeyHistory, Keys } from '@/keys/pages';
import { lazy, Suspense } from 'react';
import LoadKeys from '@/keys/pages/LoadKeys';


const Login = lazy(() => import('@/auth/pages/Login'));

export const router = createBrowserRouter([
    {
        path: '/auth',
        element: <PublicRouter />,
        children: [{
            path: 'login',
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <Login />
                </Suspense>
            )
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
                element: (<LoadKeys />)
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