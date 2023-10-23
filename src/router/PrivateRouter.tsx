import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/context/AuthContext';
import AppLayout from '@/app/layouts/AppLayout';


const PrivateRouter = () => {

  const { authstate } = useAuth();

  return authstate?.status === 'authenticated'
    ? (
        <AppLayout />
    )
    : (<Navigate to="/auth/login" />)
}

export default PrivateRouter;
