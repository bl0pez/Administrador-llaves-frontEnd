import { Box, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeContext } from '@/theme/ThemeContextProvider';

export const ToggleThemeMode = () => {

    const { colorMode, mode, theme } =  useThemeContext();

  return (
    <Box sx={{ 
                position: 'absolute', 
                top: 0, 
                right: 0, 
                m: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1
            }}>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Theme {theme.palette.mode}
      </Typography>
      <IconButton
        onClick={() => colorMode.toggleColorMode()}
        color="inherit"
        sx={{ p: 2 }}
        title='Cambiar modo'
      >
        {
            mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />
        }
      </IconButton>
    </Box>
  )
}
