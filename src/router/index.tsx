import { createBrowserRouter, Navigate } from 'react-router-dom';
import { History, New } from '../components';
import { Layouts } from '../keys/pages/Layouts';
import { KeysPage } from '../keys/pages/KeysPage';

export const router = createBrowserRouter([
    { 
        path: '/admin',
        element: <Layouts />,
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
                element: <KeysPage />
            }
        ] 
    }
]);