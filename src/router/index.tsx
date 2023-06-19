import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PrivateRouter } from './PrivateRouter';
import { PublicRouter } from './PublicRouter';
import { Keys } from '@/keys/pages';
import { lazy, Suspense } from 'react';


const Login = lazy(() => import('@/auth/pages/Login'));
const LoadKeys = lazy(() => import('@/keys/pages/LoadKeys'));

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
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <LoadKeys />
                    </Suspense>
                )
            },
             {
                path: '*',
                element: <Navigate to="/" />
            }
        ]
    }
]);