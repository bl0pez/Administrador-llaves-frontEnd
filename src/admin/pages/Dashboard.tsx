import { useAuth } from '@/auth/context';
import { Navigate } from 'react-router-dom';
import { UserTable } from '../components/table/UserTable';
import UserProvider from '../context/UserContext';

const Dashboard = () => {

    const { authstate } = useAuth();

  if ( !authstate.roles.includes('admin') ) {
    return <Navigate to='/' />
  }


  return (
    <UserProvider>
      <UserTable />
    </UserProvider>
  )
}

export default Dashboard