import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layouts } from '../keys/pages/Layouts';
import { KeysPage } from '../keys/pages/KeysPage';
import { CreateKeyPage } from '../keys/pages/CreateKeyPage';

export const router = createBrowserRouter([
    { 
        path: '/admin',
        element: <Layouts />,
        children: [
            {
                path: 'new',
                element: <CreateKeyPage />
            },
            {
                path: 'history',
                element: <div>a</div>
            },
            // {
            //     path: 'keys',
            //     element: <KeysPage />
            // }
        ] 
    }
]);