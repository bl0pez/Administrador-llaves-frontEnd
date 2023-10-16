import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const PublicRouter = lazy(() => import('./PublicRouter'));
const Login = lazy(() => import('@/auth/pages/Login'));

const PrivateRouter = lazy(() => import('./PrivateRouter'));
const Keys = lazy(() => import('@/keys/pages/Keys'));
const BorrowrdKey = lazy(() => import('@/keys/pages/BorrowrdKey'));
const KeyHistory = lazy(() => import('@/keys/pages/KeyHistory'));


export const router = createBrowserRouter([
    {
        path: '/auth',
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <PublicRouter />
            </Suspense>
        ),
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
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <PrivateRouter />
            </Suspense>
        ),
        children: [
            {
                path: '/',
                element: 
                    (
                        <Suspense fallback={<div>Loading...</div>}>
                            <Keys />
                        </Suspense>
                    )
            },
            {
                path: 'load-keys',
                element: 
                    (
                        <Suspense fallback={<div>Loading...</div>}>
                            <BorrowrdKey />
                        </Suspense>
                    )
            },
            {
                path: 'history',
                element: 
                    (
                        <Suspense fallback={<div>Loading...</div>}>
                            <KeyHistory />
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