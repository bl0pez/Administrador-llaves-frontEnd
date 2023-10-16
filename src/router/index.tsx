import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import PublicRouter from './PublicRouter';
import { Spinner } from '@/components/spinner/Spinner';

const Login = lazy(() => import('@/auth/pages/Login'));
const PrivateRouter = lazy(() => import('./PrivateRouter'));
const Keys = lazy(() => import('@/keys/pages/Keys'));
const BorrowrdKey = lazy(() => import('@/keys/pages/BorrowrdKey'));
const KeyHistory = lazy(() => import('@/keys/pages/KeyHistory'));


export const router = createBrowserRouter([
    {
        path: '/auth',
        element: ( <PublicRouter /> ),
        children: [{
            path: 'login',
            element: (
                <Suspense fallback={<Spinner />}>
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
            <Suspense fallback={<Spinner />}>
                <PrivateRouter />
            </Suspense>
        ),
        children: [
            {
                path: '/',
                element: 
                    (
                        <Suspense fallback={<Spinner />}>
                            <Keys />
                        </Suspense>
                    )
            },
            {
                path: 'load-keys',
                element: 
                    (
                        <Suspense fallback={<Spinner />}>
                            <BorrowrdKey />
                        </Suspense>
                    )
            },
            {
                path: 'history',
                element: 
                    (
                        <Suspense fallback={<Spinner />}>
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