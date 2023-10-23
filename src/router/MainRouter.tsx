import { useAuth } from '@/auth/context'
import { RouterProvider } from 'react-router-dom';
import { router } from '.';
import { Spinner } from '@/components/spinner/Spinner';

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
