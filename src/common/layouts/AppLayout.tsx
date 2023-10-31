import { Outlet } from 'react-router-dom'
import { Container, Box } from '@mui/material';

import { Sidebar } from '../components/sidebar';

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
