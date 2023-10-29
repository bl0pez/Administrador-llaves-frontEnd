import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import PublicRouter from './PublicRouter';
import { Spinner } from '@/components/spinner/Spinner';
import { KeyProvider } from '@/app/context/KeyContext';

const Login = lazy(() => import('@/auth/pages/Login'));
const PrivateRouter = lazy(() => import('./PrivateRouter'));
// const Keys = lazy(() => import('@/keys/pages/Keys'));
const KeyPage = lazy(() => import('@/app/pages/KeyPage'));
const BorrowedKeyPage = lazy(() => import('@/app/pages/BorrowrdKeyPage'));
// const KeyHistory = lazy(() => import('@/keys/pages/KeyHistory'));


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
                            <BorrowedKeyPage />
                        </Suspense>
                    )
            },
            {
                path: 'keyList',
                element: 
                    (
                        <Suspense fallback={<Spinner />}>
                            <KeyProvider>
                                <KeyPage />
                            </KeyProvider>
                        </Suspense>
                    )
            },
            // {
            //     path: 'history',
            //     element: 
            //         (
            //             <Suspense fallback={<Spinner />}>
            //                 <KeyHistory />
            //             </Suspense>
            //         )
            // },
             {
                path: '*',
                element: <Navigate to="/" />
            }
        ]
    }
]);