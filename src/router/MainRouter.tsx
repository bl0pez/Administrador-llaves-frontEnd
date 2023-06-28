import { useAuth } from '@/auth/context'
import { RouterProvider } from 'react-router-dom';
import { router } from '.';
import { Spiner } from '@/keys/components';

export const MainRouter = () => {

    const { authstate } = useAuth();

    if (authstate.status === 'checking') {
        return (
            <div className='h-screen flex items-center justify-center'>
                <Spiner />
            </div>
        )
    }

    return (
        <RouterProvider router={router} />
    )
}
