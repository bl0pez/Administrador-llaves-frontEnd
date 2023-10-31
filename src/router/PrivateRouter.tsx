import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/context/AuthContext';
import AppLayout from '@/common/layouts/AppLayout';


const PrivateRouter = () => {

  const { authstate } = useAuth();

  return authstate?.status === 'authenticated'
    ? (
        <AppLayout />
    )
    : (<Navigate to="/auth/login" />)
}

export default PrivateRouter;
