import { useAuth } from '@/auth/context';
import { Navigate } from 'react-router-dom';
import { UserTable } from '../components/table/UserTable';
import UserProvider from '../context/UserContext';
import { Roles } from '@/common/interfaces';

const UsersPage = () => {

    const { authstate } = useAuth();

  if ( authstate.role !== Roles.ADMIN ) {
    return <Navigate to='/' />
  }


  return (
    <UserProvider>
      <UserTable />
    </UserProvider>
  )
}

export default UsersPage;