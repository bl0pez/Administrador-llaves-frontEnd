import { useAuth } from '@/auth/context';
import { Navigate } from 'react-router-dom';
import { UserTable } from '../components/table/UserTable';

const Dashboard = () => {

    const { authstate } = useAuth();

  if ( !authstate.roles.includes('admin') ) {
    return <Navigate to='/' />
  }


  return (
    <UserTable />
  )
}

export default Dashboard