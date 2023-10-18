import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import PublicRouter from './PublicRouter';
import { Spinner } from '@/components/spinner/Spinner';

const Login = lazy(() => import('@/auth/pages/Login'));
const PrivateRouter = lazy(() => import('./PrivateRouter'));
// const Keys = lazy(() => import('@/keys/pages/Keys'));
const KeyListPage = lazy(() => import('@/app/pages/KeyList'));
const BorrowedKeysPage = lazy(() => import('@/app/pages/BorrowedKeys'));
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
                            <BorrowedKeysPage />
                        </Suspense>
                    )
            },
            {
                path: 'keyList',
                element: 
                    (
                        <Suspense fallback={<Spinner />}>
                            <KeyListPage />
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