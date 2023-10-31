import { RouterProvider } from 'react-router-dom';

import { useAuth } from '@/auth/context'
import { Spinner } from '@/common/components/ui';
import { router } from '.';

export const MainRouter = () => {

    const { authstate } = useAuth();

    if (authstate.status === 'checking') {
        return (
            <div className='h-screen flex items-center justify-center'>
                <Spinner />
            </div>
        )
    }

    return (
        <RouterProvider router={router} />
    )
}
