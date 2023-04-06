import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Admin } from '../pages';
import { History, Keys, New } from '../components';

export const router = createBrowserRouter([
    { 
        path: '/admin',
        element: <Admin />,
        children: [
            {
                path: 'new',
                element: <New />
            },
            {
                path: 'history',
                element: <History />
            },
            {
                path: 'keys',
                element: <Keys />
            }
        ] 
    }
]);