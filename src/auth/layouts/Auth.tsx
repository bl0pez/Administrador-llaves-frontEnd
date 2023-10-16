import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

const Auth = () => {
  return (
    <>
      <Box
        height={'100vh'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Outlet />
      </Box>
    </>
  )
}

export default Auth;
