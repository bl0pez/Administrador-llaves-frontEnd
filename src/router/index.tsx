import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import PublicRouter from './PublicRouter';
import { Spinner } from '@/common/components/ui';

const Login = lazy(() => import('@/auth/pages/Login'));
const PrivateRouter = lazy(() => import('./PrivateRouter'));
const KeyPage = lazy(() => import('@/key/pages/KeyPage'));
const BorrowedKeyPage = lazy(() => import('@/borrowedKey/pages/BorrowrdKeyPage'));
const KeyHistoryPage = lazy(() => import('@/keyHistory/page/KeyHistoryPage'));
const UserPage = lazy(() => import('@/admin/pages/Users'));


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
                                <KeyPage />
                        </Suspense>
                    )
            },
            {
                path: 'history',
                element: 
                    (
                        <Suspense fallback={<Spinner />}>
                            <KeyHistoryPage />
                        </Suspense>
                    )
            },
            {
                path: 'users',
                element: 
                    (
                        <Suspense fallback={<Spinner />}>
                            <UserPage />
                        </Suspense>
                    )
            },
            {
                path: '*',
                element: <Navigate to="/" />
            }
        ]
    },
]);