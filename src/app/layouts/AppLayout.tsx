import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components';
import { Container } from '@mui/material';

const AppLayout = () => {
  return (
    <>
        
        <Container
          maxWidth="lg"
          sx={{
            marginTop: '1rem',
          }}
        >
          <Sidebar />
          <Outlet />
        </Container>

    </>
  )
}

export default AppLayout;
