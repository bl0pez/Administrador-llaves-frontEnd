import { Outlet } from 'react-router-dom';
import { Sidebars } from '../components';

export const Admin = () => {
  return (
    <div className='h-screen'>
    
      <Sidebars />

        <Outlet />
    
    </div>
  ) 
}
