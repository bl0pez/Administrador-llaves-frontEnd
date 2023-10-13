import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeContext } from "@/theme/ThemeContextProvider";

export const ActionItemMenu = () => {

    const { colorMode, mode, theme } =  useThemeContext();

  return (
    <>
    <Divider />
    <List>
        <ListItem disablePadding>
            <ListItemButton
            onClick={() => colorMode.toggleColorMode()}
            >
                <ListItemIcon>
                    {
                        mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />
                    }
                </ListItemIcon>
                    {
                        mode === 'dark' ? <ListItemText primary={'Modo Claro'} /> : <ListItemText primary={'Modo Oscuro'} />
                    }
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
            <ListItemButton
            onClick={() => {}}
            >
                <ListItemIcon>
                    <LogoutIcon 
                        color={'error'}
                    />
                </ListItemIcon>
                <ListItemText 
                    primary={'Cerrar Sesión'} 
                    sx={{
                        color: 'error.main'
                    }}    
                />
            </ListItemButton>
        </ListItem>
    </List>
    </>
  )
}
