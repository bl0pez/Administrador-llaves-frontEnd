import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { ToggleThemeMode } from '@/components/ui/ToggleThemeMode';

const Auth = () => {
  return (
    <>
      <ToggleThemeMode />

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
