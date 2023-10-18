import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/sidebar';
import { Container, Box } from '@mui/material';

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

        <Box
          component={'main'}
          marginTop={2}
        >
          <Outlet />  
        </Box>  
        </Container>

    </>
  )
}

export default AppLayout;
